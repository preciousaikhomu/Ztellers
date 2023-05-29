import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";

export default function CreateListing() {
  const navigate = useNavigate();

  const auth = getAuth();

  //We're going to add that geolocation hook.
  const [geolocalEnabled, setGeolocalEnabled] = useState(true);
  //console.log(geolocalEnabled);

  //we just create a constant and we call it loading with the function sit loading to change this loading
  //And this is going to be equal to use a state with the initial value of false. after the clicking with make it true
  const [loading, setLoading] = useState(false);

  const [listing, setListing] = useState(null);

  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    description: "",
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    latitude: 0,
    longitude: 0,
    images: {},
  });

  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    description,
    offer,
    regularPrice,
    discountedPrice,
    latitude,
    longitude,
    images,
  } = formData;

  //We can use the use params to get the ID from the URL.
  const params = useParams();

  useEffect(() => {
    if (listing && listing.userRef !== auth.currentUser.uid) {
      toast.error("You can't edit this listing ");
      navigate("/");
    }
  }, [auth.currentUser.uid, listing, navigate]);

  //Edit Listing
  useEffect(() => {
    setLoading(true);

    const fetchListing = async () => {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setFormData({ ...docSnap.data() });
        setLoading(false);
      } else {
        navigate("/");
        toast.error("Listing does not exist");
      }
    };
    //we need to call this function here because We cannot Change the use effects function to asynchronous. So we made a synchronous function here and we call it at the bottom.
    fetchListing();
  }, [navigate, params.listingId]);

  const onChange = (e) => {
    //We need to Have some condition because we have inputs like true and false.
    //We have numbers and we also have files and also just text from the name and address input So we need to create a variable called Boolean.
    let boolean = null; //And the default value should be null for this.
    //And we're going to based on the input, we're going to change this boolean to true or false or you keep
    //it null and use that boolean to Change the states in the form data.

    //So we just say if the input. Which is coming from here
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }
    //So we have managed the bullion section.
    //There is another situation if the input is files.
    //Has the files inside it. Because sometimes the value is empty.
    //But we have the targeted files because we are uploading the files.
    if (e.target.files) {
      //so in this case We want to set the formdata.
      setFormData((prevState) => ({
        //First we get the previous state.
        //We want to keep the changes that happened before and we can return an object.
        //We keep the previous state by a spread operating them.
        ...prevState,
        //So we have the previous state and we set the images.
        //So in case that we have the files, we want to set the images to either target that files.
        images: e.target.files,
      }));
    }
    //But what if we don't have the images?
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        //So this is not a file. So it can be text. it can be number...
        //So for the numbers and text, that is fine either target date ID is can be equal to E the targeted value
        //But for the boolean we just say if the boolean exists, if the boolean is not null
        //Put it in an equal to E to target that ID.
        //But if it's not just do e.target.value
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    //when we click on the create listing, we're going to have the spinner and all the data is going to
    //After everything is done, we want to stop the spinner and we re going to redirect the person.
    //First and when everything is finished, you want to set it to false.
    setLoading(true);
    //It consider them as a string, not number. So this statement doesn't work. In order to be sure that is this is number, we can add a plus.
    if (+discountedPrice >= +regularPrice) {
      setLoading(false);
      toast.error("Discounted price need to be less than regular price");
      //we just want return. We don't want to continue to this function.
      return;
    }
    if (images.length > 6) {
      setLoading(false);
      toast.error("maximum 6 images are allowed");
      //we just want return. We don't want to continue to this function.
      return;
    }
    let geolocation = {};
    let location;
    if (geolocalEnabled) {
      //create a response
      //And the response is going to await and we're going to fetch the API as we are using a await.
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GEOCODE_API_KEY}`
      );
      //We still we get the data, so we get the data which is equal to another await and we're going to convert the data we are getting to the JSON.
      const data = await response.json();
      console.log(data);
      //We just say geolocation.
      //latitude is equal to the data we get, which is inside the results.
      //So this if this one is exists, then we want to go to the geometry.latitude.
      geolocation.lat = data.results[0]?.geometry.location.lat ?? 0;
      geolocation.lng = data.results[0]?.geometry.location.lng ?? 0;

      location = data.status === "ZERO_RESULTS" && undefined;

      //And if this error happens. or the this is a string.
      if (location === undefined) {
        setLoading(false);
        toast.error("Please enter a correct address");
        return;
      }
    } else {
      geolocation.lat = latitude;
      geolocation.lng = longitude;
    }

    //create this function here, and this function is going to help us to upload each image one.
    //To the database (firebase) And this is going to be a synchronous, too, because we want to..
    const storeImage = async (image) => {
      //So inside this function, we're going to return a new promise.
      //And this is going to give us two things.
      // - 1. One is the resolve.
      // - 2. two is reject resolve is the if it's successful reject if it's we have an error.
      return new Promise((resolve, reject) => {
        //// Create a root reference
        const storage = getStorage();

        // Create a ID dynamic
        const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;

        //Create a reference to 'name.jpg'
        //So the storage reference gets this storage and this is dynamic for us.
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };

    //we create a concept and we call it image
    //We're going to wait and we create a promise And for all the images.
    //I actually looked through the images and put them inside the images.
    const imgUrls = await Promise.all(
      //This one kind of gives us the each image.
      //And for each image we're going to upload the image by just calling a function, which is we just call it a storeImage.
      //So we passed that "image" that we have.
      //So we get the each image and we just use this function to store it.
      //And if this one is successful. If not, we can catch the error.
      [...images].map((image) => storeImage(image))
    ).catch((error) => {
      setLoading(false);
      toast.error("Images not uploaded");
      return;
    });

    //console.log(imgUrls);

    //we just create a copy of our form data copy, for example, we just say formDataCopy.
    //Because we don't want to change the form data, the original one.

    const formDataCopy = {
      //So this is going to be equal to the form data, whatever inside the form data we have And here we're going to add the IMGURLs, geolocation, timestamp.
      //So we have the image to respond.
      ...formData,
      imgUrls,
      geolocation,
      timestamp: serverTimestamp(), //So we want to know when the person submitted the form and the list.
      //So now we can add another thing and we call it userReF and we know who created this listing so we can get this use a unique ID of the person.
      userRef: auth.currentUser.uid,
    };

    delete formDataCopy.images;
    //if the offer is true, we want to delete it Otherwise, we just want to keep the discounted price..
    !formDataCopy.offer && delete formDataCopy.discountedPrice;
    delete formDataCopy.latitude;
    delete formDataCopy.longitude;
    //Going to submit this formdata form, formdatacopy to the database.
    //So we create a document reference.
    const docRef = doc(db, "listings", params.listingId);

    await updateDoc(docRef, formDataCopy);
    setLoading(false);
    toast.success("Listing Edited");
    navigate(`/category/${formDataCopy.type}/${docRef.id}`);
  };

  //You're going to return the if the loading is true like this.
  if (loading) {
    return <Spinner />;
  }

  return (
    <main className="max-w-md px-2 mx-auto">
      <h1 className="text-3xl text-center mt-6 font-bold">Edit Listing</h1>
      <form onSubmit={onSubmit}>
        <p className="text-lg mt-6 font-semibold">Sell / Rent</p>
        <div className="flex">
          <button
            type="button"
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              type === "rent"
                ? "bg-white text-black"
                : "bg-slate-600 text-white"
            }`}
            id="type"
            value="sale"
            onClick={onChange}
          >
            Sell
          </button>
          <button
            type="button"
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              type === "sale"
                ? "bg-white text-black"
                : "bg-slate-600 text-white"
            }`}
            id="type"
            value="rent"
            onClick={onChange}
          >
            Rent
          </button>
        </div>
        {
          //Name Text
        }
        <p className="text-lg mt-6 font-semibold">Name</p>
        <input
          type="text"
          id="name"
          value={name}
          onChange={onChange}
          placeholder="Name"
          maxLength="32"
          minLength={10}
          required
          className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded  transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white  focus:border-slate mb-6"
        />
        {
          //Beds && Baths
        }
        <div className="flex justify-start space-x-6">
          <div>
            <p className="text-lg font-semibold">Beds</p>
            <input
              type="number"
              id="bedrooms"
              value={bedrooms}
              onChange={onChange}
              min="1"
              max="50"
              required
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-700 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
            />
          </div>
          <div>
            <p className="text-lg font-semibold">Baths</p>
            <input
              type="number"
              id="bathrooms"
              value={bathrooms}
              onChange={onChange}
              min="1"
              max="50"
              required
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-700 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
            />
          </div>
        </div>
        {
          //Parking Spot
        }
        <p className="text-lg mt-6 font-semibold">Parking Spot</p>
        <div className="flex">
          <button
            type="button"
            id="parking"
            value={true}
            onClick={onChange}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              //It means that if the parking is false.
              !parking ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            id="parking"
            value={false}
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              parking ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
            No
          </button>
        </div>
        {
          //Furnished
        }
        <p className="text-lg mt-6 font-semibold">Furnished</p>
        <div className="flex">
          <button
            type="button"
            id="furnished"
            value={true}
            onClick={onChange}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              //It means that if the parking is false.
              !furnished ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            id="furnished"
            value={false}
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              furnished ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
            No
          </button>
        </div>
        {
          //Address
        }
        <p className="text-lg mt-6 font-semibold">Address</p>
        <textarea
          type="text"
          id="address"
          value={address}
          onChange={onChange}
          placeholder="Address"
          required
          className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded  transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white  focus:border-slate mb-6"
        />

        {
          //If this if the geolocation enabled is true, we want to have this form.
          //So we're going to add some ampersand and we're going to have that one here inside this set of parentheses.
          !geolocalEnabled && (
            <div className="flex space-x-6 justify-start items-center mb-6">
              <div className="">
                <p className="text-lg font-semibold">Latitude</p>
                <input
                  type="number"
                  id="latitude"
                  value={latitude}
                  onChange={onChange}
                  required
                  min="-90"
                  max="90"
                  className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded duration-150 ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600 text-center"
                />
              </div>
              <div className="">
                <p className="text-lg font-semibold">Longitude</p>
                <input
                  type="number"
                  id="longitude"
                  value={longitude}
                  onChange={onChange}
                  required
                  min="-180"
                  max="180"
                  className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded duration-150 ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600 text-center"
                />
              </div>
            </div>
          )
        }

        {
          //Description
        }
        <p className="text-lg  font-semibold">Description</p>
        <textarea
          type="text"
          id="description"
          value={description}
          onChange={onChange}
          placeholder="Description"
          required
          className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded  transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white  focus:border-slate mb-6"
        />
        {
          //Offer
        }
        <p className="text-lg font-semibold">Offer</p>
        <div className="flex mb-6">
          <button
            type="button"
            id="offer"
            value={true}
            onClick={onChange}
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              //It means that if the parking is false.
              !offer ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            id="offer"
            value={false}
            onClick={onChange}
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              offer ? "bg-white text-black" : "bg-slate-600 text-white"
            }`}
          >
            No
          </button>
        </div>
        {
          //Regular Price
        }
        <div className="flex justify-start items-center mb-6">
          <div className="">
            <p className="text-lg font-semibold">Regular Price</p>
            <div className="flex w-full justify-center items-center space-x-6">
              <input
                type="number"
                id="regularPrice"
                value={regularPrice}
                onChange={onChange}
                min="50"
                max="400000000"
                required
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
              />
              {type === "rent" && (
                <div className="">
                  <p className="text-md w-full whitespace-nowrap">$ / Month</p>
                </div>
              )}
            </div>
          </div>
        </div>
        {
          //Discounted Price
        }
        {offer && (
          <div className="flex justify-start items-center mb-6">
            <div className="">
              <p className="text-lg font-semibold">Discounted Price</p>
              <div className="flex w-full justify-center items-center space-x-6">
                <input
                  type="number"
                  id="discountedPrice"
                  value={discountedPrice}
                  onChange={onChange}
                  min="50"
                  max="400000000"
                  required={offer}
                  className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
                />
                {type === "rent" && (
                  <div className="">
                    <p className="text-md w-full whitespace-nowrap">
                      $ / Month
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {
          //Images file
        }
        <div className="mb-6">
          <p className="text-lg font-semibold">Images</p>
          <p className="text-gray-600">
            The first image will be the cover (max 6)
          </p>
          <input
            type="file"
            id="images"
            onChange={onChange}
            accept=".jpg,.png,.jpeg"
            multiple
            required
            className="w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:border-slate-600"
          />
        </div>
        {
          //Button Submit
        }
        <button
          type="Submit"
          className="mb-6 w-full text-center px-7 py-3 bg-blue-600 text-white rounded font-medium text-sm uppercase shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg trasition duration-150 ease-in-out"
        >
          Edit Listing
        </button>
      </form>
    </main>
  );
}
