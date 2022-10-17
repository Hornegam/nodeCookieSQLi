import { Request, Response } from "express";
import { UserService } from "../services/UserService";


class UserController{

    async log_user(request: Request, response: Response){
        const credentials: {user: string, pass: number} = request.body
        const userService = new UserService();

        //Validate if user exists and return the user
        const validated = await userService.validate_user(credentials.user, credentials.pass)

        //User not founded
        if(validated == undefined){
            return response.status(200).json("Não foi possível fazer login...")
        }else{

            //Base64 is really secure?
            const cookieEncoded = Buffer.from(JSON.stringify(validated), 'utf-8').toString('base64');
            
            //Need to fix the data that are going to frontend
            const infos = {'Usuario': validated, 'Cookie': cookieEncoded}

            var date = new Date(Date.now());

            date.setHours(date.getHours() + 1) 
        
            return response
            .cookie("CookieSession",infos.Usuario) //Need to add some security flags
            .status(403)
            .json("Não foi possível login!")
        }

    }


}



export {UserController}