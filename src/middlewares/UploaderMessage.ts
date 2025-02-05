import {Request, Response, NextFunction} from "express"

export class UploaderMessage{

    public static message(request: Request, response: Response, next: NextFunction){

        try {

            const file = request.file;
        
            if (!file) {

                response.status(400).json({ error: "No file uploaded" });
                return;

            }

            response.status(200).json({ message: "File uploaded successfully", file: file });
            next()

        } catch (error: any) {
            
            response.status(500).json({message:error.message})

        }       

    }
}