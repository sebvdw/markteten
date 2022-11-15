import { users } from '../db/users.js'
import bcrypt from 'bcrypt'

export const registerUser = (user) => {
    if(!users.find(u => u.username === user.username)) {
        user.id = Date.now();
        user.role = 'user';
        //hash password
        bcrypt.genSalt(10,(err,salt)=> 
            bcrypt.hash(user.password,salt,
                (err,hash)=> {
                    if(err) throw err;
                    user.password = hash
                }));
        users.push(user);
        return ({ messages: "Registered Successfully! 🥳" })
    } else {
        return ({ err: "This username already exists! 😬"})
    }
}

export const getUser = (user) => {
    return users.find(u => u.username === user.username);
}

export const getUsers = () => {
    return users;
}