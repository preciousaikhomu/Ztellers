import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Form() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validate();
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      alert("Done");
    }
  };

  const validate = () => {
    const error = {};

    if (!email) {
      error.email = "Email is Required";
    } else if (!/\s+@\s+\.\s+/.test(email)) {
      error.email = "Email not Matched";
    } else {
      error.email = "";
    }

    if (!password) {
      error.password = "Password is Required";
    } else if (password.length < 8) {
      error.password = "Password not Matched";
    } else {
      error.Password = "";
    }

    return error;
  };

  return (
    <div className="max-w-[768px] mx-auto mt-[20px]">
      <div className="form_container">
        <h2 className="text-center">Personal Bio Data</h2>
        <div className="h-1 w-[300px] bg-black max-w-[300px] mx-auto mt-5">
          <div className="bg-white border-2 border-black rounded-full relative bottom-3 max-w-[100px] mx-auto h-[30px] w-[30px]"></div>
        </div>
        <form onSubmit={handleSubmit} className="mx-[30px]">
          <div className="form-group">
            <label htmlFor="name">Name</label> <br />
            <input
              type="text"
              className="w-[100%] rounded-t-[25px] rounded-b-[25px]"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-[100%] rounded-t-[25px] rounded-b-[25px]"
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="school">School</label>
            <br />
            <input
              type="text"
              className="w-[100%] rounded-t-[25px] rounded-b-[25px]"
            />
          </div>
          <div className="form-group">
            <label htmlFor="mat no">Mat No</label>
            <br />
            <input
              type="text"
              className="w-[100%] rounded-t-[25px] rounded-b-[25px]"
            />
          </div>
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-[100%] rounded-t-[25px] rounded-b-[25px]"
          />
          {errors.password && <div className="error">{errors.password}</div>}
          <div className="form-group"></div>
          <div className="form-group">
            <label htmlFor="confirm password">Confirm Password</label>
            <br />
            <input
              type="password"
              className="w-[100%] rounded-t-[25px] rounded-b-[25px]"
            />
          </div>
          <h2 className="text-center mt-5">Official Category</h2>
          <div className="h-1 w-[300px] bg-black max-w-[100%] mx-auto mt-5">
            <div className="bg-white border-2 border-black rounded-full relative bottom-3 max-w-[100px] mx-auto h-[30px] w-[30px]"></div>
          </div>
          <div className="form-group">
            <label htmlFor="name of school">Name of School</label>
            <br />
            <input
              type="text"
              className="w-[100%] rounded-t-[25px] rounded-b-[25px]"
            />
          </div>
          <div className="form-group">
            <label htmlFor="faculty">Faculty</label>
            <input
              type="text"
              className="w-[100%] rounded-t-[25px] rounded-b-[25px]"
            />
          </div>
          <div className="form-group">
            <label htmlFor="department">Department</label>
            <br />
            <input
              type="text"
              className="w-[100%] rounded-t-[25px] rounded-b-[25px]"
            />
          </div>
          <div className="form-group">
            <label htmlFor="leadership position">Leadership Position</label>
            <br />
            <select className="w-[100%] rounded-t-[25px] rounded-b-[25px]">
              <option value=""></option>
              <option value="president">President</option>
              <option value="vice-president">Vice President</option>
              <option value="secretary">Secretary</option>
              <option value="treasurer">Treasurer</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="name of association">Name of Association</label>
            <br />
            <input
              type="text"
              className="w-[100%] rounded-t-[25px] rounded-b-[25px]"
            />
          </div>
          <div className="form-group">
            <label htmlFor="set session">Set Session</label>
            <br />
            <input
              type="text"
              className="w-[100%] rounded-t-[25px] rounded-b-[25px]"
            />
          </div>
          <div className="flex max-w-[300px] justify-between mt-5">
            <button className="px-5 py-2 bg-gray-300 rounded-lg">Back</button>
            <button className="px-5 py-2 bg-gray-300 rounded-lg">
                <Link to="/account">Next</Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
