/* TODO: break this file into smaller segments */
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";
import { getMonth, startOfMonth, addMonths,subMonths } from 'date-fns'
import { differenceInDays } from "date-fns/esm";
// import Ml from '../components/Ml'

const firebaseConfig = {
  apiKey: "AIzaSyBoisAWdv92NiBQGdA7pFFM3aoCFVpn3K8",
  authDomain: "her-hygiene.firebaseapp.com",
  databaseURL: "https://her-hygiene.firebaseio.com",
  projectId: "her-hygiene",
  storageBucket: "her-hygiene.appspot.com",
  messagingSenderId: "79799031943",
  appId: "1:79799031943:web:ce9a057e7aa7d999438022",
  measurementId: "G-BJKXNPFKCL",
};


firebase.initializeApp(firebaseConfig);
firebase.analytics();
export const db = firebase.firestore();

export const providerGoogle = new firebase.auth.GoogleAuthProvider();
export const providerPhone=new firebase.auth.PhoneAuthProvider();
export const providerEmail=new firebase.auth.EmailAuthProvider();

export const makeCredential=(email,password)=>{
  return firebase.auth.EmailAuthProvider.credential(email,password)
}
export const makePhoneCredential=(phone)=>{
  return firebase.auth.PhoneAuthProvider.credential()
}


export const auth = firebase.auth();




export const signInWithGoogle = async () =>await auth.signInWithPopup(providerGoogle);
export const createOpp=async (user,userInfo)=>{
if(!user) return
try{

  const createdAt= new Date()
  await db.collection("opportunities").doc().set({
    createdAt,
    ...userInfo,
  },{merge:true})
}
catch(err){
  console.error(err)
}


}
export const updateCurrentUseDocument=async (user, userInfo)=>{
   //userinfo -- name and phone
   if (!user) return;
   console.log(user.data);
   // const yhat=Ml(userInfo);
   try {
     await db
       .collection("users")
       .doc(`${user.data.uid}`)
       .set(
         {
           ...userInfo,
         },
         { merge: true }
       );
     console.log("success");
   } catch (error) {
     console.error(error.message);
   }
   return getUserDocument(user.uid);
}

export const addPeriodRegister = async (user, {height,weight,age,cycleLength,cycleTotal}) => {
  //userinfo -- name and phone
  if (!user) return;
  console.log(user.data);
  // const yhat=Ml(userInfo);
  try {
    await db
      .collection("users")
      .doc(`${user.data.uid}`)
      .set(
        {
          isPeriodRegistered: true,
          weight,
          height,
          cycleLength,
          cycleTotal,
          age,
          pcos:null,
          pulseRate:null,
          rr:null,
          regularity:null,
          hip:null,
          waist:null,
          weightGain:null,
          skinDarkening:null,
          pimples:null,
          fastFood:null,
          regExercise:null,
          bpSystolic:null,
          bpDiastolic:null,
        },
        { merge: true }
      );
    console.log("success");
  } catch (error) {
    console.error(error.message);
  }
  return getUserDocument(user.uid);
};

export const createUserProfileDocument = async (user, userInfo) => {
  //userinfo -- name and phone
  if (!user) return;

  const userRef = db.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const createdAt = new Date();
    const { displayName, email, photoURL } = user;
    try {
      const isSetup=auth.currentUser.providerData[0].providerId===providerGoogle.providerId? true:false
      await userRef.set({
        createdAt,
        name: displayName,
        email,
        photoURL,
        isPeriodRegistered: false,
        setup:isSetup,
        ...userInfo,
      });
    } catch (error) {
      console.error(error.message);
    }
  }
  return getUserDocument(user.uid);
};

export const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userDoc = await db.collection("users").doc(uid).get();
    return { uid, ...userDoc.data() };
  } catch (error) {
    console.log(error.message);
  }
};
export const getUserLogDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userDoc = await db.collection("users").doc(uid).collection('log');
    return userDoc
  } catch (error) {
    console.log(error.message);
  }
};


export const updateLogData=async (user,{data})=>{
  const today=Date.now();
  console.log(today)
  const ans=await db.collection("users").doc(`${user.data.uid}`).collection("log").doc(`${startOfMonth(Date.now())}`)
  const x=await ans.get()
  console.log(x.data())
  if(x.exists)
{
  console.log("exists")
  console.log(data)
 await ans.set({
    ...data
  },{merge:true})

}
else{
  console.log("does not exists")

  console.log(data)

  await ans.set({
    weight:null,
    height:null,
    age:null,
    pcos:null,
    pulseRate:null,
    rr:null,
    regularity:null,
    hip:null,
    waist:null,
    weightGain:null,
    skinDarkening:null,
    pimples:null,
    fastFood:null,
    regExercise:null,
    bpSystolic:null,
    bpDiastolic:null,
    cycleLength:null,
    cycleTotal:null,
    ...data,
  },{merge:true})
  
}
}


export const updateLogPeriod2=async (user,{selection})=>{
  console.log(user)
const userRef=await db.doc(`users/${user.data.uid}`)
const past=await userRef.collection('log').doc(`${startOfMonth(subMonths(selection.endDate,1))}`).get()
const future=await userRef.collection('log').doc(`${startOfMonth( addMonths(selection.endDate,1))}`).get()
let cycleLength=Math.abs(differenceInDays(selection.startDate,selection.endDate));
let cycleTotal=28;
if(past.exists && past.data().startDate)
{
  console.log("karta hai ")


  cycleTotal=Math.abs(differenceInDays(past.data().startDate.toDate() ,selection.startDate))
  console.log(cycleTotal,past.data().startDate.toDate() ,selection.startDate)

}
if(future.exists && future.data().startDate)
{
  console.log(future.data())
  console.log(future.id)
  await userRef.collection('log').doc(`${startOfMonth( addMonths(selection.endDate,1))}`).set({
    cycleTotal:differenceInDays(future.data().startDate.toDate(),selection.startDate)
  },{merge:true})
}

const ans=await userRef.collection('log').doc(`${startOfMonth(selection.endDate)}`)
if(ans.exists)
{
  ans.set({
    ...selection,
    cycleLength,
    cycleTotal,
  },{merge:true})
}
else{
  console.log("New Log")
  ans.set({
    weight:null,
    height:null,
    age:null,
    pcos:null,
    pulseRate:null,
    rr:null,
    regularity:null,
    hip:null,
    waist:null,
    weightGain:null,
    skinDarkening:null,
    pimples:null,
    fastFood:null,
    regExercise:null,
    bpSystolic:null,
    bpDiastolic:null,
    ...selection,
    cycleLength,
    cycleTotal,
  },{merge:true})

}
}
export default firebase;
