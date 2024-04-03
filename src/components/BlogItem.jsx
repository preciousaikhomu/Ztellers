import { Link } from "react-router-dom";
import Moment from "react-moment";
import { MdLocationOn } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";

const BlogItem = ({ blog, id, onEdit, onDelete }) => {
  return (
    <li className="relative bg-white flex flex-col justify-between items-center shadow-md hover:shadow-xl rounded-md overflow-hidden transition-shadow duration-150 m-[10px]">
      <Link className="contents" to={`/category/${blog.type}/${id}`}>
        <img
          className="h-[170px] w-full object-cover hover:scale-110 transition-scale duration-200 ease-in"
          loading="lazy"
          src={blog.imgUrls[0]}
          alt=""
        />
        <Moment
          className="absolute top-2 left-2 bg-[#3377cc] text-white uppercase text-xs font-semibold rounded-md px-2 py-1 shadow-lg"
          fromNow
        >
          {blog.timestamp?.toDate()}
        </Moment>
        <div className="w-full p-[10px]">
          <div className="flex items-center space-x-1">
            <MdLocationOn className="h-4 w-4 text-green-600" />
            <p className="font-semibold text-sm mb-[2px] text-gray-600 truncate">
              {blog.address}
            </p>
          </div>
          <p className="font-semibold m-0 text-xl truncate">{blog.name}</p>
          <p className="text-[#457b9d] mt-2 font-semibold">
            {
              //if the blog the type is equal to rent showing month
              blog.type === "blog"
            }
          </p>
          
        </div>
      </Link>
      {onDelete && (
        <FaTrash
          className="absolute bottom-2 right-2 h-[14px] cursor-pointer text-red-500"
          onClick={() => onDelete(blog.id)}
        />
      )}
      {onEdit && (
        <MdEdit
          className="absolute bottom-2 right-7 h-4 cursor-pointer"
          onClick={() => onEdit(blog.id)}
        />
      )}
    </li>
  );
};

export default BlogItem;
