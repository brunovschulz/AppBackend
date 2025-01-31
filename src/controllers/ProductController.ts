import { Request, Response} from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class ProductController {

    //criando produto
    public async create( request:Request, response:Response ){

        const {userId} = request.params;
        const {name, imageURL, description, price, amount} = request.body;
        console.log(userId)

        try {

            const user = await prisma.user.findUnique({
                where: {id: Number(userId)}
                }
            )

            if(!user){
                response.status(500).json({message:"No User Found!"})
                return;
            }

            const newProduct = await prisma.product.create({
                data:{
                    name,
                    imageURL,
                    description,
                    price,
                    amount: Number(amount),
                    userId: Number(userId)
                },  
                })

            response.status(201).json({message: "Sucess!", data: newProduct})
            
        } catch (error: any) {

            response.status(500).json({message: "Error!" })
            
        }
    }

    //lendo produto específico
    public async read(request:Request, response:Response){
    
        const {id} = request.params;

        try {

            const product = await prisma.product.findUnique({
                where: {id: Number(id)}
                }
            )

            if(!product){
                response.status(500).json({message:"No Product Found!"})
                return;
            }
            
            response.status(200).json({message:"Sucess!", data: product})

        } catch (error: any){

            response.status(404).json({message: "Error!"})
            
        }
    
    }

    //lendo todos os produtos
    public async readAll(request:Request, response:Response){

        try {

            const products = await prisma.product.findMany()
            response.status(200).json({message:"Sucess!", data:products})
            
        } catch (error:any) {
            
            response.status(500).json({message: "Error!"})

        }

    }
    
    //lendo todos os produtos de um usuário
    public async readAllFromUser(request:Request, response:Response){

        const {id} = request.params;

        try {

            const user = await prisma.user.findUnique({
                where:{id:Number(id)}
            })

            if(!user){
                response.status(500).json({message:"No User Found!"})
                return;
            }

            const products = await prisma.product.findMany({
                where:{userId:Number(id)}
            })
            response.status(200).json({message:"Sucess!", data:products})
            
        } catch (error:any) {
            
            response.status(500).json({message: "Error!"})

        }

    }

    //atualizando um produto
    public async update(request:Request, response:Response){

        const {id} = request.params;
        const {name, imageURL, description, price, amount} = request.body;

        try {
            
            const updatedProduct = await prisma.product.update({
                where:{
                    id: Number(id),
                },
                data:{
                    name,
                    imageURL,
                    description,
                    price,
                    amount,
                },
            })

            response.status(200).json({message:"Sucess!", data: updatedProduct})

        } catch (error: any) {

            response.status(500).json({message:"Error!"})
            
        }
    
    }

    //apagando um produto
    public async delete(request:Request, response:Response){

        const {id} = request.params;

        try {
            
            const product = await prisma.product.delete({
                where: {id: Number(id)}
            })

            response.status(200).json({message:"Sucess!", data: product});

        } catch (error: any) {

            response.status(500).json({message: "Error!"})
            
        }

    }


}

export default new ProductController();