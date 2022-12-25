import React, { useContext, useEffect, useState, useRef } from "react";
import {
  Map as LeafletMap,
  TileLayer,
  Marker,
  Popup,
  useLeaflet,
} from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "lrm-google";
import { othersIcon, userIcon } from "../icon";
import { db } from "../../utils/firebase";
import { UserContext } from "../../providers/UserProvider";
import { useSpring, a, config } from "react-spring";
import { useDrag } from "react-use-gesture";
import "./styles2.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import { InputGroup } from "reactstrap";
// import Appbar from "./Side.js";




const items = ["save item", "open item", "share item", "delete item", "cancel"];
const height = items.length * 60 + 80;

const Requests = ({ sendUp, onHelp, toggleState, location, user }) => {
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    const unsubscribe = db
      .collection("requests")
      .where("status", "==", "active")
      .onSnapshot((snapshot) => {
        sendUp([...snapshot.docs]);
        setRequests([...snapshot.docs]);
      });
    return () => unsubscribe();
  }, []);

  const handleHelp = (request, location, user) => {
    try {
      const helper = {
        id: user.data.uid,
        location: location,
      };
      request.update({ helper: helper });
    } catch (err) {
      console.log("error updating request document: ", err.message);
    }
    onHelp(request);
    toggleState();
  };

  return (
    <>
      {requests.map((request) => {
        let photoIcon = null;
        if (request.data().requester.photoURL) {
          photoIcon = new L.icon({
            iconUrl: request.data().requester.photoURL,
            iconRetinaUrl: request.data().requester.photoURL,
            iconAnchor: [10, 10],
            popupAnchor: [10, 10],
            shadowUrl: null,
            shadowSize: null,
            shadowAnchor: null,
            iconSize: new L.Point(50, 50),
            className: "marker",
          });
        }
        return (
          <Marker
            key={request.data().requester.id}
            position={request.data().requester.location}
            icon={photoIcon || othersIcon}
          >
            <Popup>
              {" "}
              <button onClick={() => handleHelp(request.ref, location, user)}>
                Help Them
              </button>{" "}
            </Popup>
          </Marker>
        );
      })}
    </>
  );
};

const Helper = ({ request, location }) => {
  const { map } = useLeaflet();
  const [helper, setHelper] = useState(null);
  const [leafletref, setLeafletref] = useState(null);

  const returnOut = (helper) => {
    const leafletElement = L.Routing.control({
      waypoints: [
        L.latLng(location[0], location[1]),
        L.latLng(helper.location[0], helper.location[1]),
      ],
      router: L.Routing.mapbox(
        "pk.eyJ1Ijoia2FuaXNoa2d1cHRhMjAwMCIsImEiOiJjazdpdmd5aG8wMDYwM2ZvN2U5eWs0Mm55In0.svdKVHGfRl4873N_UZBoaA"
      ),
      lineOptions: {
        styles: [
          {
            color: "blue",
            opacity: 0.6,
            weight: 4,
          },
        ],
      },
      addWaypoints: false,
      collapsible: true,
      draggableWaypoints: false,
      fitSelectedRoutes: false,
      showAlternatives: false,
    });
    return leafletElement;
  };
  useEffect(() => {
    const unsubscribe = request.onSnapshot((snapshot) => {
      setHelper(snapshot.data().helper);
    });
    console.log("chomu");
    return () => {
          if(leafletref!=null)  map.removeControl(leafletref);

      unsubscribe();
    };
  }, [request]);
  console.log(map);

  if (helper) {
    // map.removeControl(returnOut(helper))
    console.log(map);

    // returnOut(helper).addTo(map)

    return (
      <>
        <Marker position={helper.location} icon={othersIcon}>
          <Popup>
            hey!
            {leafletref==null?<button
              onClick={() => {
        
                let x = returnOut(helper).addTo(map);
                setLeafletref(x);
                
              }}
            >
              Show Directions
            </button>:<> <button
              onClick={() => {
                map.removeControl(leafletref);
                setLeafletref(null)

              }}
            >
              Hide Directions
            </button></>}
           
          </Popup>
        </Marker>
      </>
    );
  } else {
    return <></>;
  }
};

