import { useEffect, useState } from "react";
import Slider from "../components/Slider";
import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

import ListingItem from "../components/ListingItem";

export default function Home() {
  //Offers
  const [offerListings, setOfferListings] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        //get reference
        //Listings ref and we can use the collection which is coming from fa fa store which takes the DB, which is coming from the fire.
        const listingsRef = collection(db, "listings");
        //Now we can create the query to query is the limit or the condition of that request.
        const q = query(
          listingsRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        //execute the query
        const querySnap = await getDocs(q);
        const listings = [];
        //And after that, you're going to use for each to loop through the snap that we are getting from here.
        querySnap.forEach((doc) => {
          //This one, we're going to push each doc inside this, but we're going to push it as a object because we want to get the ID first, which is equal to doc that ID.
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setOfferListings(listings);
        //console.log(listings)
      } catch (error) {
        console.log(error);
      }
    };
    fetchListings();
  }, []);

   //Places for Rent
   const [rentListings, setRentListings] = useState(null);

   useEffect(() => {
     const fetchListings = async () => {
       try {
         //get reference
         //Listings ref and we can use the collection which is coming from fa fa store which takes the DB, which is coming from the fire.
         const listingsRef = collection(db, "listings");
         //Now we can create the query to query is the limit or the condition of that request.
         const q = query(
           listingsRef,
           where("type", "==", "rent"),
           orderBy("timestamp", "desc"),
           limit(4)
         );
         //execute the query
         const querySnap = await getDocs(q);
         const listings = [];
         //And after that, you're going to use for each to loop through the snap that we are getting from here.
         querySnap.forEach((doc) => {
           //This one, we're going to push each doc inside this, but we're going to push it as a object because we want to get the ID first, which is equal to doc that ID.
           return listings.push({
             id: doc.id,
             data: doc.data(),
           });
         });
         setRentListings(listings);
         //console.log(listings)
       } catch (error) {
         console.log(error);
       }
     };
     fetchListings();
   }, []);

   //Places for Sales
   const [saleListings, setSaleListings] = useState(null);

   useEffect(() => {
     const fetchListings = async () => {
       try {
         //get reference
         //Listings ref and we can use the collection which is coming from fa fa store which takes the DB, which is coming from the fire.
         const listingsRef = collection(db, "listings");
         //Now we can create the query to query is the limit or the condition of that request.
         const q = query(
           listingsRef,
           where("type", "==", "sale"),
           orderBy("timestamp", "desc"),
           limit(4)
         );
         //execute the query
         const querySnap = await getDocs(q);
         const listings = [];
         //And after that, you're going to use for each to loop through the snap that we are getting from here.
         querySnap.forEach((doc) => {
           //This one, we're going to push each doc inside this, but we're going to push it as a object because we want to get the ID first, which is equal to doc that ID.
           return listings.push({
             id: doc.id,
             data: doc.data(),
           });
         });
         setSaleListings(listings);
         //console.log(listings)
       } catch (error) {
         console.log(error);
       }
     };
     fetchListings();
   }, []);


  return (
    <div>
      <Slider />
      <div className="max-w-6xl mx-auto pt-4 space-y-6">
        {
          //We just say if the offer listing exists.
          //We want to see if the offer listings length is greater than zero.
          offerListings && offerListings.length > 0 && (
            <div className="m-2 mb-6">
              <h2 className="px-3 text-2xl mt-6 font-semibold">
                Recent offers
              </h2>
              <Link to="/offers">
                <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                  Show more offers
                </p>
              </Link>
              <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {offerListings.map((listing) => (
                  <ListingItem
                    key={listing.id}
                    listing={listing.data}
                    id={listing.id}
                  />
                ))}
              </ul>
            </div>
          )}
          {
          //We just say if the offer listing exists.
          //We want to see if the offer listings length is greater than zero.
          rentListings && rentListings.length > 0 && (
            <div className="m-2 mb-6">
              <h2 className="px-3 text-2xl mt-6 font-semibold">
                Places for Rent
              </h2>
              <Link to="/category/rent">
                <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                  Show more places for rent
                </p>
              </Link>
              <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {rentListings.map((listing) => (
                  <ListingItem
                    key={listing.id}
                    listing={listing.data}
                    id={listing.id}
                  />
                ))}
              </ul>
            </div>
          )}
          {
          //We just say if the offer listing exists.
          //We want to see if the offer listings length is greater than zero.
          saleListings && saleListings.length > 0 && (
            <div className="m-2 mb-6">
              <h2 className="px-3 text-2xl mt-6 font-semibold">
                Places for Sale
              </h2>
              <Link to="/category/sale">
                <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                  Show more places for sale
                </p>
              </Link>
              <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {saleListings.map((listing) => (
                  <ListingItem
                    key={listing.id}
                    listing={listing.data}
                    id={listing.id}
                  />
                ))}
              </ul>
            </div>
          )}
      </div>
    </div>
  );
}
