import { getAuth, updateProfile } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { db } from "../firebase";

import { FcHome } from "react-icons/fc";

import { Link } from "react-router-dom";
import ListingItem from "../components/ListingItem";

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [changeDetail, setChangeDetail] = useState(false);

  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    //create a synchronous function here
    async function fetchUserListings() {
      //we need to create a reference so we just say the listing.
      //Reference is like a address. So the address for this listing is we can use collection, which is coming from Firebase File Store.
      const listingRef = collection(db, "listings");

      //We can just make a query. Because we want to just get the listings that had that is that the person is created, not the other
      //So we call the query queue and we can use the query method from fire store.
      const q = query(
        listingRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );

      //So after the query. We can use getDocs to get the documents.
      //So we just create another constant and we call it querySnap.
      //To get the snapshot and we use 'await' to use the 'getDocs'.
      //We just can pass that query that we have created.
      const querySnap = await getDocs(q);

      //Now we can create a variable called listings.
      //From beginning and we can loop through this query, snap and add that listing data to this listing variable, and we can use this variable to show in our website.
      let listings = [];

      //So we just loop through the querysnap using foreach method.
      //And for each method is going to give us each document.
      querySnap.forEach((doc) => {
        //That listings and we are going to push each the document inside this array.
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      //So first we want to avoid getting there, showing it inside our profile. But when the data is fetched completely, we want to show it.
      setLoading(false);
    }
    //So when the page is loaded, we're going to call this function as soon as possible.
    fetchUserListings();
  }, [auth.currentUser.uid]); //We need to add off that currentUser as a dependency here so we can just copy this one and put it here

  const onDelete = async (listingID) => {
    if(window.confirm("Are you sure you want to delete?")){

      await deleteDoc(doc(db, "listings", listingID))

      //we need to update listings again.
      //So we create a constant call it updated listings. 
      //And we can just use the filters. 
      //So we have the listings variable and we're going to filter it. 
      //The filter is going to be to give us the listing, each listing and We want to just Remove the one that has the listing that ID, Not if you want to keep everything except the one with this listing, I'd..
      const updatedListings = listings.filter(
        (listing)=> listing.id !== listingID
      );
      setListings(updatedListings)
      toast.success("Successfully deleted the listing!")
    }
  }

  const onEdit = (listingID) => {
    navigate(`/edit-listing/${listingID}`)
  }

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
          <button
            type="submit"
            className="w-full bg-blue-600 text-white uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-700 transition ease-in-out duration-150 hover:shadow-lg active:bg-blue-800"
          >
            <Link
              to="/create-listing"
              className="flex justify-center items-center"
            >
              <FcHome className="mr-2 text-3xl bg-red-200 rounded-full p-1 border-2" />
              Sell or rent your home
            </Link>
          </button>
        </div>
      </section>
      <div className="max-w-6xl px-3 mt-6 mx-auto">
        {!loading && listings.length > 0 && (
          <>
            <h2 className="text-2xl text-center font-semibold mb-6">My Listing</h2>
            <ul className="sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl-grid-cols-5 ">
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                  onDelete={()=>onDelete(listing.id)}
                  onEdit={()=>onEdit(listing.id)}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
