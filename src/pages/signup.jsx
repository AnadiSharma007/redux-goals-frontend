import React, { useEffect } from "react";
import FormRow from "../components/shared/formrow";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup, reset } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { firstname, lastname, email, password, confirmPassword } = formData;

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.user
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isError) {
      setError(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isSuccess, isError, message, navigate, error, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        firstname,
        lastname,
        email,
        password,
        confirmPassword,
      };
      dispatch(signup(userData));
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <div className="flex flex-col gap-10 items-center justify-center w-[30vw] m-auto">
        {error && <div className="text-red-500">{error}</div>}
        <h1 className="font-bold text-3xl">Sign Up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <FormRow type="text" name="firstname" value={formData.firstname} handleChange={handleChange}/>
          <FormRow type="text" name="lastname" value={formData.lastname} handleChange={handleChange}/>
          <FormRow type="email" name="email" value={formData.email} handleChange={handleChange}/>
          <FormRow type="password" name="password" value={formData.password} handleChange={handleChange}/>
          <FormRow type="password" name="confirmPassword" value={formData.confirmPassword} handleChange={handleChange}/>
          <div className="flex justify-center mt-10">
            <button
              type="submit"
              className="border-2 border-black rounded-lg bg-fuchsia-700 py-4 px-6"
            >
              {isLoading ? "loading..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
