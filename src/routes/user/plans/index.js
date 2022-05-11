
import {db} from "$lib/database/dbFunctions.js";
import fs from 'fs'
export async function post({request}){
    const sessions = JSON.parse(fs.readFileSync("sessions.json", 'utf8'))
    const body = await request.json();
    const email = body.email
    console.log("email: " + email)
    let password = sessions[email].password;

    try{
        const plans = await db.selectAllPrograms(email,password);
        const parsed_data = JSON.parse(JSON.stringify(plans))[0];
        // console.log(parsed_data);
        if (plans) {
            return {
                body: {parsed_data}
            };
        } else {
            return {
                status : 404
            };
        }
    }catch(e){
        console.log(e);
    }
}