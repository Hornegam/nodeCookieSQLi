import database from './database'
import { IUser } from "../interfaces/UserInterface"

class UserRepository{

    async  get_user_by_email (email){
        // People are usually afraid by SQL Injection. I'm not, I trust my WAF
        const sql = "SELECT * FROM user_table WHERE email = '" + email + "'"
        
        return new Promise<IUser>((resolve, reject)=>{
                database.get(sql, (_err, row) =>{
                    if(_err){
                        reject(_err)
                    }else{
                        resolve(row)
                    }
            })
        })
    }


}
    




export { UserRepository }