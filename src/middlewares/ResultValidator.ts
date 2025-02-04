import {Request, Response, NextFunction} from "express"
import { validationResult } from "express-validator"

export class ResultValidator{

    public static validateResult(request: Request, response: Response, next: NextFunction){
        
        try {

            const validationErros = validationResult(request)
        
            if(!validationErros.isEmpty()){

                response.status(500).json({erros: validationErros.array()})
                
                return; //importante!! Para não registrar usuário mesmo dando erro

            }

            next()

        } catch (error: any) {
            
            response.status(500).json({message:error.message})

        }
    }
}
