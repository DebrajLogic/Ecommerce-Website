import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Logo } from "../components";
import { login } from "../store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";

function SignupForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signupError, setSignupError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      setSignupError(null);

      const session = await authService.createAccount(data);

      if (session) {
        await dispatch(login(data));

        navigate("/");
        console.log("Account created and logged in");
      } else {
        setSignupError("Error creating account");
        console.error("Account creation failed");
      }
    } catch (error) {
      setSignupError("Error creating account");
      console.error("Account creation failed", error);
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-6 border rounded-md shadow-md bg-white">
      <div className="mb-6 text-center">
        <Logo />
        <h2 className="text-2xl font-bold mt-2">Sign Up</h2>
      </div>
      {signupError && (
        <div className="mb-4 text-red-500 text-sm">{signupError}</div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-bold text-gray-700 mb-2"
          >
            Name
          </label>
          <input
            {...register("name", { required: "Name is required" })}
            type="text"
            id="name"
            className={`w-full border px-4 py-2 rounded-md focus:outline-none ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-bold text-gray-700 mb-2"
          >
            Email
          </label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
            })}
            type="email"
            id="email"
            className={`w-full border px-4 py-2 rounded-md focus:outline-none ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-bold text-gray-700 mb-2"
          >
            Password
          </label>
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            type="password"
            id="password"
            className={`w-full border px-4 py-2 rounded-md focus:outline-none ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-bold text-gray-700 mb-2"
          >
            Confirm Password
          </label>
          <input
            {...register("confirmPassword", {
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            type="password"
            id="confirmPassword"
            className={`w-full border px-4 py-2 rounded-md focus:outline-none ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none"
        >
          Create Account
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-gray-700">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupForm;
