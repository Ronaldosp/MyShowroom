import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { useDispatch } from "react-redux";
import { login } from "../store/action/actionCreator";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogin=()=>{
    const loginData = {
      email,
      password
    }
    console.log(loginData,"LOG");
    
    dispatch(login(loginData))
    .then(()=>{
      Swal.fire("Success", "Admin Login Successful!", "success");
      navigate('/')
    })
    .catch((error)=>{
      Swal.fire("Error", error.message, "error");
    })
  }

  return (
    <>
    <div className="LoginPage-Component" style={{
        backgroundImage: 'url("https://www.topgear.com/sites/default/files/images/news-article/2015/07/a30031998bbb016474519ca452ccce84/a_rp_-_opener.jpg")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}> 
    <div className="container" style={{
        maxWidth: '400px',
        width: '100%',
        backgroundColor: 'white',
        padding: '25px 30px',
        borderRadius: '5px',
        boxShadow: '0 5px 10px rgba(0, 0, 0, 0.15)',
      }}>
      <h1 className="d-flex justify-content-center text-align-center">Login</h1>
      <div className="container ">
      <form 
        onSubmit={(event) => {
          event.preventDefault();
          dispatch(handleLogin())
        }}
      >
        <div className="email-group mb-3">
          <label className="form-label">Email</label>
          <input
            className="form-control"
            type="email"
            value={email}
            onChange={(event) => {
              const value = event.target.value;
              setEmail(value);
            }}
          />
        </div>
        <div className="password-group mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(event) => {
              const value = event.target.value;
              setPassword(value);
            }}
          />
        </div>
        <div className="button-group">
            <Button type="submit" variant="outline-success">
            Login
            </Button>
        </div>
      </form>
      </div>
      </div>
      </div>
    </>
  );
}

export default LoginPage;
