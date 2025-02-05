import { Response, Request, NextFunction } from "express"
import { PrismaClient } from "@prisma/client";
import { Mailer }  from "../config/mailer";

const prisma = new PrismaClient();

export class EmailSender{

    public static async sendEmail(request: Request, response: Response, next: NextFunction){

        const {id} = request.params;

        const user = await prisma.user.findUnique({
            where:{id:Number(id)}
        })

        if(!user){
            response.status(404).json({message:"No user found with this id!"})
            return;
        }

        try {
            
            await Mailer.sendEmail(user.email,
                "Email from Backend!",
                "This email was sent to you automatically by brunovschulz@gmail.com's project!"
            )

            response.status(200).json({message:"Email sent!"})
            next()
            

        } catch (error: any) {
            response.status(500).json({message:"Email failed to send!"})
            return;
        }

    }
}