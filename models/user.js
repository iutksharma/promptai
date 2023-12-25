import { Schema, model, models} from "mongoose";

const UserSchema = new Schema({
    email:{
        type: String,
        unique:[true, 'Email already exists!'],
        required:[true, 'Email is required']
    },
    username:{
        type: String,
        unique:[true, 'Username is required!'],
        match:[/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/, 'Username invalid, It should contain alphanumeric letters and be unique']
    },
    image:{
     type: String,
    }
});
    

const User = models.user || model('User', UserSchema);

export default User;