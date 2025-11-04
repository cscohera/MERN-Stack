import React, { useState } from 'react'
import styles from "./PageComponents/LoginStylePage.module.css"
import { useNavigate } from 'react-router';
import toast from "react-hot-toast";
import axios from "axios"

function LoginPage() {

    const navigate = useNavigate();

    const goToCreateAccount = () => {
        navigate("/createUser");
    };

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [Login, setLogin] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault();
        
        
        const configuration = {
            method: "get",
            url:"http://localhost:8080/users/getUsername",
            params:{
                username,
                password,
            },
        };

        axios(configuration)
        .then((response) => {
            const user = response.data; 
            const role = user.role;
            setLogin(true)
            toast.success("Logged in")
            if (role === "coach") {
                navigate("/CoachPage");
            } else {
                navigate("/home");
            }
        })
        .catch((error) => {
            console.error(error);
            setLogin(false);
            toast.error("Login failed, ensure information is correct")
        });

    }


    return (

    <div className={styles.login}>
        <h1 className={styles.heading1}>Welcome back to Momentum</h1>
        <h2 className={styles.heading2}>Ready to Sign In?</h2>
    <div className={styles.container}>
      <div className="text-center">
        <form onSubmit={(e) => handleSubmit(e)} className="form-signin" style={{ maxWidth: '330px', margin: 'auto', padding: '15px' }}>
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
  
          <label htmlFor="inputUsername" className="sr-only">
            Username
          </label>
          <input
            type="username"
            name="username"
            value={username}
            id="inputUsername"
            className="form-control mb-2"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
            autoFocus
          />
  
          <label htmlFor="inputPassword" className="sr-only">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            id="inputPassword"
            className="form-control mb-3"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

        <button onClick={goToCreateAccount} type="button" className="btn btn-sm mb-2 btn-secondary btn-block w-20">New Runner? Sign Up</button>
  
          <button onClick={(e) => handleSubmit(e)} className="btn btn-lg btn-primary btn-block w-100" type="submit">
            Login
          </button>
          {Login ? (
            <p className='text-success'>You are logged in Successfully</p>
          ): (
            <p className='text-danger'>You are not logged in</p>
          )}
        
        </form>
      </div>
      </div>
      </div>
    )
  }
  
  export default LoginPage;
