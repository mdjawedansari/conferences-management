import User from "../models/user.models.js";

const generateAccessOrRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    user.save({ validateBeforeSave: true });

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    console.log("somthing went wrong while generating token", error.message)
  }
};

export default generateAccessOrRefreshToken;
