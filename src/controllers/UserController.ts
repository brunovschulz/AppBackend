import { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";
import auth from "../config/auth"

const prisma = new PrismaClient();

//CRUD: Create, Read, Update, Delete

class UserController {

    //criando usuário
    public async create( request:Request, response:Response ){

        const {name, cpf, email, telephone, password, imageURL} = request.body;
        const {hash, salt} = auth.generatePassword(password);

        try {

            const newUser = await prisma.user.create({
                data:{
                  name,
                  cpf,
                  email,
                  telephone,
                  hash,
                  salt,
                  rating: 0, //começa sem avaliação
                  imageURL,
                },  
              })

            response.status(201).json({message: "Sucess!", data: newUser})
            
        } catch (error: any) {

            response.status(500).json({message: error.message })
            
        }
    }

    //lendo usuário específico
    public async read(request:Request, response:Response){

        const {id} = request.params;

        try {

            const user = await prisma.user.findUnique({
                where: {id: Number(id)}
                }
            )

            if(!user){
                response.status(500).json({message:"No User Found!"})
                return;
            }
            
            response.status(200).json({message:"Sucess!", data: user})

        } catch (error: any){

            response.status(404).json({message: error.message})
            
        }

    }

    //lendo todos os usuários
    public async readAll(request:Request, response:Response){

        try {

            const users = await prisma.user.findMany()
            response.status(200).json({message:"Sucess!", data:users})
            
        } catch (error:any) {
            
            response.status(500).json({message: error.message})

        }

    }

    //atualizando um usuário
    public async update(request:Request, response:Response){

        const {id} = request.params;
        const {name, cpf, email, telephone, rating, imageURL} = request.body;

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
                    rating, 
                    imageURL
                },
            })

            response.status(200).json({message:"Sucess!", data: updatedUser})

        } catch (error: any) {

            response.status(500).json({message: error.message})
            
        }
    
    }

    //deletando um usuário
    //onDelete Cascade garante que todos os produtos atrelados ao usuário também sumirão
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

    //deletando todos os usuários
    //não disponível em nenhuma rota!!
    //onDelete Cascade garante que todos os produtos atrelados ao usuário também sumirão
    public async deleteAll(request:Request, response:Response){

        try {
            
            const users = await prisma.user.deleteMany();

            response.status(200).json({message:"Sucess!", data: users});

        } catch (error: any) {

            response.status(500).json({message: error.message})
            
        }

    }

    public async login(request: Request, response: Response){

        try {

            const {id, password} = request.body;

            const user = await prisma.user.findUnique({
                where:{id:Number(id)}
            })

            if(!user){
                response.status(404).json({message: "No user found!"})
                return;
            }

            if(!auth.checkPassword(password, user.hash, user.salt)){
                response.status(500).json({message: "Wrong password!"})
                return;
            }

            const token = auth.generateJWT(user);

            response.status(201).json({message: "Successful Authentication, Token sent!", token: token})
            
        } catch (error: any) {
            
            response.status(500).json({error: error.message})

        }
        
    }

    public async changePassword(request: Request, response: Response){

        const id = request.user;

        if(!id){
            response.status(500).json({message:"Acesso não Autorizado!"})
        }

        const {newPassword} = request.body;
        const {hash, salt} = auth.generatePassword(newPassword)

        try {
            
            const user = await prisma.user.update({
                where:{id: Number(id)},
                data: {
                    hash,
                    salt
                }
            })

            response.status(200).json({message:"Acesso Autorizado! Senha trocada com sucesso.", user:user})

        } catch (error) {
            
            response.status(500).json({message:"Server Error!"})
            
        }

    }

}

export default new UserController();