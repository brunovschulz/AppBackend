import { Router, Request, Response } from "express";

//importando controllers

import UserController from "../controllers/UserController";
import ProductController from "../controllers/ProductController";


//importando validação

import { UserValidator, } from "../config/validators/UserValidator";
import { ProductValidator } from "../config/validators/ProductValidator";
import { ResultValidator } from "../middlewares/ResultValidator";

//importando upload de imagens

import { photoUpload } from "../config/uploader";
import { UploaderMessage } from "../middlewares/UploaderMessage";

//importando classe que envia emails

import { EmailSender } from "../middlewares/EmailSender";
//

const router = Router(); //Router é uma factory, por isso não usamos new antes de Router()

/*  
!!! ATENÇÃO !!!  
Rotas RESTful  
1. Criar um produto já estabelece uma relação com um usuário determinado.  
2. Excluir um produto já remove a relação.  
3. Excluir um usuário também exclui todos os produtos relacionados, devido ao onDelete Cascade.  

Isso ocorre porque nosso modelo exige que um produto sempre tenha um usuário relacionado.  
*/

//USER
router.post("/user/:id/send-email", EmailSender.sendEmail)

router.post("/user", UserValidator.validateUser("create"), ResultValidator.validateResult , UserController.create);

//baixar imagem de usuário
router.post("/user/image", photoUpload.single("image"), UploaderMessage.message)

router.get("/user/:id", UserController.read);
router.get("/users", UserController.readAll);

router.put("/user/:id", UserValidator.validateUser("update"), ResultValidator.validateResult, UserController.update);

router.delete("/user/:id", UserController.delete);
//router.delete("/user", UserController.deleteAll); //usado durante desenvolvimento, a função existe


//PRODUCT
router.post("/user/:userId/product", ProductValidator.validateProduct("create"), ResultValidator.validateResult, ProductController.create);

//baixar imagem de produto
router.post("/product/image", photoUpload.single("image"), UploaderMessage.message)

router.get("/product/:id", ProductController.read);
router.get("/user/:id/products", ProductController.readAllFromUser);
router.get("/products", ProductController.readAll);

router.put("/product/:id", ProductValidator.validateProduct("update"), ResultValidator.validateResult, ProductController.update);

router.delete("/product/:id", ProductController.delete);

//
//POST, GET, PUT, DELETE

export default router;

