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
} from "react-icons/fa";

import { getAuth } from "firebase/auth";
// import Contact from "../components/Contact";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export default function Blog() {
  const auth = getAuth();
  const params = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const [contactLandLord, setContactLandLord] = useState(false);

  useEffect(() => {
    //we need to have a function to get the data.
    //function should be asynchronous because we need to return a promise using await for the Firebase
    const fetchBlog = async () => {
      //Now first thing first, we need to add the address, which address we want to fetch.
      //The address is depends on the collection name and also the data.
      //So we need to get this blog id using use params from react-router-dom.
      //So now we use the doc from the file store and dock is going to take three things.
      const docRef = doc(db, "blogs", params.blogId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setBlog(docSnap.data());
        setLoading(false);
        //console.log(blog);
      }
    };
    fetchBlog();
    //console.log(blog);
  }, [params.blogId]);

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
        {blog.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full overflow-hidden h-[300px]"
              style={{
                background: `url(${blog.imgUrls[index]}) center no-repeat`,
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
            {blog.title} - ${" "}
           
            {blog.type === "blog"}
          </p>
          <p className="mt-3 mb-3">
            <span className="font-semibold">Description - </span>
            {blog.description}
          </p>
          <p className="mt-3 mb-3">
            <span className="font-semibold">Paragraph - </span>
            {blog.paragraph}
          </p>
         
        </div>
      
      </div>
    </main>
  );
}
