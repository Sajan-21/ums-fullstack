// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// function EditDetails() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [age, setAge] = useState("");
//   const [image, setImage] = useState(null); // State for image
//   const navigate = useNavigate();
//   const params = useParams();
//   const id = params.id;

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3000/user/${id}`);
//         const data = response.data.data;

//         setName(data.name);
//         setEmail(data.email);
//         setAge(data.age);
//       } catch (error) {
//         console.error(
//           "Error fetching user:",
//           error.response?.data || error.message
//         );
//       }
//     };

//     fetchUser();
//   }, [id]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append("name", name);
//       formData.append("email", email);
//       formData.append("age", age);
//       if (image) {
        
//         formData.append("image", image); // Append image if available
//       }

//       let response = await axios.put(`http://localhost:3000/user/${id}`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data", // Required for file uploads
//         },
//       });

//       alert("User updated successfully!");
//       navigate("/success"); // Redirect or handle as needed
//     } catch (error) {
//       console.error("Error updating user:", error.response?.data || error.message);
//       alert("Failed to update user.");
//     }
//   };

//   return (
//     <div>
//       <div className="flex flex-col gap-10 justify-center items-center p-20">
//         <div className="flex justify-center items-center">
//           <p className="text-2xl font-bold text-white">Edit User Details</p>
//         </div>
//         <form
//           onSubmit={handleSubmit}
//           className="w-4/6 flex flex-col gap-10 justify-center items-center p-10 border-white border-2 rounded-md"
//         >
//           <div className="flex flex-col gap-3 w-full">
//             <label htmlFor="name" className="text-white">
//               Name
//             </label>
//             <input
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               type="text"
//               id="name"
//               className="w-full rounded-md border border-stone-950 p-2"
//             />
//           </div>
//           <div className="flex flex-col w-full gap-3">
//             <label htmlFor="email" className="text-white">
//               Email
//             </label>
//             <input
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               type="email"
//               id="email"
//               className="w-full rounded-md border border-stone-950 p-2"
//             />
//           </div>
//           <div className="flex flex-col w-full gap-3">
//             <label htmlFor="age" className="text-white">
//               Age
//             </label>
//             <input
//               value={age}
//               onChange={(e) => setAge(e.target.value)}
//               type="number"
//               id="age"
//               className="w-full rounded-md border border-stone-950 p-2"
//             />
//           </div>
//           <div className="flex flex-col w-full gap-3">
//             <label htmlFor="image" className="text-white">
//               Profile Picture
//             </label>
//             <input
//               onChange={(e) => setImage(e.target.files[0])} // Set image file to state
//               type="file"
//               id="image"
//               className="w-full rounded-md border border-white p-2"
//             />
//           </div>
//           <div>
//             <button
//               type="submit"
//               className="bg-green-800 text-white px-3 py-2 rounded-md"
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default EditDetails;


import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditDetails() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [image, setImage] = useState(null); // State for image file
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/user/${id}`);
        const data = response.data.data;

        setName(data.name);
        setEmail(data.email);
        setAge(data.age);
      } catch (error) {
        console.error(
          "Error fetching user:",
          error.response?.data || error.message
        );
      }
    };

    fetchUser();
  }, [id]);

  const handleImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let base64Image = null;
      let requestBody;
      if (image) {
        // Convert image to Base64
        base64Image = await handleImageToBase64(image);
        requestBody = {
            name,
            email,
            age,
            image: base64Image, // Include Base64 image if available
          };
      }else{
        requestBody = {
            name,
            email,
            age,
          };
      }

      let response = await axios.put(`http://localhost:3000/user/${id}`, requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      let data = response.data;
      alert(data.message);
      navigate(0);
    } catch (error) {
      console.error("Error updating user:", error.response?.data || error.message);
      alert("Failed to update user.");
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-10 justify-center items-center p-20">
        <div className="flex justify-center items-center">
          <p className="text-2xl font-bold text-white">Edit User Details</p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-4/6 flex flex-col gap-10 justify-center items-center p-10 border-white border-2 rounded-md"
        >
          <div className="flex flex-col gap-3 w-full">
            <label htmlFor="name" className="text-white">
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="name"
              className="w-full rounded-md border border-stone-950 p-2"
            />
          </div>
          <div className="flex flex-col w-full gap-3">
            <label htmlFor="email" className="text-white">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              className="w-full rounded-md border border-stone-950 p-2"
            />
          </div>
          <div className="flex flex-col w-full gap-3">
            <label htmlFor="age" className="text-white">
              Age
            </label>
            <input
              value={age}
              onChange={(e) => setAge(e.target.value)}
              type="number"
              id="age"
              className="w-full rounded-md border border-stone-950 p-2"
            />
          </div>
          <div className="flex flex-col w-full gap-3">
            <label htmlFor="image" className="text-white">
              Profile Picture
            </label>
            <input
              onChange={(e) => setImage(e.target.files[0])} // Set file to state
              type="file"
              id="image"
              className="w-full rounded-md border border-stone-950 p-2"
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-green-800 text-white px-3 py-2 rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditDetails;
