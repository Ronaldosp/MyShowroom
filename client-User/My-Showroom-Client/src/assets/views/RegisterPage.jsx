import {useState} from "react"
import {useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux"
import Button from 'react-bootstrap/Button';
import { register } from "../store/action/actionCreator";

function RegisterPage(){
    const [username , setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return <>
        <div style={{
        backgroundImage: 'url("https://www.pierarchitects.co.uk/wp-content/uploads/2024/07/modern-car-showroom-architects.jpg")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <div className="container " style={{maxWidth: '800px',
        width: '100%',
        backgroundColor: 'white',
        padding: '25px 30px',
        borderRadius: '5px',
        boxShadow: '0 5px 10px rgba(0, 0, 0, 0.15)',
        border:'5' }}>
            <h1 className="d-flex justify-content-center text-align-center">Register Form</h1>
            <div className="container" >
         <form onSubmit={(event)=>{
          event.preventDefault();

          if(!email.trim() || !password.trim() || !username.trim()){
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "email , password , username are required",
            });
            return;
          }

          if (password !== confirmPassword) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Passwords do not match",
            });
            return;
          }

          const registerData={
            email , password , username , role
          };

          dispatch(register(registerData))
          .then(()=>{
            Swal.fire("Success", "Register Successful!", "success");
            navigate('/login')
          })
          .catch((error)=>{
            Swal.fire("Error", error.message, "error");
          })
          navigate('/')

        }}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input 
            className="form-control" 
            type="text"
            value={username}
            onChange={(event)=>{
              const value = event.target.value
              setUsername(value)
            }}
             />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input 
            className="form-control" 
            type="email"
            value={email}
            onChange={(event)=>{
              const value = event.target.value
              setEmail(value)
            }}
             />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          
          <div className="d-flex justify-content-center text-align-center">
           <Button  type="submit" className="btn btn-dark">
          Register 
          </Button>
          </div>
        </form>
        </div>
        </div>
        </div>
    </>
}

export default RegisterPage