import React, { useState } from 'react'
import "../App.css"
import 'bootstrap/dist/css/bootstrap.css'
import { useNavigate } from 'react-router-dom';



export const Login = () => {
    const navigate = useNavigate();

  const [email ,setEmail] =useState("");
  const [password,setPassword] = useState("");


   const loginData = async(e)=>{
            e.preventDefault();

            const res = await fetch('/signin',{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                     email, password
                })
            })

            const data = await res.json()
            if(res.status === 400 || !data){
                window.alert("Invalid Login");
                console.log("Invalid credentials");
            }else{
                sessionStorage.setItem("Stat",res.status)
                window.alert("sucessfully Login");
                console.log("sucessfully credentials");
                navigate("/home");
            }
            
   }


  return (
    <>
         <div className="center-container">
    <div className="card">
        <div className="card-body">
            <form>
              
            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name='email'
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    value={email}
                                    onChange={(e)=>setEmail(e.target.value)}
                                    placeholder="Enter email"
                                />
                               
                            </div>
                <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name='password'
                                    id="exampleInputPassword1"
                                    value={password}
                                    onChange={(e)=>setPassword(e.target.value)}
                                    placeholder="Password"
                                />
                            </div>
                
                <button type="submit" className="btn btn-primary"    value="login" onClick={loginData}>Login</button>
            </form>
        </div>
    </div>
</div>
    </>
  )
}
