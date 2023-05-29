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

export default function Listing() {
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

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
        console.log(listing);
      }
    };
    fetchListing();
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
    </main>
  );
}
