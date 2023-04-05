import { useSelector, useDispatch } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import { togglePage, toggleSinup } from "../features/SinUpSlice";
import { useState, useRef } from "react";
import  "../features/Authentication";
import { Authentication } from "../features/Authentication";
import { createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { auth, googleProvider } from "../features/firebaseConfig";

const SinUp = () => {
    const dispatch = useDispatch();
    const { sinup, sinin } = useSelector((state) => state.sinUp);
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const [errMessage, setErrMessage] = useState(false);
    const [passwordCorrect, setPasswordCorrect] = useState(false);
    const passBox = useRef();
    const errorHandle = useRef();
    
    const passChecker = (e) => {
        passBox.current.style.opacity = 1;
        if (password === e.target.value) {
            setPasswordCorrect(true);
        } else {
            setPasswordCorrect(false);
        }
    }
    const siningIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        }
        catch (error) {
            const errorMessage = error.message;
            const regex = /(?<=auth\/)(.*?)(?=\))/;
            const match = errorMessage.match(regex);
            errorHandle.current.innerHTML = errMessage;
            setErrMessage(match[0]);
        }
        dispatch(togglePage());
    }
    const siningUp = async () => {
        console.log("hi")
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        }
        catch (error) {
            const errorMessage = error.message;
            const regex = /(?<=auth\/)(.*?)(?=\))/;
            const match = errorMessage.match(regex);
            errorHandle.current.innerHTML = errMessage;
            console.log(match[0]);
            setErrMessage(match[0]);
        }
    }

    const signUpWithGoogle = async () => {
        await signInWithPopup(auth, googleProvider);
    }
    const submiting = async (e) => {
        e.preventDefault();
        console.log(auth?.currentUser?.uid);
        if (passwordCorrect === true && sinup) {
            siningUp();
        }
        else if (sinin) {
            siningIn();
        }
    }



  return (
      <div className='absolute w-screen h-screen bg-gray-500 bg-opacity-50 z-40 -mt-5 container flex justify-center items-center'>
          <div className="bg-white  w-72 rounded-3xl flex flex-col items-center p-4 relative">
              <FontAwesomeIcon icon={faX} className='absolute right-4 h-3  hover:text-red-600' onClick={() => {
                  dispatch(togglePage());
              }}></FontAwesomeIcon>
              {sinup && <h4>Sign Up</h4>}
              {sinin && <h4>Sign In</h4>}
              <form action="" className="flex flex-col items-center w-full relative" onSubmit={submiting}>
                  <input type="text" placeholder="Email" className="bg-white border-solid border-2 border-gray-400 rounded-lg px-2 h-8 w-4/5 text-sm mb-3" value={email} onChange={(e) => {
                      setemail(e.target.value);
                  } } />
                
                  <input type="password" placeholder="Password" className=" bg-white border-solid border-2 border-gray-400 rounded-lg px-2 h-8 w-4/5 text-sm mb-3" value={password} onChange={(e) => {
                      setPassword(e.target.value);
                  } } />

                {sinup && <input type="password" placeholder="Confirm Password" className=" bg-white border-solid border-2 border-gray-400 rounded-lg px-2 h-8 w-4/5 text-sm mb-3" onChange={passChecker}  />}
                
                  <div className="absolute right-1 top-24 opacity-0" ref={passBox}>
                      {passwordCorrect && <FontAwesomeIcon icon={faCheck} className='text-green-600' ></FontAwesomeIcon>}

                      {!passwordCorrect && <FontAwesomeIcon icon={faX} className="text-red-700"></FontAwesomeIcon>}
                  </div>

                <p ref={errorHandle} className="text-red-600 text-sm"></p>
                  <button className="mt-2 mb-2 px-6 py-2 bg-blue-600 rounded-xl text-white hover:bg-blue-700 " type="submit">{sinup && 'Sign Up'}{sinin && 'Log In'}</button>
              </form>
              {sinup && <button className="text-xs" onClick={() => {
                  dispatch(toggleSinup());
              }}>Aready have an account?</button>}
              {sinin && <button className="text-xs" onClick={() => {
                  dispatch(toggleSinup());
              }}>Dont have an account?</button>}

              <div className="pt-4">
                  <FontAwesomeIcon icon={faGoogle} className="h-6 px-3 hover:cursor-pointer" onClick={signUpWithGoogle}></FontAwesomeIcon>
                  <FontAwesomeIcon icon={faFacebook} className="h-6 hover:cursor-pointer"></FontAwesomeIcon>
              </div>
              
          </div>
      </div>
  )
}

export default SinUp