const Requester = ({ request, mapRef, location }) => {
  const [requester, setRequester] = useState(null);
  const [leafletref, setLeafletref] = useState(null);

  const { map } = useLeaflet();

  useEffect(() => {
    console.log("baja");
    let x, y;
    const unsubscribe = request.onSnapshot((snapshot) => {
      setRequester(snapshot.data().requester);
      x = snapshot.data().requester.location[0];
      y = snapshot.data().requester.location[1];
      console.log(x + " " + y);
    });
    return () => {
      if(leafletref!=null)  map.removeControl(leafletref);

      unsubscribe();
    };
  }, [request, mapRef]);
  const returnOut = (helper) => {
    const leafletElement = L.Routing.control({
      waypoints: [
        L.latLng(location[0], location[1]),
        L.latLng(helper.location[0], helper.location[1]),
      ],
      router: L.Routing.mapbox(
        "pk.eyJ1Ijoia2FuaXNoa2d1cHRhMjAwMCIsImEiOiJjazdpdmd5aG8wMDYwM2ZvN2U5eWs0Mm55In0.svdKVHGfRl4873N_UZBoaA"
      ),
      lineOptions: {
        styles: [
          {
            color: "blue",
            opacity: 0.6,
            weight: 4,
          },
        ],
      },
      addWaypoints: false,
      collapsible: true,
      draggableWaypoints: false,
      fitSelectedRoutes: false,
      showAlternatives: false,
    });
    return leafletElement;
  };

  if (requester) {
    return (
      <>
        <Marker position={requester.location} icon={othersIcon}>
          <Popup>
          {leafletref==null?<button
              onClick={() => {
        
                let x = returnOut(requester).addTo(map);
                setLeafletref(x);
                
              }}
            >
              Show Directions
            </button>:<> <button
              onClick={() => {
                map.removeControl(leafletref);
                setLeafletref(null)
              }}
            >
              Hide Directions
            </button></>}
          </Popup>
        </Marker>
      </>
    );
  } else {
    return <>:</>;
  }
};

