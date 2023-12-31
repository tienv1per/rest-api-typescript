import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export interface UserInput {
    email: string;
    name: string;
    password: string;
};

// định nghĩa các thuộc tính và phương thức của đối tượng User
export interface UserDocument extends UserInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
};

// xác định cấu trúc dữ liệu và quy định cách dữ liệu của đối tượng User sẽ được lưu trữ trong cơ sở dữ liệu
const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    name: {type: String, required: true, unique: true},
    password: {type: String, required: true},
}, {
    timestamps: true,
});

// middleware handle before save data to DB
// check if password changed, then hash it and save it to DB
userSchema.pre("save", async function (next) {
    let user = this as UserDocument;
    if(!user.isModified("password")){
        return next();
    }
    const saltWorkFactor = config.get<number>("saltWorkFactor");
    const salt = await bcrypt.genSalt(saltWorkFactor);
    const hash = await bcrypt.hashSync(user.password, salt);
    user.password = hash;
    return next();
});

userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
    const user = this as UserDocument;
    return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;