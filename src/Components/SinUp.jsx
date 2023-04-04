import { useSelector, useDispatch } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { togglePage } from "../features/SinUpSlice";

const SinUp = () => {
    const { sinup, sinin } = useSelector((state) => state.sinUp);
    const dispatch = useDispatch();

  return (
      <div className='absolute w-screen h-screen bg-gray-500 bg-opacity-50 z-40 -mt-5 container flex justify-center items-center'>
          <div className="bg-white h-80 w-72 rounded-3xl flex flex-col items-center p-4 relative">
              <FontAwesomeIcon icon={faX} className='absolute right-4 h-3  hover:text-red-600' onClick={() => {
                  dispatch(togglePage());
              }}></FontAwesomeIcon>
              {sinup && <h4>Sin Up</h4> }
              {sinin && <h4>Sin In</h4>}
              <input type="text" placeholder="Email" className="bg-white border-solid border-2 border-gray-400 rounded-lg px-2 h-8 w-4/5 text-sm mb-3" />
              
              <input type="password" placeholder="Password" className=" bg-white border-solid border-2 border-gray-400 rounded-lg px-2 h-8 w-4/5 text-sm mb-3"/>

              {sinup && <input type="password" placeholder="Confirm Password" className=" bg-white border-solid border-2 border-gray-400 rounded-lg px-2 h-8 w-4/5 text-sm mb-3" />}
              
              {sinup && <button className="mt-2 mb-2 px-6 py-2 bg-blue-600 rounded-xl text-white hover:bg-blue-700 ">Sin UP</button>}
              {sinup && <button className="text-xs">Aready have an account?</button>}

              <div className="pt-4">
                  <FontAwesomeIcon icon={faGoogle} className="h-6 px-3 hover:cursor-pointer"></FontAwesomeIcon>
                  <FontAwesomeIcon icon={faFacebook} className="h-6 hover:cursor-pointer"></FontAwesomeIcon>
              </div>
              
          </div>
      </div>
  )
}

export default SinUp