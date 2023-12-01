import React from 'react'
import './Signin.css'
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { API } from './global';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import {FaEye, FaEyeSlash} from 'react-icons/fa'
const movieValidationShema = yup.object({
    username: yup.string().required(),
    password:yup.string().required().min(8),
  })
  function Signin() {
    const handleToggle=()=>{
        if(passwordType==="password"){
          setPasswordType("text");
          setPasswordIcon(<FaEye/>)
        }
        else{
          setPasswordType("password");
          setPasswordIcon(<FaEyeSlash/>)
        }
      }
          const [passwordType,setPasswordType]=useState("password");
          const [passwordIcon,setPasswordIcon]=useState(<FaEyeSlash/>);
    const [formState,setFormState]=useState("success");
    const navigate=useNavigate();
    const {handleChange,values,handleSubmit,handleBlur, touched, errors}=useFormik({
        initialValues:{username:"",email:"",password:""},
        validationSchema: movieValidationShema,
        onSubmit:async(values)=>{
            console.log(values);
         const data = await fetch(API+"/"+"signup",{
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify(values),
            });
            if(data.status==401){
                console.log("username already exist");
                setFormState("error")
                
            }
            else{
                const result= await data.json()
                console.log("success",result);
                // localStorage.setItem("token",result.token)
                // localStorage.setItem("roleId",result.roleId)
                navigate("/login")
            }
          
        },
  });
  return (
    <div>
      <form onSubmit={handleSubmit} className="login-form" >
      <div className='main'>
      <input type='checkbox' id='chk' aria-hidden="true"></input>
      <div className='signup'>
        <h1 className='new-user'>New User Here!</h1> 
        <label for="chk" >Sign up</label>
        <input type='text'
          placeholder='Username'
           required=""
           onChange={handleChange}
           onBlur={handleBlur}
           value={values.username}
           name='username'
           ></input>
           {touched.username && errors.username && <div className="error-message">{errors.username}</div>}
        <input type='email'
         name='email' placeholder='Email' 
         required=""
         onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
         ></input>
        {touched.email && errors.email && (
              <div className="error-message">{errors.email}</div>
            )}
        <input type={passwordType} name='password'
         placeholder='Password' required=""
         onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
         ></input>
         {touched.password && errors.password && <div className="error-message">{errors.password}</div>}
     <span className="signup__eye" onClick={handleToggle}>{passwordIcon}</span> 
        <button id='button' type='submit'>Sign up</button>
      </div>
     </div>
            </form>
    </div>
  )
  }
  

export default Signin
