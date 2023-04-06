import { useState } from "react";


const Addpage = () => {
    
  const [image, setImage] = useState(null);
  const [base64, setBase64] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = btoa(reader.result);
      setImage(URL.createObjectURL(file));
      setBase64(base64String);
    };
  };
  const handleBase64Change = () => {
    const img = new Image();
    img.src = `data:image/jpeg;base64,${base64}`;
    setImage(img.src);
    
  };





    return (
      <div className='flex justify-center'>
        <div className=' w-11/12 md:w-6/12 bg-gray-900 rounded-xl flex flex-col items-center p-5'>
          <div>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="multiple_files">Upload image</label>
            <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="multiple_files" type="file" onChange={handleFileChange} />
          </div>
          <p className="w-full whitespace-normal">{base64}</p>
          <button onChange={handleBase64Change}>change</button>
          <img src={image} alt="" />

        </div>
      </div>
    )
}



export default Addpage;