import {User} from '../models/user.models.js'
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import  ApiError  from '../utils/api-error.js';
import {sendEmail,emailVerificationmailgenContent} from '../utils/mail.js'

const generateAccessAndRefreshTokens = async (UserId) =>{
    try{
    const user=await User.findById(UserId)
    const accesstoken=user.generateAccessToken()
    const refreshtoken=user.generateRefreshToken()

    user.refreshToken = refreshtoken
    await user.save({validateBeforeSave: false})
    return {accesstoken,refreshtoken}
    }
    catch(error)
    {
       throw new ApiError(500,"something went wrong while generating the credentials")
    }
}
 

const registeredUser = asyncHandler(async (req,res)=>{

    const {email,username,password,role}=req.body

    const existeduser=await User.findOne({
        $or: [{username},{email}]
    })

    if(existeduser){
        throw new ApiError(409,"user already exists pls check",[])
    }

    const user=await User.create({
        email,
        password,
        username,
        isEmailVerified: false
    })

    const {unHashedToken, hashedToken,tokenExpiry}=user.generateTemporaryToken()

    user.emailVerificationToken=hashedToken
    user.emailVerificationExpiry=tokenExpiry

    await user.save({validateBeforeSave: false})
    

    await sendEmail({
    email: user?.email,
    subject: "Please verify your email",
    mailgenContent: emailVerificationmailgenContent(
        user.username,
        `${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unHashedToken}`
    )
});

await User.findById(user._id).select("-password");
  
const createdUser = await User.findById(user._id).select(
    "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
);


if (!createdUser) {
    throw new ApiError(
        500,
        "Something went wrong while registering a user"
    );
}

return res
    .status(201)
    .json(
        new ApiResponse(
            201,
            createdUser,
            "User registered successfully"
        )
    );

})

export  {registeredUser}













//so the process is user registers for the first time
// first check valid entry or not
//then check with the database if user already exits
//if no save the new user (which includes the process of access token ,refresh token, general token and then we need to send mail)
//user verification from the mail
//response back to the request

