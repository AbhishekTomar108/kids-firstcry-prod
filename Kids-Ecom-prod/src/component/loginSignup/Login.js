import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LoginContext from '../../Context/LoginContext'

const Login = () => {
  const [user, setUser] = useState({ firstname: "", lastname: "", email: "", password: "", confirmpassword: "" })
  let navigate = useNavigate();
  const ContextValue = useContext(LoginContext);


  const submitHandle = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://commerce-backend-test.onrender.com/api/auth/login", {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: user.email, password: user.password })

      });
      const json = await response.json();
      console.log("json data login =",json);
      if (json.success) {
        console.log('username =', json.user.name)
        navigate('/');
        alert("welcome " + json.user.name)
        localStorage.setItem('KidsCommerce', json.authToken);
        localStorage.setItem('username', json.user.name);
        localStorage.setItem('userStatus', true);
        localStorage.setItem("userData",JSON.stringify(json.user))
        ContextValue.updateUser(json.user);

      }
      else {
        alert(json.error)

      }
    }
    catch {
      console.log("sorry some error occured")
    }

  }
  return (
    <div className='login'>
      <div className='login-form'>
        <h2>Login</h2>

        <form onSubmit={e => submitHandle(e)}>
          <label>Email</label>
          <input type='email' name="email" required onChange={e => setUser({ ...user, [e.target.name]: e.target.value })} />

          <label>Password</label>
          <input type='password' name="password" required onChange={e => setUser({ ...user, [e.target.name]: e.target.value })} />

          <div className='submit-btn-container'>
            <button type='submit' className='submit-btn'>SIGN IN</button>
            <span style={{ color: '#00bcb4' }}> <Link to="/signup"> Create Account </Link></span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login