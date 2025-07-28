import React, { useEffect, useState } from 'react'
import axios from 'axios';
export default function Register() {


  const[data, setData]=useState({
    id:"",
    name:"",
    email:"",
    phone:"",
    address:""
  })
  

  const handleInputChange=(events)=>{
     const {name, value} =events.target;

     setData((prevProps)=>({
        ...prevProps,
        [name]:value
     }))

     console.log(data);
  }  


  const handleSubmit=(events)=>{

    console.log(data);

    axios.post("http://localhost:5000/students",data)

    .then((response)=>{
      if(response.status==200)
      {
        alert("data added")
      }
    })
    // .catch((err) => {
    //   console.error("Error while posting data:", err);
    //   alert("Error adding data");
    // });



  }

  return (
     <>

    <div className='col-md-10 content'>

      <h1>Register</h1><hr></hr>

      <span>Enter Id</span>  <input name='id' onChange={handleInputChange} type='text'/><br/><br/>

      <span>Enter Name</span>  <input name='name' onChange={handleInputChange} type='text'/><br/><br/>

      <span>Enter email</span>  <input name='email' onChange={handleInputChange} type='text'/><br/><br/>

      <span>Enter phone</span>  <input name='phone' onChange={handleInputChange} type='text'/><br/><br/>

      <span>Enter address</span>  <input name='address' onChange={handleInputChange} type='text'/><br/><br/>

      
      <button onClick={handleSubmit}>submit</button>


    </div>

    </>

  )
}
