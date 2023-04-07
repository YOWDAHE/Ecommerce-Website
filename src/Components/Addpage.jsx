import { useEffect, useState } from "react";


import { collection, getDocs, doc } from 'firebase/firestore';
import { db } from "../features/firebaseConfig";

const Addpage = () => {
    
  
  return (
    <div className='flex justify-center'>
      <div className=' w-11/12 md:w-6/12 bg-gray-900 rounded-xl flex flex-col items-center p-5'>
        <form >
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="multiple_files">Upload image</label>
            <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="multiple_files" type="file" />
          </div>

        </form>


      </div>
    </div>
  )
}



export default Addpage;