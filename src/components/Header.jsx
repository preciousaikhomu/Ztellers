import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import logo from "../assets/svg/logo.svg"
import MobileMenu from "./MobileMenu";

export default function Header() {

    const [pageState, setPageState] = useState("Sign In");

    //step 1
    const location = useLocation();
    //console.log(location.pathname)

    //step 3
    const navigate = useNavigate();

    //step 2
    const pathMachRoute = (route) => {
        if (route === location.pathname) {
            return true;
        }
    }



    const auth = getAuth();
    //you want to use use effect to check the changes of auth.
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setPageState("Profile");
            } else {
                setPageState("Sign In");
            }
        });
    }, [auth]); //So we're going to call a function each time this Auth change.

    return (
        <div className="bg-[#202A54] border-b shadow-sm sticky top-0 z-40 py-3 ">
            <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
                <div className="w-[150px]">
                    <img src={logo} alt="logo" className="cursor-pointer w-[100%]" onClick={() => navigate("/")} />
                </div>
                <div>
                    <ul className="hidden md:flex space-x-10">
                        <li className={`cursor-pointer py-1 text-sm font-semibold text-white border-b-[3px] border-b-transparent ${pathMachRoute("/") && "text-black !border-b-[#F6D200]"}`} onClick={() => navigate("/")}>Home</li>
                        <li className={`cursor-pointer py-1 text-sm font-semibold text-white border-b-[3px] border-b-transparent ${pathMachRoute("/about") && "text-black !border-b-[#F6D200]"}`} onClick={() => navigate("/about")}>About Us</li>
                        <li className={`cursor-pointer py-1 text-sm font-semibold text-white border-b-[3px] border-b-transparent ${pathMachRoute("/properties") && "text-black !border-b-[#F6D200]"}`} onClick={() => navigate("/properties")}>Properties</li>
                        <li className={`cursor-pointer py-1 text-sm font-semibold text-white border-b-[3px] border-b-transparent ${pathMachRoute("/offers") && "text-black !border-b-[#F6D200]"}`} onClick={() => navigate("/offers")}>Offers</li>
                        {/* <li className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${(pathMachRoute("/sign-in") || pathMachRoute("/profile")) && "text-black !border-b-red-500"}`} onClick={()=>navigate("/profile")}>
                            {pageState}
                        </li> */}
                    </ul>
                </div>

                <div className="hidden md:flex">
                    <button className={`bg-[#F6D200] cursor-pointer py-2 px-5 text-sm font-semibold text-white rounded-lg border-b-[3px] border-b-transparent ${(pathMachRoute("/sign-in") || pathMachRoute("/profile")) && "text-black !border-b-red-500"}`} onClick={() => navigate("/profile")}>
                        {pageState}
                    </button>
                </div>

                <div>
                    <MobileMenu  />
                </div>
            </header>
        </div>
    )
}