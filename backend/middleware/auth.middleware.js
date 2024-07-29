import jwt from "jsonwebtoken";
import User from "../models/user.models";

export const authenticatedUser = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replce("Bearer ", "");
    if (!token) {
      return res.status(400).send({
        success: false,
        message: "unAuthorize request",
      });
    }

    const decodedToken = await jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );
    const user = await User.findById(decodedToken._id);

    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Invalid token",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(400).send({
        success : false,
        message : "somthing wend wrong"
    }, 
    error
)
  }
};


export const isAdmin = async (req, res, next) => {
    try {
        const {email} = req.body
        const adminUser = await User.findOne({email})
        
        if (adminUser?.role !== "admin" ){
        return res.status(400).send({
          success: false,
          message: "You dont have access",
        });
      }

      next();
    } catch (error) {
      return res.status(400).send({
          success : false,
          message : "somthing wend wrong"
      }, 
      error
  )
    }
  };