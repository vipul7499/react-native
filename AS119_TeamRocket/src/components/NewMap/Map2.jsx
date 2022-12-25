import React, { useContext, useEffect, useState } from "react";
import { Map as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";
import { encode, neighbors } from "ngeohash";
import { othersIcon, userIcon } from "./icon";
import { db } from "../utils/firebase";
import { UserContext } from "../providers/UserProvider";
import { Link } from "@reach/router";
import { usePersistedState } from "./usePersistedState2";

// let dummyRequests = [
//   {
//     id: 1,
//     requester: {
//       id: 1,
//       location: [28.7040572, 77.1224902],
//       detail: {
//         name: "Jane Doe",
//         msg: "lorem ipsum doler set",
//       },
//     },
//     status: "active",
//   },
//   {
//     id: 2,
//     requester: {
//       id: 2,
//       location: [28.7040582, 77.1124902],
//       detail: {
//         name: "Jane Doe",
//         msg: "lorem ipsum doler set",
//       },
//     },
//     status: "active",
//   },
//   {
//     id: 3,
//     requester: {
//       id: 3,
//       location: [28.7040592, 77.0924915],
//       detail: {
//         name: "Jane Doe",
//         msg: "lorem ipsum doler set",
//       },
//     },
//     status: "active",
//   },
// ];

const Card = ({ position, detail }) => {
  return (
    <>
      <div onClick={() => console.log("expand")}>
        Name: {detail.name} <br />
        MSG: {detail.msg}
      </div>
    </>
  );
}; 

const HelpingInterface = ({ handleCancelHelp, requestDoc }) => {
  return (
    <div>
      You have volunteered to help, Great! <br />
      <button
        className="request-help-btn"
        onClick={() => handleCancelHelp(requestDoc)}
      >
        Cancel Help
      </button>
      <button
        className="request-help-btn"
        onClick={() => console.log("toggled direction")}
      >
        Toggle Direction
      </button>
    </div>
  );
};

const RequestMarkers = ({
  requestDocs,
  handleHelpingOthers,
  user,
  location,
}) => {
  const [requests, setRequests] = useState([...requestDocs]);

  useEffect(() => {
    console.log("request markers");
    setRequests([...requestDocs]);
  }, [requestDocs]);

  return (
    <>
      {requests.map((requestDoc) => (
        <Marker
          key={requestDoc.data().id}
          position={requestDoc.data().requester.location}
          icon={othersIcon}
        >
          <Popup>
            <button
              onClick={() => handleHelpingOthers(requestDoc, user, location)}
            >
              Help them
            </button>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

const RequestCards = ({ requestDocs }) => {
  const [requests, setRequests] = useState([...requestDocs]);

  useEffect(() => {
    console.log("request cards");
    setRequests([...requestDocs]);
  }, [requestDocs]);

  return (
    <>
      {requests.map((requestDoc) => (
        <Card
          key={requestDoc.data().id}
          position={requestDoc.data().requester.location}
          detail={requestDoc.data().requester.detail}
        />
      ))}
    </>
  );
};

const RequesterMarker = ({ requestDoc }) => {
  // the person whom you are helping
  if (requestDoc) {
    return (
      <Marker position={requestDoc.data().requester.location} icon={othersIcon}>
        <Popup>{requestDoc.data().requester.detail.name}</Popup>
      </Marker>
    );
  } else {
    return <></>;
  }
};

const RequesterCard = ({ requestDoc }) => {
  if (requestDoc) {
    return (
      <div>
        you are helping <br />
        {requestDoc.data().requester.detail.name} <br />
        msg: {requestDoc.data().requester.detail.msg}
        {/* x distance away*/}
      </div>
    );
  } else {
    return <></>;
  }
};

const HelperMarker = ({ requestDoc }) => {
  if (requestDoc && requestDoc.data().helper) {
    return (
      <Marker position={requestDoc.data().helper.location} icon={othersIcon}>
        <Popup>{requestDoc.data().helper.detail.name}</Popup>
      </Marker>
    );
  } else {
    return <></>;
  }
};

const HelperCard = ({ requestDoc }) => {
  if (requestDoc && requestDoc.data().helper) {
    return (
      <>
        <div>
          {requestDoc.data().helper.detail.name} has accepted your request
        </div>
        <div>
          {requestDoc.data().helper.detail.name}
          {/* distance */}
        </div>
      </>
    );
  } else {
    return <div>If someone accepts to help you they will appear here.</div>;
  }
};

const RequestedHelpInterface = ({ handleCancelRequest, handleFulfilled }) => {
  return (
    <div>
      You have requested help <br />
      <button className="request-help-btn" onClick={handleCancelRequest}>
        Cancel Request
      </button>
      <button className="request-help-btn" onClick={handleFulfilled}>
        Received Help
      </button>
    </div>
  );
};



const Map = () => {
  const [requestDocs, setRequestDocs] = useState([]);
  const [user] = useContext(UserContext);
  const [location, setLocation] = usePersistedState("location", [0, 0]);
  const [geohash, setGeohash] = usePersistedState("geohash",encode(location[0], location[1], 4));
  const [request, setRequest] = useState(null); // cyclic object error
  const [requestId, setRequestId] = usePersistedState("request id", undefined);
  const [isDefault, setIsDefault] = usePersistedState("default map", true);
  const [isHelping, setIsHelping] = usePersistedState("helping other", false);
  const [requestedHelp, setRequestedHelp] = usePersistedState("requested help",false);
  const [cancelledHelp, setCancelledHelp] = usePersistedState("cancelled help",false);
  const [cancelledRequest, setCancelledRequest] = usePersistedState("cancelled request",false);
  const [helpedSuccessfully, setHelpedSuccessfully] = usePersistedState("helped successfully",false);
  const [requestFulfilled, setRequestFulfilled] = usePersistedState("request fulfilled",false);

  useEffect(() => {
    console.log("map 1");
    const watcher = navigator.geolocation.watchPosition(
      (pos) => setLocation([pos.coords.latitude, pos.coords.longitude]),
      (err) => console.error(err.message)
    );

    return () => navigator.geolocation.clearWatch(watcher);
  }, [setLocation]);

  useEffect(() => {
    console.log("map 2");
    setGeohash(() => encode(location[0], location[1], 4));
    // for debugging purpose only
    console.log("current location: ", location);
  }, [location, setGeohash]);

  useEffect(() => {
    console.log("map 3");
    const unsubscribe = db
      .collection("requests")
      .where("status", "==", "active")
      .where("requester.geohash", "in", [...neighbors(geohash), geohash])
      .onSnapshot((snapshot) => setRequestDocs([...snapshot.docs]));
    return () => unsubscribe();
  }, [geohash]);

  useEffect(() => {
    console.log("map 4");
    let unsubscribe = () => {};
    if (requestedHelp && request) {
      unsubscribe = request.ref.onSnapshot((snapshot) => setRequest(snapshot));
      if (request.data().requester.geohash !== geohash) {
        request.ref.update({
          "requester.location": location,
          "requester.geohash": geohash,
        });
      }
    }
    return () => unsubscribe();
  }, [requestedHelp, geohash]);

  useEffect(() => {
    console.log("map 5");
    let unsubscribe = () => {};
    if (isHelping && request) {
      unsubscribe = request.ref.onSnapshot((snapshot) => {
        setRequest(snapshot);
        if (snapshot.data().status === "cancelled") {
          setIsHelping(false);
          setIsDefault(true);
          console.log("request was cancelled, Thanks anyway!");
          setRequest(null);
        } else if (snapshot.data().status === "fulfilled") {
          setIsHelping(false);
          setHelpedSuccessfully(true);
        }
      });
      if (
        request &&
        request.data().helper &&
        request.data().helper.geohash !== geohash
      ) {
        request.ref.update({
          "helper.location": location,
          "helper.geohash": geohash,
        });
      }
    }
    return () => unsubscribe();
  }, [isHelping, geohash]);

  useEffect(() => {
    console.log("map 6");
    if (request) setRequestId(request.id);
  }, [request, setRequestId]);

  useEffect(() => {
    (async () => {
      if (!request) {
        const doc = await db.collection("requests").doc(`${requestId}`).get();
        setRequest(doc);
      }
    })();
    console.log("map 7");
  }, []);

  const handleHelpingOthers = async (requestDoc, user, location) => {
    console.log("helping others clicked"); // for debugging
    try {
      const helper = {
        id: user.data.uid,
        location: location,
        geohash: geohash,
        detail: {
          name: user.data.name,
        },
      };
      await requestDoc.ref.update({ helper: helper, status: "helping" });
      setRequest(requestDoc);
      setIsDefault(false);
      setIsHelping(true);
    } catch (err) {
      console.log("failed to help:", err.message);
    }
  };

  const handleRequest = async () => {
    console.log("help is requested");
    try {
      setIsDefault(false);
      const request = {
        id: new Date().toLocaleString(),
        requester: {
          id: user.data.uid,
          detail: {
            name: user.data.name,
            msg: "make this message work with modal",
          },
          location: location,
          geohash: geohash,
        },
        status: "active",
      };
      const requestRef = await db.collection("requests").add(request);
      const requestDoc = await requestRef.get();
      setRequest(requestDoc);
      setRequestedHelp(true);
    } catch (err) {
      setIsDefault(true);
      setRequestedHelp(false);
      console.log("failed to request for help", err.message);
    }
  };

  const handleCancelHelp = (requestDoc) => {
    console.log("cancel help clicked");
    try {
      requestDoc.ref.update({ helper: null, status: "active" });
      setIsHelping(false);
      setCancelledHelp(true);
    } catch (err) {
      console.log("failed to cancel help", err.message);
    }
  };

  const handleCancelRequest = async () => {
    console.log("request cancelled is clicked");
    try {
      await request.ref.update({ status: "cancelled" });
      setRequestedHelp(false);
      setCancelledRequest(true);
    } catch (err) {
      console.log("failed to cancel request", err.message);
    }
  };

  const handleFulfilled = async () => {
    console.log("request fulfilled is clicked");
    try {
      await request.ref.update({ status: "fulfilled" });
      setRequestedHelp(false);
      setRequestFulfilled(true);
    } catch (err) {
      console.log("failed to mark request fulfilled", err.message);
    }
  };

  return (
    <>
      <LeafletMap center={location} zoom={17}>
        <TileLayer
          url={"https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"}
        />
        <Marker position={location} icon={userIcon}>
          <Popup>You</Popup>
        </Marker>
        {isDefault ? (
          <RequestMarkers
            requestDocs={requestDocs}
            handleHelpingOthers={handleHelpingOthers}
            user={user}
            location={location}
          />
        ) : (
          <></>
        )}
        {isHelping ? <RequesterMarker requestDoc={request} /> : <></>}
        {requestedHelp ? <HelperMarker requestDoc={request} /> : <></>}
      </LeafletMap>
      <div className="request-interface">
        {isDefault ? (
          <>
            <button className="request-help-btn" onClick={handleRequest}>
              Request
            </button>
            <RequestCards requestDocs={requestDocs} />
          </>
        ) : (
          <></>
        )}
        {isHelping ? (
          <>
            <HelpingInterface
              handleCancelHelp={handleCancelHelp}
              requestDoc={request}
            />
            <RequesterCard requestDoc={request} />
          </>
        ) : (
          <></>
        )}
        {requestedHelp ? (
          <>
            <RequestedHelpInterface
              handleCancelRequest={handleCancelRequest}
              handleFulfilled={handleFulfilled}
            />
            <HelperCard requestDoc={request} />
          </>
        ) : (
          <></>
        )}
        {cancelledHelp ? (
          <>
            <div>You have cancelled Your Help</div>
            <div>
              your rating <br />
              {/* rating */}
              <Link to="/">
                <button onClick={() => localStorage.clear()}>go home</button>
              </Link>
            </div>
          </>
        ) : (
          <></>
        )}
        {cancelledRequest ? (
          <>
            <div>You have cancelled Your request</div>
            <div>
              your rating <br />
              {/* rating */}
              <Link to="/">
                <button onClick={() => localStorage.clear()}>go home</button>
              </Link>
            </div>
          </>
        ) : (
          <></>
        )}
        {helpedSuccessfully ? (
          <>
            <div>You have Successfully Helped Someone!, Congrats</div>
            <div>
              your rating <br />
              {/* rating */}
              <Link to="/">
                <button onClick={() => localStorage.clear()}>go home</button>
              </Link>
            </div>
          </>
        ) : (
          <></>
        )}
        {requestFulfilled ? (
          <>
            <div>You have Received Help Congratulations!</div>
            <div>
              your rating <br />
              {/* rating */}
              <Link to="/">
                <button onClick={() => localStorage.clear()}>go home</button>
              </Link>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Map;
