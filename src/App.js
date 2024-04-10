import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword";
import Offers from "./pages/Offers";
import Header from "./components/Header";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateListing from "./pages/CreateListing";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";
import EditListing from "./pages/EditListing";
import Blogs from "./pages/Blogs";
import Listing from "./pages/Listing";
import Category from "./pages/Category";
import Properties from "./pages/Properties";
import About from "./pages/About";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/about" element={<About />} />
          <Route path="/category/:categoryName" element={<Category />} />

          <Route path="/category/:categoryName/:listingId" element={<Listing />} />

          <Route path="/category/:categoryName/:blogId" element={<Blogs />} />

          <Route path="create-listing" element={<PrivateRoute/>}>
            <Route path="/create-listing" element={<CreateListing />} />
          </Route>

          <Route path="create-blog" element={<PrivateRoute/>}>
            <Route path="/create-blog" element={<CreateBlog />} />
          </Route>

          <Route path="edit-listing" element={<PrivateRoute/>}>
            <Route path="/edit-listing/:listingId" element={<EditListing />} />
          </Route>

          <Route path="edit-blog" element={<PrivateRoute/>}>
            <Route path="/edit-blog/:blogId" element={<EditBlog />} />
          </Route>
          

        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {/* Same as */}
      <ToastContainer />
    </>
  );
}

export default App;
