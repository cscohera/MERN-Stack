import React, { useState } from 'react'
import styles from "./PageComponents/LoginStylePage.module.css"
import { useNavigate } from 'react-router';
import toast from "react-hot-toast";
import axios from "axios"


function CreateAccountPage() {

    const getInitialState = () => {
      const value = "runner";
      return value;
    };
    
    const navigate = useNavigate();

    const goToLoginPage = () => {
        navigate("/");
    };

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState(getInitialState);
    const [Login, setLogin] = useState(false);
  
    const handleChange =(e)=>{
      setRole(e.target.value);
    };

    const handleSubmit = (e)=>{
      e.preventDefault();

      const doesUserExist = {
        method: "get",
        url:"http://localhost:8080/users/getUsername",
        params:{
            username,
            password,
        },
    };

      
      const createUser = {
        method: "post",
        url:"http://localhost:8080/users/createUser",
        data:{
            email,
            username,
            password,
            role,
        },
    };

          //errors if user lookup is successful creates account if lookup fails
         
    axios(doesUserExist)
    .then(() => {
      toast.error("Username already exists!");
      setLogin(false);
    })
    .catch(function(error) {
      if (error.response && error.response.status === 404) {
        axios(createUser)
          .then(() => {
            setLogin(true);
            toast.success("Logged in");

            if (role.toLowerCase() === "coach") {
              navigate("/CoachPage");
            } else {
              navigate("/home");
            }
          })
          .catch((createError) => {
            console.error("Error creating user:", createError);
            toast.error("Failed to create user");
          });
      } else {
        console.error("Error checking user:", error);
        toast.error("Error checking user");
      }
    });

          
}

    return (

    <div className={styles.login}>
        <h1 className={styles.heading1}>Welcome to Momentum</h1>
        <h2 className={styles.heading2}>Ready to Sign Up?</h2>
    <div className={styles.container}>
      <div className="text-center">
        <form onSubmit={(e)=>handleSubmit(e)} className="form-signin" style={{ maxWidth: '330px', margin: 'auto', padding: '15px' }}>
          <h1 className="h3 mb-3 font-weight-normal">Sign Up</h1>

          <label htmlFor="inputEmail" className="sr-only">
          Email address
        </label>
        <input
          type="email"
          id="inputEmail"
          name="email"
          value={email}
          className="form-control mb-2"
          placeholder="Email address"
          onChange={(e) => setEmail(e.target.value)}
          required
          autoFocus
        />
  
          <label htmlFor="inputUsername" className="sr-only">
            Username
          </label>
          <input
            type="username"
            id="inputUsername"
            name="username"
            value={username}
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
            id="inputPassword"
            name="password"
            value={password}
            className="form-control mb-3"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <select onChange={handleChange} name="role" className="form-select form-select-sm mb-3" required>
            <option value="runner">Runner</option>
            <option value="coach">Coach</option>
          </select>

        <button onClick={goToLoginPage} type="button" className="btn btn-sm mb-2 btn-secondary btn-block w-20">Returning Runner? Sign In</button>
  
          <button onClick={(e)=>handleSubmit(e)} className="btn btn-lg btn-primary btn-block w-100" type="submit">
            Sign Up
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
  
  export default CreateAccountPage;
