import React, { useRef, useEffect, useState } from 'react';
import { MobileMenuIconLight } from './icons';
import { useLocation, useNavigate } from "react-router-dom";

const MobileMenu = () => {
  const modalRef = useRef();
  const [pageState, setPageState] = useState("Sign In");

    //step 1
    const location = useLocation();
  //step 3
  const navigate = useNavigate();

  //step 2
  const pathMachRoute = (route) => {
    if (route === location.pathname) {
      return true;
    }
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeHamburger(); // Close the hamburger menu if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const openHamburger = () => {
    const hamburger = document.getElementById("hamburger");
    if (hamburger) {
      hamburger.style.display = "flex";
    }
  };

  const closeHamburger = () => {
    const hamburger = document.getElementById("hamburger");
    if (hamburger) {
      hamburger.style.display = "none";
    }
  };

  return (
    <div className='flex md:hidden' onClick={openHamburger}>
      <MobileMenuIconLight />
      <div ref={modalRef} className="fixed inset-0 h-[100%] w-[50%] mt-[55px] flex items-center justify-center bg-[#202A54] z-custom-index" id="hamburger" style={{ display: 'none', right: 0, left: 'auto' }}>
        <div className="justify-center flex flex-col w-[100%] mx-[auto] h-[auto] items-center">
          <div className='gap-10 items-center flex flex-col'>
            <li className={`text-black dark:text-white text-base font-ClashRegular hover:text-link-hover hover:font-ClashSemiBold  dark:hover:text-link-hover ${pathMachRoute("/") && "text-black !border-b-[#F6D200]"}`} onClick={() => navigate("/")}>Home</li>
            <li className={`text-black dark:text-white text-base font-ClashRegular hover:text-link-hover hover:font-ClashSemiBold  dark:hover:text-link-hover ${pathMachRoute("/about") && "text-black !border-b-[#F6D200]"}`} onClick={() => navigate("/about")}>About Us</li>
            <li className={`text-black dark:text-white text-base font-ClashRegular hover:text-link-hover hover:font-ClashSemiBold dark:hover:text-link-hover ${pathMachRoute("/properties") && "text-black !border-b-[#F6D200]"}`} onClick={() => navigate("/properties")}>Properties</li>
            <li className={`text-black dark:text-white text-base font-ClashRegular hover:text-link-hover  hover:font-ClashSemiBold  dark:hover:text-link-hover ${pathMachRoute("/offers") && "text-black !border-b-[#F6D200]"}`} onClick={() => navigate("/offers")}>Offers</li>
          </div>
          {/* Profile Button */}
          <div className='items-center'>
            <button className={`bg-[#F6D200] cursor-pointer py-2 px-5 text-sm font-semibold text-white rounded-lg border-b-[3px] border-b-transparent ${(pathMachRoute("/sign-in") || pathMachRoute("/profile")) && "text-black !border-b-red-500"}`} onClick={() => navigate("/profile")}>
              {pageState}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;