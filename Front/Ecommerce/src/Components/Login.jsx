import React from 'react';
import './style.css';
import axios from 'axios'
import { useState } from 'react';
import { useNavigate} from 'react-router-dom'



const Login = () => {
    const [values, setValues] = useState({
        email:'',
        password:''
    })

    const [error, setError] = useState(null)

    const navigate = useNavigate()
    axios.defaults.withCredentials = true;

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:3000/auth/adminlogin',values)
        .then(result=> {
            if(result.data.loginStatus){
                navigate('/dashboard')
            } else {
                setError(result.data.Error)

            }

        })
        .catch(err=> console.log(err))
    }

  return (
    <div className="login-container">
      <div className="login-box">
        <div className='color'>
            {error && error}
        </div>
        <h2> Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email"><strong>Email:</strong></label>
            <input type="email" name="email" autoComplete="off" placeholder="Enter email" onChange={(e)=> setValues({...values, email : e.target.value})}/>
          </div>
          <div className="input-group">
            <label htmlFor="password"><strong>Password:</strong></label>
            <input type="password" name="password" placeholder="Enter password" onChange={(e)=> setValues({...values, password : e.target.value})}/>
          </div>
          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
