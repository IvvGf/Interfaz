import React, { useState } from 'react';
import { supabase } from '../client';
import { Link } from 'react-router-dom';

const SignUp = () => {


  const [formData, setFormData] = useState({
    userName:'', email:'', password:''
  })

  console.log(formData)

  function handleChange(event){
    setFormData((prevFormData)=>{
      return{
        ...prevFormData,
        [event.target.name]:event.target.value
      }
    })
  }

  async function handleSubmit(e){
    e.preventDefault()


    try {
      const { data , error} = await supabase.auth.signUp(
        {
          email:formData.email,
          password:formData.password,
          options : {
            data: {
              user_name:formData.userName,
            
            }
          }
        }
      )
      alert('Check your email for verification link.')


    } catch (error) {
      alert(error)
    }
  }





  return(
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder='Username'
          name='userName'
          onChange={handleChange}       
        />
        <input
          placeholder='Email'
          name='email'
          onChange={handleChange}
        />
        <input
          placeholder='Password'
          name='password'
          type= "password"
          onChange={handleChange}
          />


          <button type='submit'>
              Submit
          </button>
      </form>
      Alredy have an acount? <Link to = '/'>Login</Link>
    </div>
  )
}
export default SignU