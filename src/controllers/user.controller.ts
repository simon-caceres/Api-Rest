import {Request, Response} from 'express'
import User, {IUser} from '../models/user'
import jwy from 'jsonwebtoken';
import config from '../config/config'

function createToken(user:IUser){
    return jwy.sign({id: user.id, email: user.email}, config.jwtSecret,{
        expiresIn: 8400
    })
}

export const singUp = async (req: Request,res: Response):Promise<Response> => {
    if (!req.body.email|| !req.body.password) {
        return res.status(400).json({msg: 'porfavor envia correo y contraseña'})
    } 

    const user = await User.findOne({email: req.body.email})
    console.log(user)
    if(user){
        return res.status(400).json({msg: 'usuario ya existe'})
    }

    const newUser = new User(req.body);
    await newUser.save();

    return res.status(201).json(newUser);
}

export const singIn = async (req: Request,res: Response) => {
    try {
        if (!req.body.email|| !req.body.password) {
            return res.status(400).json({msg: 'porfavor envia correo y contraseña'})
        } 
    
        const user = await User.findOne({email: req.body.email})
        if(!user){
            return res.status(400).json({msg: 'usuario no existe'})
        }
        console.log(req.body)
        const isMatch = await user.validPassword(req.body.password)
        if(isMatch) {
            return res.status(200).json({token: createToken(user)})
        }
    
        return res.status(400).json({
            msg: 'correo o contraseña invalidos'
        })
    } catch (error) {
        console.log(error)
    }
    
}