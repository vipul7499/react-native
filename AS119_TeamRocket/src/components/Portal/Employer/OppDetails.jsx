import React,{useEffect,useState} from 'react'
import { useParams } from "@reach/router"
import {db} from '../../../utils/firebase'
 const OppDetails = () => {
    const params = useParams();
    const [opp,setOpp]=useState(null);
    const[loading,setLoading]=useState(true)
    useEffect(() => {
        const run=async()=>{
            const opp=await db.collection("opportunities").doc(`${params.oppId}`).get()
            console.log(opp.data());
            setOpp(opp.data());
            setLoading(false)
        }
        run()
    }, [])
    if(loading){
        return <h1>Load</h1>
    }
    else{
        if(opp.Manufacturing===true)
        {
            return(<>
                <h2>{opp.oppDetails.costPerPad}</h2>
                <h2>{opp.oppDetails.maintainance}</h2>
                <h2>{opp.oppDetails.noOfPadsPerDay}</h2>
                <h2>{opp.oppDetails.noOfWomenNeeded}</h2>            
                </>)
    
        }
        else if(opp.Awareness===true)
        {
            return(<><h1>Awareness</h1></>)
    
        }
        else{
        return <h1>Employment</h1>
        }
    }
   
}

export default OppDetails