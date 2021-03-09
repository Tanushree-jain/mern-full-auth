import React, {useState} from "react"; 
import { Link, useHistory } from "react-router-dom";
import axios from 'axios'
import {showErrMsg, showSuccessMsg } from '../../utils/notification/Notification'
import {dispatchLogin} from '../../../redux/actions/authAction'
import {useDispatch} from 'react-redux'
import './login.css'

const initialState = {
     email: '',
     password: '',
     err:'',
     success:''


}

function Login() {
     const [user, setUser] = useState(initialState)
     const dispatch = useDispatch()
     const history = useHistory()

     const {email, password, err, success}= user

     const handleChangeInput = e => {
          const {name, value} = e.target
          setUser({...user, [name]:value, err: '', success: ''})
      }

      const handleSubmit = async e => {
          e.preventDefault()
          try {
              const res = await axios.post('/user/login', {email, password})
              setUser({...user, err: '', success: res.data.msg})


              localStorage.setItem('firstLogin', true)

              dispatch(dispatchLogin())
              history.push("/")
          } catch (err) {
              err.response.data.msg && 
              setUser({...user, err: err.response.data.msg, success: ''})
          }
      }

return (
<div className=" w3l-login-form">
     <h2>Login</h2>
     {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}

            <form onSubmit={handleSubmit} >
            <div className=" w3l-form-group">
                    <label htmlFor="email">Email Address</label>
                    <div className="group">
                    <input type="text" placeholder="Enter email address" id="email"
                    value={email} name="email" onChange={handleChangeInput} />
                    </div>
                </div>

                <div className=" w3l-form-group">
                    <label htmlFor="password">Password</label>
                    <div className="group">
                    <input type="password" placeholder="Enter password" id="password"
                    value={password} name="password" onChange={handleChangeInput} />
                    </div>
                </div>
                <div className="forgot">
                <Link to="/forgot_password">Forgot your password?</Link>
                </div>
                <div className="row">
                    <button type="submit">Login</button>
                   
                </div>
            </form>

            <p className=" w3l-register-p">Don't have an account? <Link to="/register" className="register">Register</Link></p>
</div>
)
}

export default Login;