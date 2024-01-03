/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
const Button = ({ onClick, children, className }) => {
  return (
    <button
      className={`${className} py-2 px-4 rounded-lg border border-gray-600`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
