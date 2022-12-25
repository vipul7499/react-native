import React, { useContext,useState} from "react";
import {auth,makeCredential,updateCurrentUseDocument} from './utils/firebase'
import CircleLoader from 'react-spinners/CircleLoader'
import { UserContext } from "./providers/UserProvider";
import { Header, /*Map*/ Home } from "./components";
import { Router } from "@reach/router";
import "./style.css";
import Map from "./components/NewMap/Map";
import Period from "./components/Period";
import LogPeriod3 from './components/PeriodTracker/LogPeriod3'
import HelpSmall from './components/helpsmall';
import Bar from './components/Bar'
import Dasboard from './components/dash/Dashboard'
import Portal from './components/Portal/Portal'
import PortalH from './components/Portal/Portal-home'
import LoginAndSignup from './components/LoginAndSignup'
import SignSeeker from './components/Portal/Signseeker'
import SignProvider from './components/Portal/Signprovider'
import CreateOpportunity from './components/Portal/Employer/CreateOpportunity'
import Eportal from './components/Portal/Portal_employ'
import EPortal2 from './components/Portal/EPortal2'
import Job from './components/Job/Job'
import Info from './components/Portal/info'
import Edu from './components/info/Educate'
import Copy from './components/PeriodTracker/Copy'
import Auth from './components/NewMap/Auth'

const Signup = ({user,completeRegister}) => {

  const [fields, setFields] = useState({
    email: "" ,
    password: "",
    name: "",
    phone: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFields({ ...fields, [name]: value });
  };

  const handleSubmitPhone = async (event) => {
    event.preventDefault();
    const { email, password, name} = fields;
    const setup=true;
    const phone=auth.currentUser.providerData[0].uid
    try {
      const credential = makeCredential(email,password)
      const users=await auth.currentUser.linkWithCredential(credential)
      console.log(user);
      updateCurrentUseDocument(user,{email,name,setup,phone})
      console.log(user)
    } catch (error) {
      console.error(error);
    }

    setFields({
      email: "",
      password: "",
      name: "",
      phone: "",
    });
    completeRegister()
  };
  const handleSubmitEmail = async (event) => {
    event.preventDefault();
    const {phone} = fields;
    const setup=true;
    const email=auth.currentUser.providerData[0].uid
    try {
      console.log(user);
      updateCurrentUseDocument(user,{phone,setup,email})
      console.log(user)
    } catch (error) {
      console.error(error);
    }

    setFields({
      email: "",
      password: "",
      name: "",
      phone: "",
    });
    completeRegister()
  };
 
  return (
  <>
      <h2 className="login-heading">Please Signup</h2>
      {auth.currentUser.providerData[0].providerId==='phone'?     
    <>
    <form className="login-box" onSubmit={handleSubmitPhone}>

    <input
        type="name"
        name="name"
        placeholder="Full Name"
        value={fields.name}
        onChange={handleChange}
      />
    <input
        type="email"
        name="email"
        placeholder="Enter Email"
        value={fields.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={fields.password}
        onChange={handleChange}
      />
            <input type="submit" value="Signup" />
      </form>
    </>:<> 
    <form className='login-box' onSubmit={handleSubmitEmail}>
    <input
        name="phone"
        placeholder="Phone Number"
        value={fields.phone}
        onChange={handleChange}
      />
                <input type="submit" value="Signup" />
    </form>
    </>
     }
      </>
      
  );
};


const App = () => {
  const [user] = useContext(UserContext);
  const [isSetup,setisSetup]=useState(false);
  const completeRegister=()=>{
    setisSetup(true)
  }

  if (user.loading) {
    return <CircleLoader css={{position: 'absolute', left: '50%', top: '50%',transform: 'translate(-50%, -50%)'}} size="400px"color="pink"/>;
  } else {
    if (user.data) {
      // if(isSetup||user.data.setup)
      // {
      return (
        <>
          {/* <Header /> */}
          <Router>
            {/* <ResponsiveDrawer path="/res"/> */}
            <Dasboard path="/" />
            <Auth path="/auth"/>
            <Map path="/map" />
            <LogPeriod3 path="/logperiod"/>
            <Job path="/job"/>
            <Portal path = '/portal'/>
            <PortalH path= '/hportal'/>
            <Bar path="/bar"/>
            <CreateOpportunity path="/createOpp"/>
            <SignSeeker path= '/seek'/>
            <SignProvider path= '/provide'/>
            <Eportal path = '/eportal'/>
            <EPortal2 path = '/eportal2/:oppId'/>
            <Info path= '/info/:oppId'/>
            <Copy path='/period'/>
            <Edu path='/edu'/>
          </Router>
        </>
      );
      // }
      // else{
      //   //form
      //   return (
      //   <Signup user={user} completeRegister={completeRegister}/>
      //   )
      // }
    } else {
      
      return (<>
     
      <LoginAndSignup/>
     
{/* 
      <Router>
      
      <SignIn1 path="/signIn" />
      <Signup1 path="/signUp" />
      <Homepage path="/"/>

      </Router> */}
      </>);
    }
  }
};

export default App;
