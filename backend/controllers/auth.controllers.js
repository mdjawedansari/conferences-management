import generateAccessOrRefreshToken from "../helper/token.js";
import User from "../models/user.models.js";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password, fullName } = req.body;
    //validate all fields arwe required
    if (!username || !email || !password || !fullName) {
      return res.status(400).send({
        success: false,
        message: "All fields are required ",
      });
    }

    const userExist = await User.findOne({email});
    if(userExist){
        return res.status(400).send({
            success: false,
            message: "User already exist please login ",
          });
    }

    const user  = await User.create({
        fullName,
        username : username.toLowerCase() , 
        email,
        password
    })

    const createdUser = await User.findById(user._id).select(
        "-refreshToken -password"
    )

    res.status(200).send({
        success : true, 
        message : "register sucessfully",
        data : createdUser
    })

  } catch (error) {
    return res.status(500).json(
      {
        message: "internal server error",
        success: false,
      },
      error
    );
  }
};

export const loginUser = async (req, res) => {
    try {
        const {email,  password} = req.body;
   
        if(!email || !password){
            return res.status(400).send({
                success: false,
                message: "All fields are required ",
              });
        }

        const user = await User.findOne({email})
        if(!user) {
            return res.status(400).send({
                success: false,
                message: "user not found ! ",
              });
        }
       
        const validPassword = await user.isPasswordCorrect(password)

        if(!validPassword){
            return res.status(400).send({
                success: false,
                message: "invalid credintial ",
              });
        }

  
        // generate access token
        const {accessToken, refreshToken} = await generateAccessOrRefreshToken(user._id)
   

        const loggedInUser = await User.findById(user._id).select(
            "-refreshToken -password -__v"
        )

        const accessTokenOption ={
            httpOnly : true,
            secure : true,
            maxAge : 24 * 60 * 60 * 1000
        }

        
        const refreshTokenOption ={
            httpOnly : true,
            secure : true,
            maxAge : 72 * 60 * 60 * 1000
        }

        return res.status(200)
        .cookie("accessToken", accessToken, accessTokenOption )
        .cookie("accessToken", refreshTokenOption, refreshTokenOption )
        .send({
            success : true,
            message : "loggedIn Sucess",
            data : loggedInUser
        })

    } catch (error) {
        return res.status(500).json(
            {
              message: "internal server error",
              success: false,
            },
            error
          );
    }
}


export const getAllusers  = async (req, res) => {
    try {

        const user = await User.find();
        if(!user){
            return res.status(400).send({
                success: false,
                message: "user not found ! ",
              });
        }
       return res.status(200).send({
            success : true,
            message : "loggedIn Sucess",
            data : user
        })


    } catch (error) {
        return res.status(500).json(
            {
              message: "internal server error",
              success: false,
            },
            error
          );
    }
}

