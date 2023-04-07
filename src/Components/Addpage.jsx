import { useEffect, useState } from "react";


import { collection, getDocs, doc, setDoc, addDoc } from 'firebase/firestore';
import { db, storage } from "../features/firebaseConfig";
import { auth } from "../features/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Addpage = () => {
  
  const [Product, setProduct] = useState("");
  const [Price, setPrice] = useState("");
  const [Amount, setAmount] = useState(0);
  const [Catagory, setCatagory] = useState("");
  const [url, setUrl] = useState("");
  const [percentage, setPercentage] = useState(null);


  const [file, setFile] = useState(null);


  useEffect(() => {
    const uploadImage = async () => {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed',
        (snapshot) => {

          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          setPercentage(progress);
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error, "image upload error");
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUrl(downloadURL);
            console.log('File available at', downloadURL);
          });
        }
      );
    };
    file && uploadImage();
  },[file])

  const handleUpload = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "items"), {
      img: url,
      title: Product,
      price: Price,
      amount: Amount,
      type: Catagory,
      incart: false,
      userId: auth?.currentUser?.uid
    });

    // await setDoc(doc(db, "cities", "LA"), {
    //   name: "Los Angeles",
    //   state: "CA",
    //   country: "USA"
    // });
  }
  return (
    <div className='flex justify-center'>
      <div className=' w-11/12 md:w-6/12 bg-gray-900 rounded-xl flex flex-col items-center p-5'>
        <form className="flex flex-col justify-center" onSubmit={handleUpload}>
          <div>
            <label htmlFor="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product name</label>
            <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Samsung" required onChange={(e) => {
              setProduct(e.target.value);
            }}></input>
          </div>
          <div>
            <label htmlFor="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
            <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="200" required onChange={(e) => {
              setPrice(e.target.value);
            }}></input>
          </div>
          {/* <div>
            <label htmlFor="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">amount</label>
            <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0.00" required onChange={(e) => {
              setAmount(e.target.value);
            }}></input>
          </div> */}
          <div>

            <label htmlFor="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
            <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => {
              setCatagory(e.target.value);
            }}>
              <option disabled>Catagory</option>
              <option value="phone">Phone</option>
              <option value="laptop">laptop</option>
              <option value="tablet">tablet</option>
              <option value="desctop">desktop</option>
            </select>

          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="multiple_files">Upload image</label>
            <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="multiple_files" type="file" onChange={(e) => {
              setFile(e.target.files[0]);
              console.log(e.target.files[0] && 'hoi')
            }} />
          </div>
          <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none disabled:bg-red-500  disabled:hover:opacity-10 disabled:cursor-not-allowed dark:focus:ring-blue-800 m-4" disabled={percentage == null ||( percentage != null && percentage < 100)} >Submit</button>
        </form>


      </div>
    </div>
  )
}



export default Addpage;