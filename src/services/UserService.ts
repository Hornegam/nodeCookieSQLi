import { UserRepository}   from "../repositories/UserRepository";
import { IUser } from "../interfaces/UserInterface";

class UserService {

    async validate_user(user, pass){
        const userRepository = new UserRepository();

        //Look for user by email
        const user_check : IUser = await userRepository.get_user_by_email(user)

        //My validation is the best!!
        if(user_check != undefined){
            return user_check
        }else{
            return undefined
        }
    }
}

export { UserService }