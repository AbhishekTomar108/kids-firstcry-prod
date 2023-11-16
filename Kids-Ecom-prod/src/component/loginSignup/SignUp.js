import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LoginContext from '../../Context/LoginContext'

const SignUp = () => {
  const [user, setUser] = useState({ firstname: "", lastname: "", email: "", password: "", confirmpassword: "" })
  let navigate = useNavigate();
  const ContextValue = useContext(LoginContext);  

  const submitHandle = async (e) => {
    e.preventDefault();
    if (user.password === user.confirmpassword) {
      try {
        const response = await fetch("https://commerce-backend-test.onrender.com/api/auth", {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name: user.firstname, email: user.email, password: user.password })

        });
        const json = await response.json();
        console.log(json);
        
        if (json.success) {
          navigate('/');

          ContextValue.updateUser(json.user);
          localStorage.setItem("userData", JSON.stringify(json.user))
          localStorage.setItem('username', json.user.name);
          localStorage.setItem('KidsCommerce', json.authToken);
          localStorage.setItem('userStatus', true);

          ContextValue.updateUser(json.user.name);
          localStorage.setItem('KidsCommerce', json.authToken);


        }
        else {
          console.log(json.error)
          alert("username is already exist")
        }
      }

      catch {
        console.log("sorry there is some error occured")
      }
    }
    else {
      console.log("password must be same");
    }
  }
  return (
    <div className='login'>
      <div className='login-form'>
        <h2>Sign Up</h2>

        <form onSubmit={e => submitHandle(e)}>

          <label>First Name</label>
          <input type='text' name="firstname" required onChange={e => setUser({ ...user, [e.target.name]: e.target.value })} />
          <label>Last Name</label>
          <input type='text' name="lastname" required onChange={e => setUser({ ...user, [e.target.name]: e.target.value })} />
          <label>Email</label>
          <input type='email' name="email" required onChange={e => setUser({ ...user, [e.target.name]: e.target.value })} />

          <label>Password</label>
          <input type='password' name="password" required onChange={e => setUser({ ...user, [e.target.name]: e.target.value })} />
          <label>Confirm Password</label>
          <input type='password' name="confirmpassword" required onChange={e => setUser({ ...user, [e.target.name]: e.target.value })} />

          <div className='submit-btn-container flex-col'>
            <button type='submit' className='submit-btn'> SIGN IN</button>
            <span style={{ color: '#00bcb4' }}> <Link to="../account"> Log in with an existing account <b style={{ color: 'black' }}>or</b> Return to Store </Link></span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp