import { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/Navbar";
import { PasswordApi } from "../services/Api";
import { storeUserData } from "../services/Storage";
export default function ForgotPassword(){

    const initialStateErrors = {
        email:{required:false},
        custom_error:null
    };

    const [errors,setErrors] = useState(initialStateErrors);
    const [loading,setLoading]  =  useState(false);

    const [inputs,setInputs] = useState({
        email:"",
    })

    const handleInput = (event)=>{
        setInputs({...inputs,[event.target.name]:event.target.value})
    }

    const handleSubmit = (event)=>{
        event.preventDefault();
        let errors =initialStateErrors; 
        let hasError = false; 

        if (inputs.email == "") {
            errors.email.required =true;
            hasError=true;
        }

        if (!hasError) {
            setLoading(true)
            PasswordApi(inputs).then((response)=>{
                storeUserData(response.data.idToken)
              }).catch((err)=>{
                  if (err.response.data.error.message== ""){
                      setErrors({...errors, custom_error:""})
                  }
              }).finally(()=>{
                  setLoading(false)
              })
        }
        console.log(initialStateErrors,errors);
        setErrors(errors);
    }
    return(

        <div><NavBar/>

        <section className="login-block">
        <div className="container">
            <div className="row ">
                <div className="col login-sec">
                    <h2 className="text-center">Change Password</h2>
                    <form onSubmit={handleSubmit} className="login-form" action="">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1" className="text-uppercase">Email</label>
                        <input type="email"  className="form-control" onChange={handleInput} name="email"  id="" placeholder="email"  />
                    { errors.email.requires?
                        (<span className="text-danger" >
                            Email is required.
                        </span>):null}
                        
                    </div>

                    <div className="form-group">
                    {loading ?
                            (
                        <div  className="text-center">
                            <div className="spinner-border text-primary " role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>):null}
                    
                        <span className="text-danger" >
                            { errors.custom_error?
                            (<p>{errors.custom_error}</p>)
                            :null
                            } </span>
                        <input  type="submit" disabled={loading} className="btn btn-login float-right"  value="Reset password" />
                    </div>
                    <div className="clearfix"></div>
                    <div className="form-group">
                    Create new account ? Please <Link  to="/register">Register</Link>
                    </div>
                    <div className="clearfix"></div>
                        <div className="form-group">
                        Already have account? Please <Link to="/login">Login</Link> ?
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
    </div>
    )
}