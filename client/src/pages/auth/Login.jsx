import React, { useEffect, useState } from "react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/user";
import toast from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState();

  const [passwordShown, setPasswordShown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      setLoading(true);
      loginHandler(values);
    },
  });

  const loginHandler = async (values) => {
    try {
     
      const response = await login(values);
  
      if (response.success !== true) {
        toast.error(response?.message);
      }
     
      navigate("/");
      toast.success(response?.message)
    } catch (error) {
        toast.error(response?.message);
    }
  };

  return (
    <>
      <div className="mx-auto min-h-[100vh] max-w-screen-4xl">
        <div className="relative bg-primary overflow-hidden xs:px-4 md:px-0">
          <div className="max-w-[522px] pb-10 m-auto">
            {/* login form */}
            <div className="relative  md:px-[77px] px-4 py-4 bg-[#ffffff] mt-[40px] font-primary rounded-xl">
              <div className="max-w-[368px] max-h-[673px] flex flex-col gap-[45px]">
                <h1 className="text-black font-[500] leading-[50.4px] text-center text-[40px]">
                  Login
                </h1>
                <div className="flex flex-col z-10 gap-[30px]">
                  <form
                    onSubmit={formik.handleSubmit}
                    className="text-left flex flex-col gap-[30px]"
                  >
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
                        className={`w-full px-[16px] py-[12px] rounded-lg text-[14px] border-[1px] focus:outline-[3px] focus:outline-[#277DFE] ${
                          formik.touched.email && formik.errors.email
                            ? "border-error"
                            : "border-[#B3B3B3]"
                        } placeholder:leading-[22px] placeholder:font-[400] placeholder-[#000000]`}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <div className="py-2 text-error font-[400] text-[14px] leading-[17.64px]">
                          {formik.errors.email}
                        </div>
                      ) : null}
                    </div>
                    <div className="">
                      <label
                        htmlFor="password"
                        className="flex justify-between"
                      >
                        <h1 className="mb-2 text-[16px] leading-[24px] font-[400] text-[#4D4D4D]">
                          Password
                        </h1>
                        <h1 className="mb-2 text-[16px] leading-[24px] font-[400] text-[#277DFE]">
                          Forgot Password ?
                        </h1>
                      </label>
                      <div className="relative">
                        <input
                          id="password"
                          name="password"
                          placeholder="Enter your password"
                          autoComplete="off"
                          className={`w-full px-[16px] py-[12px] rounded-lg text-[14px] border-[1px] focus:outline-[3px] focus:outline-[#277DFE] ${
                            formik.touched.password && formik.errors.password
                              ? "border-error"
                              : "border-[#B3B3B3]"
                          } placeholder:leading-[22px] placeholder:font-[400] placeholder-[#999999] pr-10`}
                          type={passwordShown ? "text" : "password"}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.password}
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
                      {formik.touched.password && formik.errors.password ? (
                        <div className="py-2 text-error font-[400] text-[14px] leading-[17.64px]">
                          {formik.errors.password}
                        </div>
                      ) : null}
                    </div>
                    <div className="flex flex-col gap-[24px]">
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex rounded-lg justify-center items-center p-[16px] w-full font-[500] text-[20px] leading-[25.2px] text-[#FFFFFF] bg-blue-500 hover:bg-hover hover:text-black transition-all duration-300 ease-in-out"
                      >
                        {loading ? (
                          <div className="flex items-center gap-4 justify-center">
                            
                            <h1 className="text-black">Logging...</h1>
                          </div>
                        ) : (
                          "Login"
                        )}
                      </button>
                      <h1 className="text-center text-[#B3B3B3] font-[400] text-[16px] leading-[24px]">
                        Don{"'"}t have an account?
                        <Link
                          to="/signup"
                          className="text-[#277DFE] font-[400] text-[16px] leading-[24px] pl-2"
                        >
                          Sign up
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
    </>
  );
};

export default Login;
