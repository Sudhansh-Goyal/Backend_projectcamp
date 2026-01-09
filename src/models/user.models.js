import mongoose ,{Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import crypto from "crypto";


const userSchema = new Schema(
    {
        avatar:{
            type:
            {
                url: String,
                localPath: String
            },
            default:
                {
                    url:"https://placehold.co/150x150",
                    localPath:""
                }
        },
        username:{
            type:String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index:true
        },
        email:{
            type:String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullName:{
            type:String,
            trim:true
        },
        password:{
            type:String,
            required: [true,"password is required"]
        },
        isEmailVerified:{
            type:String,
            default:true
        },
        refreshToken:{
            type:String
        },
        forgotPasswordToken:{
            type:String
        },
        emailVerificationToken:{
            type:String
        },
        emailVerificationExpiry:{
            type:Date
        },
        forgotPasswordExpiry:{
            type:Date
        }
    },{
    timestamps: true
    }
)

userSchema.pre("save",async function(){
    if(!this.isModified("password"))  return;
      // return next();
    
    this.password=await bcrypt.hash(this.password,10)
    // next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};


userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateTemporaryToken = function () {
  
  const unHashedToken = crypto.randomBytes(20).toString("hex");

  
  const hashedToken = crypto
    .createHash("sha256")
    .update(unHashedToken)
    .digest("hex");

  
  const tokenExpiry = Date.now() + 20 * 60 * 1000;

  return {
    unHashedToken,
    hashedToken,
    tokenExpiry,
  };
};


export const User=mongoose.model("User", userSchema)

//schemas can be used with functions and hooks also

//models define how we are going to store our data and what are its fields its use

// Request
//   ↓
// Route
//   ↓
// Controller
//   ↓
// Model  ← talks to database
//   ↓
// Controller
//   ↓
// Response

//there are prehooks and posthooks that is action to be performed before saving the data and there are actions to be performed after saving the data
//one of such tasks is password hashing that is before storing our data in the database we want to encrypt our password or hashing which is one way encrption

//jwt is self contained token that is used to store user information . we know http is stateless firewall so everytime user tries to login like access profile page access given , next time it asks for alumni page http will be like who you are this is where conept of jwt comes into play every timr we requuest somehting our jwt token is sent and verified and bassed on that we are given the access\
//jwt has a header ,a payload and signature
//signature is created using header + payload + secret_key , this is to ensuere that token is not modified
//payload contains user data
//tokens are of two types data token and without data tokens
//without data tokens are something we receive on our mail and the same is stored in the mail box user eneters the token and the work is done
//the second case token with data where it is of 2 types access token and refresh tokens
//jwt is stateless that means session for everytime is not maintained in server , everytime it is checked through public key and that gives us the result
//also access token are meant for a very short period of time and are not stored in the server and refresh tokens are stored in the server, whenever access token get expired then we make use of refresh token
//jwt are not stored in the database



//  One-time actions

// Password reset

// Email verification

// Why NOT JWT here?

// Because:

// One-time

// Must be revocable

// Must expire

// Must not be reusable

// JWT is bad for this. crypto is perfect.

//  Now tie everything together (REAL LIFE FLOW)
//  Signup

// User sends password

// bcrypt hashes it

// Stored in DB

// Login

// Password checked using bcrypt

// If correct:

// Access token created

// Refresh token created

// Tokens sent to client

//  Normal API request

// Client sends access token

// Server verifies JWT

// User allowed

// No DB session

//  Access token expires

// Client sends refresh token

// Server verifies it

// New access token issued

//  Forgot password

// generateTemporaryToken() called

// Raw token emailed

// Hashed token stored

// User clicks link

// Token verified

// Password reset

