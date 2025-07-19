import mongoose  from "mongoose";

let genderEnum={male:"Male",female:"female"};
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: [20, "firstName max length is 20 char and you have entered {VALUE}"]
  },
  lastName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: [20, "firstName max length is 20 char and you have entered {VALUE}"]
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum:{values:["Male","female"],message:""},
    default:"Male",
    required: true
  },
  
  phone:String,
  
},
{
  confirmEmail:  Date
},
{
  timestamps: true
});

userSchema.virtual("fullName").set(function(value){

    const [firstName,lastName]=value?.split(" ")||[];
    this.set({firstName,lastName})

}).get(function(){
    return this.firstName+" "+this.lastName;
});

export const UserModel=mongoose.models.user ||mongoose.model("User",userSchema)

UserModel.syncIndexes();