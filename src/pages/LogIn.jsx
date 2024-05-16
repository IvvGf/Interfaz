import React, { useState } from 'react';
import { supabase } from '../client';
import { Link , useNavigate} from 'react-router-dom';
import { useAuth } from '../AuthProvider';

const LogIn = () => {
  let navigate = useNavigate();
  const {signOut} = useAuth();
 
  const [formData, setFormData] = useState({
    email:'', password:''
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
      const {data,error} = await supabase.auth.signInWithPassword(
        {
          email:formData.email,
          password:formData.password,           
        })
      if (error) throw error
      console.log(data)
      setToken(data)
      navigate('/seleccion_paciente')
      //alert('Check your email for verification link')


    } catch (error) {
      alert(error)
    }
  }





  return(
    <div>
      <form onSubmit={handleSubmit}>
        {/*<input
          placeholder='username'
          name='userName'
          onChange={handleChange}       
        />*/}
        <input
          placeholder='Password'
          name='password'
          type= "password"
          onChange={handleChange}
          />
        <input
          placeholder='Email'
          name='email'
          onChange={handleChange}
        />

          <button type='submit'>
              Submit
          </button>

      </form>
      <button onClick={signOut}>sign out</button>
      Don't have an account?<Link to = '/signup'>Sign Up</Link>
    </div>
  )
}
export default LogIn