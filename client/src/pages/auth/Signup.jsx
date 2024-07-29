import React, { useState } from "react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { IoMdCheckmarkCircle, IoMdCloseCircle } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { registerUser } from "../../api/user";

const initialState = {
  email: "",
  password: "",
  username: "",
  fullName: "",
};

const Signup = () => {
    const navigate  = useNavigate()

  const [formData, setFormData] = useState(initialState);

  const [passwordShown, setPasswordShown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const validatePassword = (password) => {
    const validation = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
    setPasswordValidation(validation);

    let error = "";
    if (!validation.length) {
      error = "8 characters.";
    } else if (!validation.lowercase) {
      error = "one lowercase letter.";
    } else if (!validation.uppercase) {
      error = "one uppercase letter.";
    } else if (!validation.number) {
      error = "one number.";
    } else if (!validation.specialChar) {
      error = "one special character.";
    } else if (!validation) {
      error = "Please add all necessary characters to create a safe password";
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    let newErrors = { ...errors };
    if (name === "email") {
      if (!value) {
        newErrors.email = "Email is required.";
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        newErrors.email = "Email address is invalid.";
      } else {
        newErrors.email = "";
      }
    }

    if (name === "password") {
      newErrors.password = validatePassword(value);
    }

    setErrors(newErrors);
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = { email: "", password: "" };
    let isValid = true;

    if (!formData.email) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid.";
      isValid = false;
    }

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      newErrors.password = passwordError;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        const response = await registerUser(formData);
        if (response.success === !true) {
          toast.error(response.message);
        }

        setFormData(initialState);
        navigate('/login')
        toast.success(response.message);
      } catch (error) {
        console.error("Error saving user data:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto">
      <div className="grid grid-cols-1 ">
        <div className="px-4  max-w-full max-h-[944px]">
          <div>
            <div className="flex gap-[7.41px] items-center">
              <h1 className="w-[89px] h-[31px] text-[24.68px] font-[500] text-black leading-[31.1px]">
                CONFERENCE
              </h1>
            </div>
            <div className="px-16 mt-[20px] max-w-[596px] font-primary max-h-[555px] m-auto">
              <div className="max-w-[468px] flex flex-col gap-[45px]">
                <div>
                  <h1 className="text-black font-[500] leading-[50.4px] text-[40px]">
                    Sign up
                  </h1>
                </div>
                <div className="flex flex-col gap-[30px]">
                  <form
                    onSubmit={handleSubmit}
                    className="text-left flex flex-col gap-[30px]"
                  >
                    <div>
                      <label htmlFor="email">
                        <h1 className="mb-2 text-[16px] leading-[24px] font-[400] text-[#4D4D4D]">
                          username
                        </h1>
                      </label>
                      <input
                        id="username"
                        type="text"
                        name="username"
                        autoComplete="off"
                        placeholder="lorem_ipsum001"
                        className={`w-full px-[16px] py-[12px] rounded-lg text-[14px] border-[1px] focus:outline-[3px] focus:outline-[#277DFE] border-[#B3B3B3] placeholder:leading-[22px] placeholder:font-[400] placeholder-[#000000] ${
                          errors.username ? "border-red-500" : ""
                        }`}
                        onChange={handleChange}
                        onFocus={handleFocus}
                      />
                      {errors.username && (
                        <p className="py-2 text-red-500 font-[400] text-[14px] leading-[17.64px]">
                          {errors.username}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email">
                        <h1 className="mb-2 text-[16px] leading-[24px] font-[400] text-[#4D4D4D]">
                          fullName
                        </h1>
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        name="fullName"
                        autoComplete="off"
                        placeholder="lorem_ipsum001"
                        className={`w-full px-[16px] py-[12px] rounded-lg text-[14px] border-[1px] focus:outline-[3px] focus:outline-[#277DFE] border-[#B3B3B3] placeholder:leading-[22px] placeholder:font-[400] placeholder-[#000000] ${
                          errors.fullName ? "border-red-500" : ""
                        }`}
                        onChange={handleChange}
                        onFocus={handleFocus}
                      />
                      {errors.fullName && (
                        <p className="py-2 text-red-500 font-[400] text-[14px] leading-[17.64px]">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email">
                        <h1 className="mb-2 text-[16px] leading-[24px] font-[400] text-[#4D4D4D]">
                          Email
                        </h1>
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        autoComplete="off"
                        placeholder="Lorem@gmail.com"
                        className={`w-full px-[16px] py-[12px] rounded-lg text-[14px] border-[1px] focus:outline-[3px] focus:outline-[#277DFE] border-[#B3B3B3] placeholder:leading-[22px] placeholder:font-[400] placeholder-[#000000] ${
                          errors.email ? "border-red-500" : ""
                        }`}
                        onChange={handleChange}
                        onFocus={handleFocus}
                      />
                      {errors.email && (
                        <p className="py-2 text-red-500 font-[400] text-[14px] leading-[17.64px]">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="">
                      <label
                        htmlFor="password"
                        className="flex justify-between"
                      >
                        <h1 className="mb-2 text-[16px] leading-[24px] font-[400] text-[#4D4D4D]">
                          Password
                        </h1>
                      </label>
                      <div className="relative">
                        <input
                          id="password"
                          name="password"
                          type={passwordShown ? "text" : "password"}
                          placeholder="Enter your password"
                          autoComplete="off"
                          className={`w-full px-[16px] py-[12px] rounded-lg text-[14px] border-[1px] focus:outline-[3px] focus:outline-[#277DFE] border-[#B3B3B3] placeholder:leading-[22px] placeholder:font-[400] placeholder-[#999999] pr-10 ${
                            errors.password ? "border-red-500" : ""
                          }`}
                          onChange={handleChange}
                          onFocus={handleFocus}
                        />
                        <i
                          onClick={togglePasswordVisibility}
                          className="absolute top-1/2 w-[24px] h-[24px] right-[16px] transform -translate-y-1/2 cursor-pointer"
                        >
                          {passwordShown ? (
                            <EyeIcon className="h-5 w-5 text-gray-500" />
                          ) : (
                            <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                          )}
                        </i>
                      </div>
                      {errors.password && (
                        <div className="flex items-center  gap-[8px]">
                          <p className="py-2 text-red-500 font-[400] text-[14px] leading-[17.64px]">
                            {errors.password}
                          </p>
                        </div>
                      )}

                      {/* All checkpoints for password validation */}

                      <ul className="list-none mt-2 tex-[14px] grid grid-cols-2">
                        <li
                          className={`flex items-center gap-[8px] ${
                            passwordValidation.length
                              ? "text-green-500"
                              : "text-[#0A0A0C]/40"
                          }`}
                        >
                          {passwordValidation.length ? (
                            <IoMdCheckmarkCircle className=" text-[15px]" />
                          ) : (
                            <IoMdCheckmarkCircle className="text-[#0A0A0C]/40 text-[15px]" />
                          )}
                          <span>8 characters.</span>
                        </li>
                        <li
                          className={`flex items-center gap-[8px] ${
                            passwordValidation.lowercase
                              ? "text-green-500"
                              : "text-[#0A0A0C]/40"
                          }`}
                        >
                          {passwordValidation.lowercase ? (
                            <IoMdCheckmarkCircle />
                          ) : (
                            <IoMdCheckmarkCircle className="text-[#0A0A0C]/40 text-[15px]" />
                          )}
                          <span>one lowercase letter.</span>
                        </li>
                        <li
                          className={`flex items-center gap-[8px] ${
                            passwordValidation.uppercase
                              ? "text-green-500"
                              : "text-[#0A0A0C]/40"
                          }`}
                        >
                          {passwordValidation.uppercase ? (
                            <IoMdCheckmarkCircle />
                          ) : (
                            <IoMdCheckmarkCircle className="text-[#0A0A0C]/40 text-[15px]" />
                          )}
                          <span>one uppercase letter.</span>
                        </li>
                        <li
                          className={`flex items-center gap-[8px] ${
                            passwordValidation.number
                              ? "text-green-500"
                              : "text-[#0A0A0C]/40"
                          }`}
                        >
                          {passwordValidation.number ? (
                            <IoMdCheckmarkCircle />
                          ) : (
                            <IoMdCheckmarkCircle className="text-[#0A0A0C]/40 text-[15px]" />
                          )}
                          <span>one number.</span>
                        </li>
                        <li
                          className={`flex items-center gap-[8px] ${
                            passwordValidation.specialChar
                              ? "text-green-500"
                              : "text-[#0A0A0C]/40"
                          }`}
                        >
                          {passwordValidation.specialChar ? (
                            <IoMdCheckmarkCircle />
                          ) : (
                            <IoMdCheckmarkCircle className="text-[#0A0A0C]/40 text-[15px]" />
                          )}
                          <span>one special character.</span>
                        </li>
                      </ul>
                    </div>
                    <div className="flex flex-col gap-[24px]">
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex rounded-lg justify-center items-center px-[16px] py-[12px] w-full font-[500] text-[20px] leading-[25.2px]  text-[#ffffff] hover:text-black transition-all duration-300 ease-in-out bg-blue-400 hover:bg-hover"
                      >
                        {loading ? (
                          <div className="flex items-center gap-4 justify-center">
                            <h1 className="text-black">Creating...</h1>
                          </div>
                        ) : (
                          "Sign Up"
                        )}
                      </button>
                      <h1 className="text-center text-[#B3B3B3] font-[400] text-[16px] leading-[24px]">
                        Already have an account?
                        <Link
                          to="/login"
                          className="text-[#277DFE] font-[400] text-[16px] leading-[24px] pl-2"
                        >
                          Login
                        </Link>
                      </h1>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
