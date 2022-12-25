import React,{useContext,useEffect,useState} from 'react'
import {db} from '../../../utils/firebase'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { Paper, Typography, CardActionArea, CardContent, CardActions } from '@material-ui/core'
import {UserContext } from '../../../providers/UserProvider'

import CreateOpportunity from './CreateOpportunity'
import { Link } from '@reach/router'
 const EmployerDashboard = () => {
     const [user,setUser]=useContext(UserContext);

     const [opportunities,setOpportunities]=useState([])
     const [loading,setLoading]=useState(true)
     useEffect(() => {
         const run=async()=>
         {
        const data =await  db.collection("opportunities").where(`creator` ,`==`,`${user.data.uid}`).get()
        data.forEach ((doc)=>{
            console.log(doc.data())
        })
        setOpportunities(data);
        setLoading(false)

          }
          run()
     }, [])

     const ans=[]
     opportunities.forEach((doc, i) => {
       const url=`/oppDetails/${doc.id}`
        const x= (
          <>
            <Card >
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h2" component="h1">
                    {doc.data().creator}
                  </Typography>
                  <Button component={Link} to={url} >Check Status</Button>
                  {/* <Button onClick={()=>{setOpp(doc.data())
                  console.log(opp)
                  }}>Open To Check Status</Button> */}
                  {/* <Typography variant="h4" color="textSecondary" component="h2">
                    {getDistanceFromLatLonInKm(
                      dish.data().requester.location[0],
                      dish.data().requester.location[1],
                      props.location[0],
                      props.location[1]
                    )}
                    km Away
                  </Typography> */}
                  {/* <Typography variant="body1" color="text " component="h2">
                    {"In urgent need of a sanitary napkin"}
                  </Typography> */}
                </CardContent>
              </CardActionArea>
              <CardActions>
                {/* <Button variant="contained" size="large" color="secondary">
                  Help Now
                </Button> */}
               
              </CardActions>
            </Card>
          </>
        );
        ans.push(x)
      });
    
     const{orgName,orgWebsite,orgContact,orgDescr,orgLocation}=user.data.orgDetails
     if(loading)
     {
         return <h1>Loading</h1>

     }
     else{
        return (
            <>
    
            <Grid container>
                <Grid item lg={12}>
                    <Paper>
                        <Typography variant="h1">Welcome  {orgName}</Typography>
                        <Typography variant="h2"> {orgWebsite}</Typography>
                        <Typography variant="h2">{orgContact}</Typography>
                        <Typography variant="h2">{orgDescr}</Typography>
    
                    </Paper>
    
                </Grid>
                <Grid item lg={6}>
                   {ans}
                    
    
                </Grid>
                <CreateOpportunity/>
          
            </Grid>
            </>
        )
     }
    
}

export default EmployerDashboard