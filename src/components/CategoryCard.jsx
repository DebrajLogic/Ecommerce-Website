import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const CategoryCard = ({ id, image, title }) => {
  console.log("Category Card: id, title = ", id, title);
  return (
    <Link to={`/${id}`}>
      <div className="relative shadow-md rounded-md hover:bg-gray-100 mx-2">
        {image && (
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover rounded-t-md border-b border-l border-r border-gray-300"
          />
        )}
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
