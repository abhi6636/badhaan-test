import { useEffect, useState } from "react"
import { useNavigate, Navigate } from "react-router-dom"
import NavBar from "../components/Navbar"
import { UpdateApi, UserDetailsApi } from "../services/Api"
import { logout,isAuthenticated } from "../services/Auth"

export default function DashboardPage(){
    const navigate = useNavigate();

    const [user,setUser] = useState({name:"",email:"",localId:"",phone:"",place:""})

    useEffect(()=>{
        if(isAuthenticated()){
            UserDetailsApi().then((response)=>{
               
                setUser({
                    name:response.data.users[0].displayName,
                    email:response.data.users[0].email,
                    localId:response.data.users[0].localId,
                    phone:response.data.users[0].phone,
                    place:response.data.users[0].place,
                })
            })
        }
    },[])

    const logoutUser = ()=>{
        logout();
        navigate('/login')
    }



    const initialStateErrors = {
        name:{required:false},
        email:{required:false},
        phone:{required:false},
        place:{required:false},
        custom_error:null
    };
    const [errors,setErrors] = useState(initialStateErrors);

    const [loading,setLoading]  =  useState(false);

    const handleSubmit = (event)=>{
        event.preventDefault();
        let errors =initialStateErrors; 
        let hasError = false; 
        if (inputs.name == "") {
            errors.name.required =true;
            hasError=true;
        }


        if (inputs.phone == "") {
            errors.phone.required =true;
            hasError=true;
        }
        if (inputs.place == "") {
            errors.place.required =true;
            hasError=true;
        }


        if (!hasError) {
            setLoading(true)

            UpdateApi(inputs).then((response)=>{
            }).catch((err)=>{
                if (err.response.data.error.message== "EMAIL_EXIST"){
                    setErrors({...errors, custom_error:"Email Already Exists !"})
                }
            }).finally(()=>{
                setLoading(false)
            })
        }
        console.log(initialStateErrors,errors);
        setErrors(errors);
    }

    const [inputs,setInputs] = useState({
        name:"",
        phone:"",
        place:"",
    })

    const handleInput = (event)=>{
        setInputs({...inputs,[event.target.name]:event.target.value})
    }



    if (!isAuthenticated()) {
        return <Navigate to="/login" />
    }

    return (
        <div>
            <NavBar logoutUser={logoutUser} />
            <main role="main" className="container mt-5">
                <div className="container">
                    <div className="text-center mt-5">
                        <h3>Profile</h3><hr/>
                        { user.name && user.email && user.localId ?
                            (<div>
                                <h5>Hi {user.name}</h5>
                                <p> your Firebase ID is {user.localId}</p>
                                <p>Your email is {user.email}</p>
                                <p>Your Phone Number is {user.phone}</p>
                                <p>Your Location is {user.place}</p>

                            </div>):<p>Loading...</p>
                        }
                    </div>
                </div>
            </main>


            <section className="register-block">
                <div className="container">
                <div className="row ">
                    <div className="col register-sec">
                        <h3 className="text-center">Update Profile</h3>
                        <form onSubmit={handleSubmit} className="register-form" action="" >
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1" className="text-uppercase">New Name</label>
            
                            <input type="text" className="form-control" onChange={handleInput} name="name" id=""  />
                        { errors.name.required?
                            (<span className="text-danger" >
                                    Name is required.
                                </span>):null
                            }
                        </div>


                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1"  className="text-uppercase">New Phone Number</label>
            
                            <input type="number"  className="form-control" onChange={handleInput} name="phone" id=""  />
                            { errors.email.required?
                            (<span className="text-danger" >
                                Phone Number is required.
                            </span>):null
                            }
                        </div>

                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1"  className="text-uppercase">New Place</label>
            
                            <input type="text"  className="form-control" onChange={handleInput} name="place" id=""  />
                            { errors.email.required?
                            (<span className="text-danger" >
                                Place is required.
                            </span>):null
                            }
                        </div>
                            


                        <div className="form-group">
            
                            <span className="text-danger" >
                            { errors.custom_error?
                            (<p>{errors.custom_error}</p>)
                            :null
                            }
                            </span>
                            {loading ?
                            (<div  className="text-center">
                                <div className="spinner-border text-primary " role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>):null
                            }
            
                            <input type="submit" className="btn btn-login float-right" disabled={loading}  value="Update" />
                        </div>
                
            
            
                        </form>
            
            
                    </div>
            
                </div>
            
            
                </div>
            </section>  

        </div>
    )
}