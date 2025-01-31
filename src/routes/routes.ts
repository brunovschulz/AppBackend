import { Router } from "express";

//importando controllers

import UserController from "../controllers/UserController";
import ProductController from "../controllers/ProductController";

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
router.post("/user", UserController.create);

router.get("/user/:id", UserController.read);
router.get("/users", UserController.readAll);

router.put("/user/:id", UserController.update);

router.delete("/user/:id", UserController.delete);
//router.delete("/user", UserController.deleteAll); //usado durante desenvolvimento, a função existe


//PRODUCT
router.post("/user/:userId/product", ProductController.create);

router.get("/product/:id", ProductController.read);
router.get("/user/:id/products", ProductController.readAllFromUser);
router.get("/products", ProductController.readAll);

router.put("/product/:id", ProductController.update);

router.delete("/product/:id", ProductController.delete);

//
//POST, GET, PUT, DELETE

export default router;

