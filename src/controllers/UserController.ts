import { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//CRUD: Create, Read, Update, Delete

class UserController {

    //criar um usuário
    public async create( request:Request, response:Response ){

        const {name, cpf, email, telephone, password, rating, imageURL} = request.body;

        try {

            const newUser = await prisma.user.create({
                data:{
                  name,
                  cpf,
                  email,
                  telephone,
                  password,
                  rating,
                  imageURL,
                },  
              })

            response.status(201).json({message: "Sucess!", data: newUser})
            
        } catch (error: any) {

            response.status(500).json({message: error.message })
            
        }
    }

    //encontrar um usuário específico
    public async read(request:Request, response:Response){

        const {id} = request.params;

        try {

            const user = await prisma.user.findUnique({
                where: {id: Number(id)}
                }
            )
            
            response.status(200).json({message:"Sucess!", data: user})

        } catch (error: any){

            response.status(404).json({message: error.message})
            
        }

    }

    //encontrar todos os usuários
    public async readAll(request:Request, response:Response){

        try {

            const users = await prisma.user.findMany()
            response.status(200).json({message:"Sucess!", data:users})
            
        } catch (error:any) {
            
            response.status(500).json({message: error.message})

        }

    }

    public async update(request:Request, response:Response){

        const {id} = request.params;
        const {name, cpf, email, telephone, password, rating, imageURL} = request.body;

        try {
            
            const updatedUser = await prisma.user.update({
                where:{
                    id: Number(id),
                },
                data:{
                    name,
                    cpf,
                    email,
                    telephone,
                    password, 
                    rating, 
                    imageURL
                },
            })

            response.status(200).json({message:"Sucess!", data: updatedUser})

        } catch (error: any) {

            response.status(500).json(error.message)
            
        }
    
    }

    public async delete(request:Request, response:Response){

        const {id} = request.params;

        try {
            
            const user = await prisma.user.delete({
                where: {id: Number(id)}
            })

            response.status(200).json({message:"Sucess!", data: user});

        } catch (error: any) {

            response.status(500).json({message: error.message})
            
        }

    }

    public async deleteAll(request:Request, response:Response){

        try {
            
            const users = await prisma.user.deleteMany();

            response.status(200).json({message:"Sucess!", data: users});

        } catch (error: any) {

            response.status(500).json({message: error.message})
            
        }

    }

}

export default new UserController();