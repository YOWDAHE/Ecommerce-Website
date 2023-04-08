import { useEffect, useState } from "react";


import { collection, getDocs, doc, setDoc, addDoc } from 'firebase/firestore';
import { db, storage } from "../features/firebaseConfig";
import { auth } from "../features/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import MainComp from "./MainComponent";

const Addpage = () => {

  const props = useLocation().state;
  const [subited, setSubmited] = useState(false);
  const [Product, setProduct] = useState(props?.title);
  const [Price, setPrice] = useState(props?.price);
  const [Amount, setAmount] = useState(0);
  const [Catagory, setCatagory] = useState(props?.type);
  const [url, setUrl] = useState("");
  const [percentage, setPercentage] = useState(null);
  const [description, setDescription] = useState(props?.dec);


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
  }, [file])

  console.log(props == null ? 'empty' : 'full');

  const handleUpload = async (e) => {
    e.preventDefault();
    {
      props == null ?
        await addDoc(collection(db, "items"), {
          img: url,
          title: Product,
          price: Price,
          amount: 0,
          type: Catagory,
          incart: false,
          desc: description,
          userId: auth?.currentUser?.uid
        })
          .then(setSubmited(true))
        :
        await setDoc(doc(db, "items", props?.id), {
          img: url,
          title: Product,
          price: Price,
          amount: Amount,
          type: Catagory,
          incart: false,
          desc: description,
          userId: auth?.currentUser?.uid
        })
          .then(setSubmited(true))
    }
  }
  return (

    <>
      <div className="bg-gray-100 h-10 w-fill flex  px-4 items-center justify-between mb-5">
        <div>
          <Link to="/">
            <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
          </Link>
        </div>
      </div>
      <div className='flex justify-center w-full'>
        <div className=' w-full lg:w-4/12 md:w-7/12 text-black flex flex-col items-center p-5'>
          <form className="flex flex-col justify-center w-full" onSubmit={handleUpload}>
            <div>
              <div>
                <label htmlFor="first_name" class="block mb-2 font-medium text-gray-900 ">Product name</label>
                <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Samsung" value={Product} required onChange={(e) => {
                  setProduct(e.target.value);
                }}></input>
              </div>
              <div>
                <label htmlFor="first_name" class="block mb-2 font-medium text-gray-900 ">Price</label>
                <input type="number" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="200" value={Price} required onChange={(e) => {
                  setPrice(e.target.value);
                }}></input>
              </div>
              <div>

                <label htmlFor="countries" class="block mb-2 font-medium text-gray-900 ">Select an option</label>
                <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => {
                  setCatagory(e.target.value);
                }}>
                  <option disabled>Catagory</option>
                  <option value="phone">Phone</option>
                  <option value="laptop">laptop</option>
                  <option value="tablet">tablet</option>
                  <option value="desktop">desktop</option>
                </select>

              </div>
              <div className="flex">
                <div>
                  <label className="block mb-2 font-medium text-gray-900 " htmlFor="multiple_files">Upload image</label>
                  <input className="block w-full text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:border-gray-600 dark:placeholder-gray-400" id="multiple_files" type="file" onChange={(e) => {
                    setFile(e.target.files[0]);
                  }} />
                </div>

                {/* loading icon */}

                {percentage < 100 && percentage != null && <div className="flex items-end ml-2" >
                  <div class="flex items-center justify-center w-10 h-10 bg-transparent ">
                    <div role="status">
                      <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-200 fill-green-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" /><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" /></svg>
                      <span class="sr-only">Loading...</span>
                    </div>
                  </div>

                  </div>}
              </div>
              <div>

                <label htmlFor="message" className="block mb-2 font-medium text-gray-900 ">Your discription</label>
                <textarea id="message" rows="4" className="p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-600 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your thoughts here..." value={description} onChange={(e) => {
                  setDescription(e.target.value);
                }} />

              </div>

              <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none disabled:bg-red-500  disabled:hover:opacity-10 disabled:cursor-not-allowed dark:focus:ring-blue-800 m-4" disabled={percentage == null || (percentage != null && percentage < 100)} >{subited ? 'Submited' : 'Submit'}</button>
            </div>
          </form>

        </div>

      </div>
    </>
  )
}



export default Addpage;