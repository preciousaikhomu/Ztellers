import { useState } from "react";
import { Link } from "react-router-dom";
export default function Form2() {
  const [email, setEmail] = useState("");
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
    return error;
  };
  return (
    <div className="max-w-[500px] mx-auto mt-[20px] border-black border-2 px-5 pt-[40px] pb-[150px] rounded-[20px]">
      <div className="form_container">
        <h2 className="text-[30px] text-center">Step 2</h2>
        <h2 className="text-center">Account Details</h2>
        <div className="h-1 w-[300px] bg-[#3bb75e] max-w-[300px] mx-auto mt-5">
          <div className="bg-white border-2 border-[#3bb75e] rounded-full relative bottom-3 max-w-[100px] mx-auto h-[30px] w-[30px]"></div>
        </div>
        <form onSubmit={handleSubmit} className="mx-[30px]">
          <div className="form-group">
            <label htmlFor="name">Bank Name</label> <br />
            <input
              type="text"
              className="w-[100%] rounded-t-[25px] rounded-b-[25px]"
            />
          </div>
          <div className="form-group">
            <label htmlFor="school">Bank Account Name</label>
            <br />
            <input
              type="text"
              className="w-[100%] rounded-t-[25px] rounded-b-[25px]"
            />
          </div>
          <div className="form-group">
            <label htmlFor="mat no">Bank Accoun Number</label>
            <br />
            <input
              type="text"
              className="w-[100%] rounded-t-[25px] rounded-b-[25px]"
            />
          </div>
          <div className="flex max-w-[300px] justify-between mt-5">
            <button className="px-5 py-2 bg-[#3bb75e] rounded-lg text-white">
                <Link to="/">Back</Link>
            </button>
            <button className="px-5 py-2 bg-[#3bb75e] rounded-lg text-white" type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
