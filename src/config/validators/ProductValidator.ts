import { body, ValidationChain } from "express-validator"

export class ProductValidator{

    public static validateProduct(crudMethod: string){

        switch(crudMethod){

            case "create":
                
                return [

                    //.escape() substituir alguns caracteres especiais (mais seguro)
                    //exists(): garante que a chave tenha que existir (mesmo vazia)
                    //notEmpty(): garante que a chave tem valor, utilizado após limpeza de espaços inutilizados (trim())
                    
                    body('name').exists().withMessage("Your product has to have name!")
                    .trim().notEmpty().withMessage("Your product has to have name!")
                    .isLength({min:3, max: 63}).withMessage("At least 3 and max 63 characters")
                    .escape(),

                    body('imageURL').optional().trim().notEmpty()
                    .isURL().withMessage("Must be an URL"),

                    body('description').optional().trim().notEmpty()
                    .isLength({max:200}).withMessage("Description can't have more than 200 characters")
                    .escape(),

                    //.matches(/^\d+(\.\d{1,2})?$/) garante 2 casas decimais
                    body('price').exists().withMessage("Price must be specified")
                    .isFloat({min:0.01}).matches(/^\d+(\.\d{1,2})?$/),

                    body('amount').exists().withMessage("Amount must be specified")
                    .isInt({min:0, max: 100}).withMessage("Must be Positive value until 100"),
                ];

            case "update":

                return[

                    //Em update, vamos deixar tudo opcional, para que possamos mudar apenas um atributo!
                    //O problema é que, a princípio, podemos "atualizar nenhum campo"

                    body('name').optional()
                    .trim().notEmpty().withMessage("Your product has to have name!")
                    .isLength({min:3, max: 63}).withMessage("At least 3 and max 63 characters")
                    .escape(),

                    body('imageURL').optional().trim().notEmpty()
                    .isURL().withMessage("Must be an URL"),

                    body('description').optional().trim().notEmpty()
                    .isLength({max:200}).withMessage("Description can't have more than 200 characters")
                    .escape(),

                    //.matches(/^\d+(\.\d{1,2})?$/) garante 2 casas decimais
                    body('price').optional().isFloat({min:0.01}).matches(/^\d+(\.\d{1,2})?$/),

                    body('amount').optional()
                    .isInt({min:0, max: 100}).withMessage("Must be Positive value until 100"),
                ]
            
            default:
                console.log("Wrong CRUD method name!");
                return [];
        }
    }

}