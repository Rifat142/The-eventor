import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer2 from "../Components/Footer2";
import { useContext, useState } from "react";
import { AuthContext } from "../Authprovider/Authprovider";
import Swal from "sweetalert2";

import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import app from "../Firebase/Firebase.config";

const Login = () => {
    const {user,setUser} = useState(null)
    const auth = getAuth(app)
    const provider = new GoogleAuthProvider()
    const handleGoogleSignIn = ()=>{
      signInWithPopup(auth,provider)
      .then(result=>{
        handleAlert();
        const loggedInUser = result.user
        setUser(loggedInUser)
        console.log(loggedInUser);

      })
      .catch( error=>{
        console.log('error=' , error)
      }
        
      )
    }

  const handleAlert = () => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "success",
      title: "Signed in successfully",
    });
  };
  const { signIn  } = useContext(AuthContext);
  const location = useLocation();
  console.log("locationin the login page", location);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    console.log(e.currentTarget);
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");

    // console.log(form.get("email"));
    // console.log(form.get("password"));
    signIn(email, password)
      .then((result) => {
        handleAlert();
        navigate(location?.state ? location.state : "/");
        // console.log(result.user);
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: "The user not found!",
          text: "if you don't have an account please Register",
          icon: "question"
        });
      });
  };

  return (
    <div>
      <Navbar></Navbar>

      <div className="hero min-h-screen bg-white ">
        <div className="hero-content grid">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-black">Login now!</h1>
          </div>
          <div className="card  sm:w-full lg:w-96  max-w-sm shadow-2xl bg-blue-300">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="input input-bordered bg-slate-50"
                  required
                />
              </div>
              <div className="form-control ">
                <label className="label">
                  <span className="label-text text-black">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="input input-bordered bg-slate-50"
                  required
                />
                <label className="label">
                  <a
                    href="#"
                    className="label-text-alt link link-hover text-black"
                  >
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6 gap-3">
                <button className="btn btn-primary text-white">Login</button>
                <button onClick={handleGoogleSignIn} className="btn btn-primary text-white">Login with Google</button>
              </div>
              <div>
                <p className="text-black">
                  If u don't have an account,
                  <NavLink
                    className={"link link-hover font-bold"}
                    to="/register"
                  >
                    Register Now!
                  </NavLink>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer2></Footer2>
    </div>
  );
};

export default Login;
