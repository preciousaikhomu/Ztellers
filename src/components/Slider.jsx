import React, { useEffect, useState } from "react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import Spinner from "../components/Spinner";

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";
import "swiper/swiper-bundle.css";
import { useNavigate } from "react-router-dom";

export default function Slider() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true); //This would be true because first we come to the website, we don't have any data.
  SwiperCore.use([Autoplay, Navigation, Pagination]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      const listingsRef = collection(db, "listings");
      const q = query(listingsRef, orderBy("timestamp", "desc"), limit(5));

      //This is going to wait and we can use get docs method from file store to get the document which takes this query 'q' that we have created above..
      const querySnap = await getDocs(q);

      //Now we get the information.
      //We create a variable called listings and we put it just as an empty bracket
      let listings = [];

      //and then we're going to fill it up using the foreach method. So this query is snap is a couple of is the five things. So we're going to use foreach to get each of them. So each of them gives us a doc.
      querySnap.forEach((doc) => {
        //We can just return listings.
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);

      //console.log(listings);

      //we can just set the loading to false.
      setLoading(false);
    };
    fetchListings();
  }, []);
  if (loading) {
    return <Spinner />;
  }
  if (listings.length === 0) {
    return <></>;
  }
  return (
    listings && (
      <>
        <Swiper
          swiperslide={1}
          navigation
          pagination={{ type: "progressbar" }}
          effect="fade"
          modules={[EffectFade]}
          autoplay={{ delay: 3000 }}
        >
          {listings.map(({ data, id }) => (
            <SwiperSlide
              key={id}
              onClick={() => navigate(`/category/${data.type}/${id}`)}
            >
              <div
                style={{
                  background: `url(${data.imgUrls[0]}) center, no-repeat`,
                  backgroundSize: "cover",
                }}
                className="relative w-full h-[500px] overflow-hidden cursor-pointer"
              ></div>
              <p className="text-[#f1faee] absolute left-1 top-3 font-medium max-w-[90%] bg-[#457b9d] shadow-lg opacity-90 p-2 rounded-br-3xl ">
                {data.name}
              </p>
              <p className="text-[#f1faee] absolute left-1 bottom-1 font-medium max-w-[90%] bg-[#e63946] shadow-lg opacity-90 p-2 rounded-tr-3xl ">
                {data.discountedPrice ??
                  data.regularPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                {data.type === "rent" && " / month"}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  );
}
