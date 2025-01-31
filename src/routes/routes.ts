import { Router } from "express";

//import controllers

import UserController from "../controllers/UserController";
import ProductController from "../controllers/ProductController";

//

const router = Router(); //Router is a factory function, that's why no "new" before Router()

//including URL paths in router

//POST, GET, PUT, DELETE

//USER
router.post("/user", UserController.create);

router.get("/user/:id", UserController.read);
router.get("/users", UserController.readAll);

router.put("/user/:id", UserController.update);

router.delete("/user/:id", UserController.delete);
//router.delete("/user", UserController.deleteAll); //used while coding


//

export default router;

