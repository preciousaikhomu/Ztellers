import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { db } from "../firebase";

import { FcHome } from "react-icons/fc";

import { Link } from "react-router-dom";

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [changeDetail, setChangeDetail] = useState(false);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const onLogout = () => {
    //First things first we need to sign out, which is very simple.
    //We have this off the shelf, has a method inside it, and it's sign out.
    auth.signOut(); //So we need to call this and this is going to sign out.
    //And after that, we want to navigate the person to the home page.
    navigate("/");
  };

  const { name, email } = formData;

  const onChange = (e) => {
    //And firstly, we need to just set the form data and we get the previous estate.
    setFormData((prevState) => ({
      //Firstly if you want to keep the previous estate. You need to spread. The previous estate and we just say if e.target.id
      //Does value whatever the value change, it's going to be applied to the search form data which is here.
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        //update display name in  firebase auth
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        //update name in the firestore
        //First, we need to create the reference.
        //So the userRef or the docRef they can call it is equal to we need to use the doc.
        const docRef = doc(db, "users", auth.currentUser.uid);
        //Now we can use this reference to update the document.
        //We're going to use an update function from Firestone, which is going to return a promise.
        await updateDoc(docRef, {
          name,
        });
      }
      toast.success("Profile details updated");
    } catch (error) {
      toast.error("Could not update the profile details");
    }
  };

  return (
    <div>
      <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
        <h1 className="text-3xl text-center mt-6 font-bold">My Profile</h1>
        <div className="w-full md:w-[50%] mt-6 px-3">
          <form>
            {/* Name input*/}
            <input
              type="text"
              id="name"
              value={name}
              disabled={!changeDetail}
              onChange={onChange}
              className={`mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out ${
                changeDetail && "bg-red-200 focus:bg-red-200"
              }`}
            />

            {/* Email Input */}
            <input
              type="email"
              id="name"
              value={email}
              disabled
              className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out"
            />

            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
              <p className="flex items-center">
                Do you want to change your name?{" "}
                <span
                  onClick={
                    //We want to make this one opposite. So we need to set the change details.
                    //First we get the previous state.
                    //And we set the previous state to the opposite of the previous state practice.
                    () => {
                      changeDetail && onSubmit();
                      setChangeDetail((prevState) => !prevState);
                    }
                  }
                  className="text-red-600 hover:text-red-700 transition ease-in-out duration-200 ml-1 cursor-pointer"
                >
                  {changeDetail ? "Apply change" : "Edit"}
                </span>
              </p>
              <p
                onClick={onLogout}
                className="text-blue-600 hover:text-blue-800 transition ease-in-out duration-200 cursor-pointer"
              >
                Sign out
              </p>
            </div>
          </form>
          <button type="submit" className="w-full bg-blue-600 text-white uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-700 transition ease-in-out duration-150 hover:shadow-lg active:bg-blue-800">
            <Link to="/create-listing" className="flex justify-center items-center">
              <FcHome className="mr-2 text-3xl bg-red-200 rounded-full p-1 border-2"/>
              Sell or rent your home
            </Link>
          </button>
        </div>
      </section>
    </div>
  );
}
