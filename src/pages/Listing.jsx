import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import Spinner from "../components/Spinner";

//import { Swiper, SwiperSlide } from "swiper/react";
//import SwiperCore, {  EffectFade,  Autoplay,  Navigation,  Pagination,} from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  EffectFade,
  Autoplay,
} from "swiper";
import "swiper/swiper-bundle.css";

import {
  FaShare,
  FaMapMarkedAlt,
  FaBed,
  FaBath,
  FaParking,
  FaChair,
} from "react-icons/fa";

import { getAuth } from "firebase/auth";
import Contact from "../components/Contact";

export default function Listing() {
  const auth = getAuth();
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const [contactLandLord, setContactLandLord] = useState(false);

  useEffect(() => {
    //we need to have a function to get the data.
    //function should be asynchronous because we need to return a promise using await for the Firebase
    const fetchListing = async () => {
      //Now first thing first, we need to add the address, which address we want to fetch.
      //The address is depends on the collection name and also the data.
      //So we need to get this listing id using use params from react-router-dom.
      //So now we use the doc from the file store and dock is going to take three things.
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
        //console.log(listing);
      }
    };
    fetchListing();
    //console.log(listing);
  }, [params.listingId]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <main>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, EffectFade, Autoplay]}
        navigation
        pagination={{ type: "progressbar" }}
        slidesPerView={1}
        effect="fade"
        autoplay={{ delay: 3000 }}
      >
        {listing.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full overflow-hidden h-[300px]"
              style={{
                background: `url(${listing.imgUrls[index]}) center no-repeat`,
                backgroundSize: "cover",
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className="fixed top-[13%] right-[3%] z-10 bg-white cursor-pointer border-2 border-gray-400 rounded-full w-12 h-12 flex justify-center items-center"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareLinkCopied(true);
          setTimeout(() => {
            setShareLinkCopied(false);
          }, 2000);
        }}
      >
        <FaShare className="text-lg text-slate-500" />
      </div>
      {
        //if the shearling is true. show this here that we want to have a paragraph.
        shareLinkCopied && (
          <p className="fixed top-[23%] right-[5%] font-semibol border-2 border-gray-400 rounded-md bg-white z-10 p-2">
            Link Copied
          </p>
        )
      }

      <div className="m-4 flex flex-col md:flex-row max-w-6xl lg:mx-auto p-4 rounded-lg shadow-lg bg-white lg:space-x-5">
        <div className="w-full ">
          <p className="text-2xl font-bold mb-3 text-blue-900">
            {listing.name} - ${" "}
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing.type === "rent" ? " / month" : ""}
          </p>
          <p className="flex items-center mt-6 mb-3 font-semibold ">
            <FaMapMarkedAlt className="text-green-700 mr-1" /> {listing.address}
          </p>
          <div className="flex justify-start items-center space-x-4 w-[75%]">
            <p className="bg-red-800 w-full max-w-[200px] rounded-md p-1 text-white text-center font-semibold shadow-md ">
              {listing.type === "rent" ? "Rent" : "Sale"}
            </p>
            {listing.offer && (
              <p className="w-full max-w-[200px] bg-green-800 rounded-md p-1 text-white text-center font-semibold shadow-md">
                ${+listing.regularPrice - +listing.discountedPrice} discount
              </p>
            )}
          </div>
          <p className="mt-3 mb-3">
            <span className="font-semibold">Description - </span>
            {listing.description}
          </p>
          <ul className="flex items-center space-x-2 sm:space-x-10 text-sm font-semibold mb-6">
            <li className="flex items-center whitespace-nowrap">
              <FaBed className="text-lg mr-1" />
              {+listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaBath className="text-lg mr-1" />
              {+listing.bathrooms > 1 ? `${listing.bathrooms} baths` : "1 Bath"}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaParking className="text-lg mr-1" />
              {+listing.parking ? "Parking Spot" : "No Parking"}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaChair className="text-lg mr-1" />
              {+listing.furnished ? "Furnished" : "Not Furnished"}
            </li>
          </ul>
          {
            //So we have the listing and we know who is the owner of this, which is the userref.
            //We just want to say if it's this one is not equal to the person who's authorized.
            listing.userRef !== auth.currentUser?.uid && !contactLandLord && (
              //If it's not equal to this one, you want to see the button.
              //But in case that the page loaded faster than that, we want to protect this one so we don't get an error.
              //As you can see, the page wasn't loaded first, but instead of adding loading, we can just protect this because it's not that important, that button. To be waited for the loading. We just can protect it by adding a question mark.
              <div className="mt-6">
                <button
                  onClick={() => setContactLandLord(true)}
                  className="px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded  shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg w-full text-center transition duration-150 ease-in-out"
                >
                  Contact Landlord
                </button>
              </div>
            )
          }
        </div>
        {contactLandLord && (
            <Contact userRef={listing.userRef} listing={listing} />
          )}
       
        <div className="bg-blue-300 w-full h-[200px] lg-[400px] z-10 overflow-x-hidden"></div>
      </div>
    </main>
  );
}
