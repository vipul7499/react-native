import React, { useContext } from "react";
import { auth } from "../../utils/firebase";
import { UserContext } from "../../providers/UserProvider";

// import Container from '@material-ui/core/Container';
// import Grid from '@material-ui/core/Grid';

const Header = () => {
  const [user, setUser] = useContext(UserContext);

  const logout = async () => {
    await auth.signOut();
    setUser({ data: null, loading: false });
  };
 
  return (

    <div className="header" style={{backgroundColor: "#f50057"}}>
      <div className="profile-box" style= {{display: 'block'}}>
        <img
          id="dp"
          src={user.data.photoURL || require("../../utils/molly.png")}
          alt={user.data.name}
        />
        <div style= {{width:'200px', textAlign: 'center'}}>
          <h2 style= {{textTransform: 'capitalize', fontSize: '1.5rem', margin: '5% 0',color:'white'}}>{user.data.name}</h2>
        </div>

        <div style= {{width:'200px', alignItems: 'center'}} >
         {/* <button className="header-button" onClick={logout}>
         Log Out
        </button> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