const Map = () => {
  const [renderRequests, setRenderRequests] = useState([]);
  const [location, setLocation] = useState([0, 0]);
  const [isDefault, setIsDefault] = useState(true);
  const [hasRequested, setHasRequested] = useState(false);
  const [isHelping, setIsHelping] = useState(false);
  const [request, setRequest] = useState(null);
  const [user] = useContext(UserContext);

  const mapRef = useRef();

  // this is for Swipe
  const draggingRef = useRef(false);
  const [{ y }, set] = useSpring(() => ({ y: height })); //jaha bhi hai waha se yaha
  let myPos = 0;

  const open = ({ canceled }) => {
    // when cancel is true, it means that the user passed the upwards threshold
    // so we change the spring config to create a nice wobbly effect
    set({ y: myPos, config: canceled ? config.wobbly : config.stiff });
  };
  const close = (velocity = 0) => {
    set({ y: height, config: { ...config.stiff, velocity } });
  };

  const bind = useDrag(
    ({ first, last, vxvy: [, vy], movement: [, my], cancel, canceled }) => {
      if (first) draggingRef.current = true;
      // if this is not the first or last frame, it's a moving frame
      // then it means the user is dragging
      else if (last) setTimeout(() => (draggingRef.current = false), 0);

      // if the user drags up passed a threshold, then we cancel
      // the drag so that the sheet resets to its open position
      if (my < -70) cancel();

      // when the user releases the sheet, we check whether it passed
      // the threshold for it to close, or if we reset it to its open positino
      console.log(my);
      console.log(height * 0.75);
      if (last) my > height * 0.75 || vy > 0.5 ? open(vy) : close(vy);
      //THIS WAS PREVIOUSLY CLOSED, NOW CHANGED TO OPEN
      // when the user keeps dragging, we just move the sheet according to
      // the cursor position
      else set({ y: my, immediate: false, config: config.stiff });
    },
    {
      initial: () => [0, y.get()],
      filterTaps: true,
      bounds: { top: 0 },
      rubberband: true,
    }
  );

  const display = y.to((py) => (py < height ? "block" : "block"));

  const bgStyle = {
    transform: y.to(
      [0, height],
      ["translateY(-8%) scale(1.16)", "translateY(0px) scale(1)"]
    ),
    opacity: y.to([0, height], [0.4, 1], "clamp"),
    // touchAction: y.to(v => (v > 0 ? 'auto' : 'none'))
  };
  //swip code ends

  useEffect(() => {
    console.log(mapRef.current);
    const watcher = navigator.geolocation.watchPosition(
      (pos) => setLocation([pos.coords.latitude, pos.coords.longitude]),
      (err) => console.error(err.message)
    );

    return () => navigator.geolocation.clearWatch(watcher);
  }, [mapRef]);

  const handleRequest = async () => {
    console.log("Help Requested");
    const request = {
      requester: {
        id: user.data.uid,
        location: location,
        name: user.data.name,
        photoURL: user.data.photoURL,
        createdAt: Date.now(),
        //message can also be added he
      },
      helper: null,
      status: "active",
    };
    try {
      const requestRef = await db.collection("requests").add(request);
      setRequest(requestRef);
      setIsDefault(false);
      setHasRequested(true);
    } catch (err) {
      console.log("Error writing the document.", err.message);
    }
  };
  const handleCancelRequest = () => {
    try {
      request.set({ status: "cancelled" }, { merge: true });
      setRequest(null);
      setHasRequested(false);
      setIsDefault(true);
      console.log("Cancelled Request");
    } catch (err) {
      console.error("error cancelling request: ", err.message);
    }
  };
  const handleHelpReceived = () => {
    console.log("Help Received Pressed");
    try {
      request.set({ status: "fulfilled" }, { merge: true });
      setRequest(null);
      setHasRequested(false);
      setIsDefault(true);
    } catch (err) {
      console.error("error proceeding forward: ", err.message);
    }
  };
  const handleCancelHelp = () => {
    console.log("Cancelled Help");
  };

  const toggleState = () => {
    setIsDefault(false);
    setIsHelping(true);
  };
  const styles = {
    slideContainer: {
      height: "100%",
      width: "100%",
      WebkitOverflowScrolling: "touch", // iOS momentum scrolling
    },
  };

  return (
    <>
    <div class="flex-container">
    <div className= "wrapper-1">
    {/* <Appbar/> */}
    </div>
    <div className= "wrapper-2">
    <a.div className="bg" onClick={() => close()} style={bgStyle}>
        <LeafletMap ref={mapRef} center={location} zoom={17}>
          <TileLayer
            url={"https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"}
          />
          <Marker position={location} icon={userIcon} />
          {isDefault ? (
            <Requests
              sendUp={(requests) => setRenderRequests(requests)}
              onHelp={(request) => setRequest(request)}
              toggleState={toggleState}
              location={location}
              user={user}
            />
          ) : (
            <></>
          )}
          {hasRequested ? (
            <Helper location={location} request={request} />
          ) : (
            <></>
          )}
          {isHelping ? (
            <Requester location={location} mapRef={mapRef} request={request} />
          ) : (
            <></>
          )}
          {/* ROUTING LAYER CALL KARO YAHA PE DONO KE */}
        </LeafletMap>
      </a.div>
      <div className="action-btn" onClick={open} />
      
      <a.div
        className="sheet"
        {...bind()}
        style={{ display, bottom: `calc(-80vh + ${height - 100}px)`, y }}
      >
        {isDefault ? (
          <>
            <button className="request-help-btn" onClick={handleRequest}>
              Request Help
            </button>
            <PerfectScrollbar style={{ height: "100%" }}>
              {/* <Menu user={user} location={location} dishes={renderRequests} /> */}
            </PerfectScrollbar>
          </>
        ) : (
          <></>
        )}
        {hasRequested ? (
          <>
            {/* <button className="request-help-btn" onClick={handleCancelRequest}>
              Cancel Request
            </button>
            <button className="request-help-btn" onClick={handleHelpReceived}>
              Help Received
            </button> */}
          </>
        ) : (
          <></>
        )}
        {isHelping ? (
          <>
            {/* <button className="request-help-btn" onClick={handleCancelHelp}>
              Cancel Help (Doesn't work)
            </button> */}
            
          </>
        ) : (
          <></>
        )}
      </a.div>
    </div>
    </div>
          </>
  );
};

export default Map;

{
  /* {items.map(entry => (
          <div key={entry} onClick={() => !draggingRef.current && close()} children={entry} />//close hatado easy
        ))} */
}
{
  /* <div className="request-interface"> */
}
