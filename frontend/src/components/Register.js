import React from 'react';
import "../App.css";
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
    const navigate = useNavigate(); 
    const [user, setUser] = React.useState({
        name: "",
        email: "",
        password: "",
        phone: ""
    });

    const handleInputs = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
    };

    const postData = async (e) => {
        e.preventDefault();
        const { name, email, password, phone } = user;

        const res = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, password, phone
            })
        });

        const data = await res.json();

        if (res.status === 422 || !data ) {
            window.alert("inavlid registered");
            console.log("invalid registered now");
        }  else {
            window.alert("Successfully registered");
            console.log("Successfully registered now");
            navigate("/login");
           
        }
    };

    return (
        <>
            <div className="center-container">
                <div className="card">
                    <div className="card-body">
                        <form  method='POST'  onSubmit={handleSubmit}  >
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name='name'
                                    id="Name"
                                    aria-describedby="name"
                                    value={user.name}
                                    onChange={handleInputs}
                                    placeholder="Enter Name"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name='email'
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    value={user.email}
                                    onChange={handleInputs}
                                    placeholder="Enter email"
                                />
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name='password'
                                    id="exampleInputPassword1"
                                    value={user.password}
                                    onChange={handleInputs}
                                    placeholder="Password"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone no</label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    name='phone'
                                    id="tel"
                                    aria-describedby="tel"
                                    value={user.phone}
                                    onChange={handleInputs}
                                    placeholder="Enter Phone no"
                                />
                            </div>
                            <button type="submit" className="btn btn-primary"  value="register" onClick={postData}>Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
