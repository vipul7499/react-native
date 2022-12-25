import React,{useState} from 'react'
import Webcam from "react-webcam";
import { Link } from '@reach/router';
import { Button, Typography, Card, TextField, makeStyles } from '@material-ui/core';
import Map from './Map'
import axios from 'axios'
import CircleLoader from 'react-spinners/CircleLoader'

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };
  
const useStyles = makeStyles ((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 50,
  },

  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "400px", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    marginLeft:"35%"
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  button: {
    backgroundImage: "linear-gradient(147deg, #ff9897 0%, #f650a0 74%)",
    margin: theme.spacing(3, 0, 2),
    color: "#ffffff",
  },
}));
 
 const Auth = () => {
  const classes = useStyles();

     const [auth,setAuth]=useState(0);
     const[fields,setFields]=useState({
       pasword:""
     })
     const handleChange = (event) => {
      const { name, value } = event.target;
      setFields({ ...fields, [name]: value });
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      // await auth.signInWithEmailAndPassword(fields.email, fields.password);
      if(fields.password==="kanishkisbest")
      {
        setAuth(2)
      }
      else{
        setAuth(-1)
      }
      // setFields({
      //   email: "",
      //   password: "",
      // });
    };
    const webcamRef = React.useRef(null);
    const capture = React.useCallback(
        async () => {
            setAuth(1)
            const imageSrc = webcamRef.current.getScreenshot();
            // console.log(imageSrc)
            const config = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
            };
            const send = {
              img: imageSrc,
            };
            const res = await axios.post("https://herhygienefg.herokuapp.com/detect_face", send, config);
            console.log(res)
            if(res.data.gender==="1")
            {
              setAuth(2)
            }
            else{
              setAuth(-1)
            }
            // window.location.reload()
            // setInterval(()=>{
               
            //     if(1) setAuth(2)
            //     else setAuth(-1)
            // },2000)
        //   if(1) setAuth(2)
        //   else setAuth(-1)
        },
        [webcamRef]
      );
   
     
     if(auth==0)
     {
      return (
        <>
        <div >
          <Webcam
            audio={false}
            height={300}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={300}
            style={{marginLeft: '37%'}}
            videoConstraints={videoConstraints} />
          <Button onClick={capture} style={{border: 'none', padding: '10px 20px',backgroundColor: '#f50057',color: 'white', marginLeft : '-13%'}}>Capture photo</Button>
          
          {/* <Typography style={{textAlign : 'center'}} gutterBottom variant="h4" component="h4">
           or
          </Typography> */}
          <form className={classes.form}  onSubmit={handleSubmit} noValidate>
         
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            onChange={handleChange}
            value={fields.password}
            label="access token"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            size="large"
            variant="contained"
            color="primary"
            // className={classes.button}
          >
            Access via token 
          </Button>
     
        </form>
     
     
          {/* <h1 style={{marginLeft: '42%', marginTop: '3%'}}>Or</h1>
          <h1 style={{marginLeft: '35%'}}></h1> */}
          </div>
        </>
      );
     }
     else if(auth==1)
     {
         return<> 
            <Typography style={{textAlign : 'center'}} gutterBottom variant="h2" component="h2">
            Authenticating
          </Typography>
           {/* <h1 style={{textAlign : 'center'}}>Authenticating</h1> */}
         <CircleLoader css={{position: 'absolute', left: '50%', top: '50%',transform: 'translate(-50%, -50%)'}} size="400px"color="pink"/>;
         </>
     }
     else if(auth===2)
     {
         return <Map/>
     }
     else
     {
         return(<>
         <Typography style={{padding:'100px', textAlign : 'center'}} gutterBottom variant="h2" component="h2">
             Uh oh! We were not able to see you there , Please make sure that your face is completely in the camera's frame and that there is appropriate background lighting.
          </Typography>
          <Card style={{textAlign : 'center'}}>
          <Button size="large" component={Link} to='/' >Go to Dashboard</Button>
          <Button size="large" onClick={()=>{setAuth(0)}} >Retry</Button>
          </Card>
        
         </>)
         
     }
}

export default Auth

