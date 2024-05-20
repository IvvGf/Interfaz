import React, { useState } from 'react';
import { supabase } from '../client';
import { Link , useNavigate} from 'react-router-dom';
import { useAuth } from '../AuthProvider';
import 'C:/Users/Sofy/Desktop/user-athentication-supabase/src/index.css'




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
      navigate('/seleccion_paciente')
      //alert('Check your email for verification link')


    } catch (error) {
      alert(error)
    }
  }





  return(
    <div style={{display: 'flex', justifyContent:'center',alignItems:'center',minHeight:'100vh', textAlign: 'center', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', padding: '20px', borderRadius: '10px', maxWidth:'1000px',width: '100%', margin: '0 auto' }}>
      <form onSubmit={handleSubmit}>
        {/*<input
          placeholder='username'
          name='userName'
          onChange={handleChange}       
        />*/}
        <img src="https://i.imgur.com/gpkEVUv.png" style={{ marginBottom: '10px', width: '350px', height: '150px' }} />
        <div style={{ marginBottom:'4px',width: '500px', justifyContent: 'center', textAlign: 'center', fontSize: '40px', fontFamily: 'Dongle, sans-serif', position: 'relative' }}>
          <span style={{ zIndex: '1', position: 'relative', backgroundColor: 'white', padding: '0 10px' }}>Inicio de sesión</span>
          <hr style={{marginTop:'30px',position: 'absolute', top: '50%', left: '34%', width: 'calc(100% - 350px)', zIndex: '0', border: 'none', borderTop: '2px solid black' }} />
        </div>

        <label style={{ marginBottom: '10px', display: 'block', width: '100%', textAlign: 'left',fontFamily: 'Dongle, sans-serif',fontSize:'25px' }}>
      
          
          Email
          <input
            style={{borderBlockColor:"black", backgroundColor:'#F7EBDF4D',padding: '10px', border: '1px solid', borderRadius: '5px', width: '100%', boxSizing: 'border-box', fontFamily: 'Dongle, sans-serif', fontSize:'20px' }}
            name='email'
            type='email'
            onChange={handleChange}
          />
        </label>
        {/* <input style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', width: '100%', boxSizing: 'border-box', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}
          placeholder='Email'
          name='email'
          onChange={handleChange}
        /> */}
        {/* <input
          style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', width: '100%', boxSizing: 'border-box', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}
          placeholder='Password'
          name='password'
          type= "password"
          onChange={handleChange}
          /> */}
        <label style={{ marginBottom: '10px', display: 'block', width: '100%', textAlign: 'left', fontFamily: 'Dongle, sans-serif', fontSize:'25px' }}>
          Contraseña
          <input
          style={{marginBottom:'20px',borderBlockColor:"black",backgroundColor:'#F7EBDF4D',  padding: '10px', border: '1px solid', borderRadius: '5px', width: '100%', boxSizing: 'border-box', fontFamily: 'Dongle, sans-serif', fontSize:'20px' }}
          name='password'
          type="password"
          onChange={handleChange} 
          />
        </label>

          <button type='submit'style={{backgroundColor: '#434573', color: 'white', border: 'none', padding: '1px 20px', borderRadius: '5px', cursor: 'pointer',fontFamily: 'Dongle, sans-serif', fontSize:'25px', width:'200px', height:'40px' }}>
              Ingresar
          </button>
          {/*<button onClick={signOut}style={{ backgroundColor: '#ffa500', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', marginTop: '10px' }}>sign out</button>*/}
          <br />
      {/*<span>Don't have an account? <Link to="/signup" style={{color: '#ffa500'}}>Sign Up</Link></span>*/}
      </form>
      <div style={{ position: 'absolute', bottom: '20px', right: '20px', fontSize: '25px' , fontFamily: 'Dongle, sans-serif'}}>
        NeurOS C.A. de C.V.
      </div>
      {/* Don't have an account?<Link to = '/signup'>Sign Up</Link> */}
    </div>
   
    
  )
}
export default LogIn