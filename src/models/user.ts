import {model, Schema, Document} from 'mongoose';
import bcrypt from 'bcrypt'

export interface IUser extends Document{
    email: string,
    password: string,
    comparePassword: () => Promise<boolean>,
    validPassword: (password: string) => Promise<boolean>
}

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trin: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre<IUser>('save', async function(next) {
    let user = this;
    if (!user.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt)
    user.password = hash;
    next();

});

userSchema.methods.comparePassword = async function(password: string) :  Promise<boolean>{
    console.log(password)
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.validPassword = async function (password: string){
    return await bcrypt.compare(password, this.password)
}

export default model<IUser>('User', userSchema)