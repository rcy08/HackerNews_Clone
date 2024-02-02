"use server";
import User from '@/lib/models/user.model';
import { connectToDB } from '../mongoose'; 
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

interface Params {
    username: string, 
    password: string
};

const generateToken = (id: mongoose.Schema.Types.ObjectId) => {
    if(!process.env.JWT_SECRET){
        return console.log('JWT secret not found');
    }
    return jwt.sign({ id }, process.env.JWT_SECRET , {
        expiresIn: '24h'
    });
};

export const signup = async({ username, password } : Params) => {
    
    connectToDB();

    const usernameExists = await User.findOne({ username });

    if(usernameExists){
        throw new Error(`username already exists: ${username}`);
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await User.create({ username, password: hashed });
    const token = generateToken(user._id);

    if(!token){
        throw new Error('Token generation failed');
    }

    return JSON.stringify({ user, token });

}

export const login = async({ username, password } : Params) => {

    connectToDB();

    const user = await User.findOne({ username });

    const auth  = await bcrypt.compare(password, user.password);

    if(!auth){
        throw new Error('Incorrect password');
    }

    const token = generateToken(user._id);

    return JSON.stringify({ user, token });

}