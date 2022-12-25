import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../providers/UserProvider";
import { updateCurrentUseDocument } from "../../utils/firebase";




const RegForm = ({ user ,setIsRegistered}) => {
  const [entity, setEntity] = useState(0);
  const [step, setStep] = useState(1);

  // SEEKER=============================================
  const [seekerfields, setSeekerFields] = useState({
    workName: "",
    age: "",
    location: [],
    isIndividual: true,
    isSHG: false,
  });

  const [seekerPlaceHolderText, setSeekerPlaceHolderText] = useState(
    "What is your work name?"
  );

  const changeSeekerPlaceHolder = (currstep) => {
    if (currstep === 1) setSeekerPlaceHolderText("What is your work name?");
    if (currstep === 2) setSeekerPlaceHolderText("What is your age?");
    if (currstep === 3) setSeekerPlaceHolderText("Are you a member of an SHG?");
  };

  const goPrevSeeker = () => {
    changeSeekerPlaceHolder(step - 1);
    setStep(step - 1);
  };
  const goNextSeeker = () => {
    changeSeekerPlaceHolder(step + 1);
    setStep(step + 1);
  };

  const handleSubmitSeeker = async (event) => {
    event.preventDefault();
    console.log(seekerfields);
    const isJobSeeker = true;
    const isjobRegistered = true;

    const { workName, age, location, isIndividual, isSHG } = seekerfields;
    await updateCurrentUseDocument(user, {
      workName,
      age,
      location,
      isIndividual,
      isSHG,
      isJobSeeker,
      isjobRegistered,
    });
    setIsRegistered({
        isjobRegistered:true,
        isJobSeeker:true,
    })
    // handleRegister(predictedStartDate, predictedEndDate);
  };
  const handleChangeSeeker = (event) => {
    const { name, value } = event.target;
    console.log(seekerfields);
    setSeekerFields({ ...seekerfields, [name]: value });
  };
  //  EMPLOYER=============================================

  const [employerfields, setEmployerFields] = useState({
    orgName: "",
    numOfEmployees: 0,
    location: [],
  });
  const [employerPlaceHolderText, setEmployerPlaceHolderText] = useState(
    "What is your organization's name?"
  );
  const changeEmployerPlaceHolder = (currstep) => {
    if (currstep === 1)
      setEmployerPlaceHolderText("What is your organization's name?");
    if (currstep === 2)
      setEmployerPlaceHolderText(
        "Number of people associated with your organization?"
      );
  };

  const goPrevEmployer = () => {
    changeEmployerPlaceHolder(step - 1);
    setStep(step - 1);
  };
  const goNextEmployer = () => {
    changeEmployerPlaceHolder(step + 1);
    setStep(step + 1);
  };

  const handleSubmitEmployer = async (event) => {
    event.preventDefault();
    console.log(employerfields);
    const isEmployer = true;
    const isjobRegistered = true;

    const { orgName, location,numOfEmployees } = employerfields;
    await updateCurrentUseDocument(user, {
      orgName,
      location,
      numOfEmployees,
      isEmployer,
      isjobRegistered
    });
    setIsRegistered({
        isjobRegistered:true,
        isEmployer:true,
    })
    // handleRegister(predictedStartDate, predictedEndDate);
  };
  const handleChangeEmployer = (event) => {
    const { name, value } = event.target;
    console.log(employerfields);
    setEmployerFields({ ...employerfields, [name]: value });
  };

  if (entity === 0) {
    return (
      <>
        <h1>What do you want to do</h1>
        <button onClick={()=>{setEntity(1)}}>Seek Opportunity</button>
        <button onClick={()=>{setEntity(2)}}>Create Opportunity</button>
      </>
    );
  } else if (entity == 1) {
    return (
      <>
        <h1>{seekerPlaceHolderText}</h1>
        <form
          onKeyPress={(event) => {
            if (event.which === 13 /* Enter */) {
              event.preventDefault();
            }
          }}
          onSubmit={handleSubmitSeeker}
        >
          {step == 1 ? (
            <>
              <input
                type="text"
                name="workName"
                placeholder="name"
                value={seekerfields.workName}
                onChange={handleChangeSeeker}
              />
            </>
          ) : (
            <></>
          )}
          {step == 2 ? (
            <>
              <input
                type="number"
                name="age"
                placeholder="age"
                value={seekerfields.age}
                onChange={handleChangeSeeker}
              />
            </>
          ) : (
            <></>
          )}
          {step == 3 ? (
            <>
              <button onClick={()=>{setSeekerFields({ isSHG: true })}}>Yes</button>
              <input type="submit" value="SignUp" />
            </>
          ) : (
            <></>
          )}
        </form>
        {step > 1 ? <button onClick={goPrevSeeker}>Previous</button> : <></>}
        {step < 3 ? <button onClick={goNextSeeker}>Next</button> : <></>}
      </>
    );
  } else if (entity == 2) {
    return (
      <>
        <h1>{employerPlaceHolderText}</h1>
        <form
          onKeyPress={(event) => {
            if (event.which === 13 /* Enter */) {
              event.preventDefault();
            }
          }}
          onSubmit={handleSubmitEmployer}
        >
          {step == 1 ? (
            <>
              <input
                type="text"
                name="orgName"
                placeholder="organization name"
                value={employerfields.orgName}
                onChange={handleChangeEmployer}
              />
            </>
          ) : (
            <></>
          )}
          {step == 2 ? (
            <>
              <input
                type="number"
                name="numOfEmployees "
                placeholder="number of employees"
                value={employerfields.age}
                onChange={handleChangeEmployer}
              />
              <input type="submit" value="SignUp" />
            </>
          ) : (
            <></>
          )}
        </form>
        {step > 1 ? <button onClick={goPrevEmployer}>Previous</button> : <></>}
        {step < 2 ? <button onClick={goNextEmployer}>Next</button> : <></>}
      </>
    );
  }
};

const Job = () => {
  const [user, setUser] = useContext(UserContext);
  const[isRegistered,setIsRegistered]=useState({
      isjobRegistered:false,
      isJobSeeker:false,
      isEmployer:false,
      isAdmin:false,
  })
  console.log(user.data)
  const {isjobRegistered,isJobSeeker,isEmployer,isAdmin}=isRegistered
 
  if(user.data.isjobRegistered===true||isjobRegistered===true){
    if (isJobSeeker||user.data.isJobSeeker) {
        return <h1> I am Seeker Ridam Dashboard !</h1>;

    } else if (isEmployer||user.data.isEmployer) {
        return <h1> I am Employer To create</h1>;

    } else if (isAdmin||user.data.isAdmin) {
      return <h1> I am Gov</h1>;
    }
  }
  else{    
        return(<> 
        <RegForm user={user} setIsRegistered={setIsRegistered} />
        </>) 
  }
};

export default Job;
