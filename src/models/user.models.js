import mongoose ,{Schema} from "mongoose";

const userSchema = new schema(
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
    timeStamps: true
    }
)
export const User=mongoose.model("User", userSchema)