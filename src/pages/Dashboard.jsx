import Logo from "../assets/Zteller Logo.png";
export default function Dashboard() {
  return (
    <>
      <div className="max-w-[1200px] sm-custom:max-w-[400px] sm-custom:px-5 mx-auto mt-5">
        <div className="logo w-[100px]">
          <img src={Logo} alt="Logo" className="w-[100%]" />
        </div>
        <div className="flex justify-between items-center mt-5">
          <h2>Account Details</h2>
          <div className="flex">
            <svg
              className="mr-2 cursor-pointer text-[20px]"
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="none"
                stroke="#000"
                stroke-width="2"
                d="M4,19 L4,9 C4,4.582 7.582,1 12,1 C16.418,1 20,4.582 20,9 L20,19 M1,19 L23,19 M15,19 L15,20 C15,21.657 13.657,23 12,23 C10.343,23 9,21.657 9,20 L9,19"
              ></path>
            </svg>
            <svg
              className="cursor-pointer text-[20px]"
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M32 96v64h448V96H32zm0 128v64h448v-64H32zm0 128v64h448v-64H32z"></path>
            </svg>
          </div>
        </div>
        <div className="mt-5 flex sm-custom:flex-wrap items-center">
          <div className="bg-gray-300 border-black rounded-full bottom-3  h-[150px] w-[150px] mr-[20px]"></div>
          <div>
            <p className="text-[20px]">
              Nigerian Entrepreneurship Student Association <br />
              (NENTSA)
            </p>
            <p className="text-[20px]">
              Faculty of Management Sciences <br />{" "}
            </p>
            <p>Department of Entrepreneurship</p>
            <button className="bg-[#3bb75e] text-white px-3 py-2 rounded-lg mt-5">
              View Dashboard
            </button>
          </div>
        </div>
        <div className="bg-[#3bb75e] h-[2px] w-ful my-[30px]"></div>
        <div className="md:flex sm-custom:flex-wrap justify-between">
          <div className="w-full">
            <h2 className="text-[30px]">Active Users</h2>
            <div className="w-[400px] sm-custom:w-auto sm-custom:mx-2 mb-5">
              <div className="flex justify-between items-center">
                <svg
                  className="text-[#2DD88E]"
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  version="1.1"
                  viewBox="0 0 16 16"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8 3c-3.489 0-6.514 2.032-8 5 1.486 2.968 4.511 5 8 5s6.514-2.032 8-5c-1.486-2.968-4.511-5-8-5zM11.945 5.652c0.94 0.6 1.737 1.403 2.335 2.348-0.598 0.946-1.395 1.749-2.335 2.348-1.181 0.753-2.545 1.152-3.944 1.152s-2.763-0.398-3.945-1.152c-0.94-0.6-1.737-1.403-2.335-2.348 0.598-0.946 1.395-1.749 2.335-2.348 0.061-0.039 0.123-0.077 0.185-0.114-0.156 0.427-0.241 0.888-0.241 1.369 0 2.209 1.791 4 4 4s4-1.791 4-4c0-0.481-0.085-0.942-0.241-1.369 0.062 0.037 0.124 0.075 0.185 0.114v0zM8 6.5c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5 0.672-1.5 1.5-1.5 1.5 0.672 1.5 1.5z"></path>
                </svg>
                <div className="w-[30px] h-[30px] bg-gray-300 rounded-full"></div>
                <div className="w-[200px] sm-custom:max-w-[170px]">
                  <h2>Emmanuel Udong Udoka</h2>
                  <p>President</p>
                </div>
                <button className="bg-[#3bb75e] text-white py-2 px-3 rounded-lg sm-custom:px-2 sm-custom:text-[12px]">View Details</button>
              </div>
            </div>
            <div className="w-[400px] sm-custom:w-auto sm-custom:mx-2 mb-5">
              <div className="flex justify-between items-center">
                <svg
                  className="text-[#2DD88E]"
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  version="1.1"
                  viewBox="0 0 16 16"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8 3c-3.489 0-6.514 2.032-8 5 1.486 2.968 4.511 5 8 5s6.514-2.032 8-5c-1.486-2.968-4.511-5-8-5zM11.945 5.652c0.94 0.6 1.737 1.403 2.335 2.348-0.598 0.946-1.395 1.749-2.335 2.348-1.181 0.753-2.545 1.152-3.944 1.152s-2.763-0.398-3.945-1.152c-0.94-0.6-1.737-1.403-2.335-2.348 0.598-0.946 1.395-1.749 2.335-2.348 0.061-0.039 0.123-0.077 0.185-0.114-0.156 0.427-0.241 0.888-0.241 1.369 0 2.209 1.791 4 4 4s4-1.791 4-4c0-0.481-0.085-0.942-0.241-1.369 0.062 0.037 0.124 0.075 0.185 0.114v0zM8 6.5c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5 0.672-1.5 1.5-1.5 1.5 0.672 1.5 1.5z"></path>
                </svg>
                <div className="w-[30px] h-[30px] bg-gray-300 rounded-full"></div>
                <div className="w-[200px] sm-custom:max-w-[170px]">
                  <h2>Olamide Eghosa Paul</h2>
                  <p>Financial Secretary</p>
                </div>
                <button className="bg-[#3bb75e] text-white py-2 px-3 rounded-lg sm-custom:px-2 sm-custom:text-[12px]">View Details</button>
              </div>
            </div>
            <div className="w-[400px] sm-custom:w-auto sm-custom:mx-2 mb-5">
              <div className="flex justify-between items-center">
                <svg
                  className="text-[#2DD88E]"
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  version="1.1"
                  viewBox="0 0 16 16"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8 3c-3.489 0-6.514 2.032-8 5 1.486 2.968 4.511 5 8 5s6.514-2.032 8-5c-1.486-2.968-4.511-5-8-5zM11.945 5.652c0.94 0.6 1.737 1.403 2.335 2.348-0.598 0.946-1.395 1.749-2.335 2.348-1.181 0.753-2.545 1.152-3.944 1.152s-2.763-0.398-3.945-1.152c-0.94-0.6-1.737-1.403-2.335-2.348 0.598-0.946 1.395-1.749 2.335-2.348 0.061-0.039 0.123-0.077 0.185-0.114-0.156 0.427-0.241 0.888-0.241 1.369 0 2.209 1.791 4 4 4s4-1.791 4-4c0-0.481-0.085-0.942-0.241-1.369 0.062 0.037 0.124 0.075 0.185 0.114v0zM8 6.5c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5 0.672-1.5 1.5-1.5 1.5 0.672 1.5 1.5z"></path>
                </svg>
                <div className="w-[30px] h-[30px] bg-gray-300 rounded-full"></div>
                <div className="w-[200px] sm-custom:max-w-[170px]">
                  <h2>Cherry Adaku Arinze</h2>
                  <p>Eleco Chairman</p>
                </div>
                <button className="bg-[#3bb75e] text-white py-2 px-3 rounded-lg sm-custom:px-2 sm-custom:text-[12px]">View Details</button>
              </div>
            </div>
            <div className="w-[400px] sm-custom:w-auto sm-custom:mx-2 mb-5">
              <div className="flex justify-between items-center">
                <svg
                  className=""
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  version="1.1"
                  viewBox="0 0 16 16"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8 3c-3.489 0-6.514 2.032-8 5 1.486 2.968 4.511 5 8 5s6.514-2.032 8-5c-1.486-2.968-4.511-5-8-5zM11.945 5.652c0.94 0.6 1.737 1.403 2.335 2.348-0.598 0.946-1.395 1.749-2.335 2.348-1.181 0.753-2.545 1.152-3.944 1.152s-2.763-0.398-3.945-1.152c-0.94-0.6-1.737-1.403-2.335-2.348 0.598-0.946 1.395-1.749 2.335-2.348 0.061-0.039 0.123-0.077 0.185-0.114-0.156 0.427-0.241 0.888-0.241 1.369 0 2.209 1.791 4 4 4s4-1.791 4-4c0-0.481-0.085-0.942-0.241-1.369 0.062 0.037 0.124 0.075 0.185 0.114v0zM8 6.5c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5 0.672-1.5 1.5-1.5 1.5 0.672 1.5 1.5z"></path>
                </svg>
                <div className="w-[30px] h-[30px] bg-gray-300 rounded-full"></div>
                <div className="w-[200px] sm-custom:max-w-[170px]">
                  <h2>(Null) Invite new candidate?</h2>
                  <p>Eleco Chairman</p>
                </div>
                <button className="bg-[#3bb75e] text-white py-2 px-3 rounded-lg sm-custom:px-2 sm-custom:text-[12px]">View Details</button>
              </div>
            </div>
          </div>
          <div className="w-full">
            <h2 className="text-[30px]">Top Previous Excos</h2>
            <div className="w-[400px] sm-custom:w-auto sm-custom:mx-2 mb-5">
              <div className="flex justify-between items-center">
                <div className="w-[100px] h-[100px] sm-custom:w-[50px] sm-custom:h-[50px] bg-gray-300 rounded-full"></div>
                <div className="w-[250px]">
                  <h2>(Null) Invite new candidate?</h2>
                  <div className="flex justify-between items-center"><p>Eleco Chairman</p>
                    <button className="bg-[#3bb75e] text-white py-2 px-3 rounded-lg sm-custom:px-2 sm-custom:text-[12px]">View Details</button>
                    </div>
                </div>

              </div>
            </div>
            <div className="w-[400px] sm-custom:w-auto sm-custom:mx-2 mb-5">
              <div className="flex justify-between items-center">
                <div className="w-[100px] h-[100px] sm-custom:w-[50px] sm-custom:h-[50px] bg-gray-300 rounded-full"></div>
                <div className="w-[250px]">
                  <h2>(Null) Invite new candidate?</h2>
                  <div className="flex justify-between items-center"><p>Eleco Chairman</p>
                    <button className="bg-[#3bb75e] text-white py-2 px-3 rounded-lg sm-custom:px-2 sm-custom:text-[12px]">View Details</button>
                    </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#3bb75e] h-[2px] w-ful my-[30px]"></div>
        <div>
          <div className="flex justify-center gap-[20px] max-w-[850px] flex-wrap mb-5">
            <div className="bg-gray-300 h-[250px] w-[250px] rounded-lg"></div>
            <div className="bg-gray-300 h-[250px] w-[250px] rounded-lg"></div>
            <div className="bg-gray-300 h-[250px] w-[250px] rounded-lg"></div>
            <div className="bg-gray-300 h-[250px] w-[250px] rounded-lg"></div>
            <div className="bg-gray-300 h-[250px] w-[250px] rounded-lg"></div>
            <div className="bg-gray-300 h-[250px] w-[250px] rounded-lg"></div>
          </div>
        </div>
      </div>
    </>
  );
}
