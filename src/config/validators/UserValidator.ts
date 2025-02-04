import {body, ValidationChain} from "express-validator";

export class UserValidator{

    public static validateUser(crudMethod: string){

        switch(crudMethod){

            case "create":
                
                return [

                    //.escape() substituir alguns caracteres especiais (mais seguro)
                    //exists(): garante que a chave tenha que existir (mesmo vazia)
                    //notEmpty(): garante que a chave tem valor, utilizado após limpeza de espaços inutilizados (trim())
                    
                    body('name').exists().withMessage("Your user has to have name!")
                    .trim().notEmpty().withMessage("Your user has to have name!")
                    .isLength({min:3, max: 63}).withMessage("At least 3 and max 63 characters")
                    .escape(),

                    body('email').exists().withMessage("Your user has to have email!")
                    .trim().notEmpty().withMessage("Your user has to have email!")
                    .isEmail().withMessage("It must be an email!"),

                    body('cpf').exists().withMessage("Your user has to have CPF!")
                    .trim().notEmpty().withMessage("Your user has to have CPF!")
                    .isLength({min:11, max:11}).isNumeric(),

                    body('telephone').exists().withMessage("Your user has to have telephone!")
                    .trim().notEmpty().withMessage("Your user has to have telephone!")
                    .isLength({min: 11, max: 13}).isNumeric(),

                    body('password').exists().withMessage("You must have a password!")
                    .trim().notEmpty().withMessage("You must have a password!")
                    .isLength({min:5, max: 30}),

                    body('imageURL').optional().trim().notEmpty()
                    .isURL().withMessage("Must be an URL"),
                ];

            case "update":

                return [

                    //Em update, vamos deixar tudo opcional, para que possamos mudar apenas um atributo!
                    //O problema é que, a princípio, podemos "atualizar nenhum campo"

                    body('name').optional()
                    .trim().notEmpty().withMessage("Your user has to have name!")
                    .isLength({min:3, max: 63}).withMessage("At least 3 and max 63 characters")
                    .escape(),

                    body('email').optional()
                    .trim().notEmpty().withMessage("Your user has to have email!")
                    .isEmail().withMessage("It must be an email!"),

                    body('cpf').optional()
                    .trim().notEmpty().withMessage("Your user has to have CPF!")
                    .isLength({min:11, max:11}).isNumeric(),

                    body('telephone').optional()
                    .trim().notEmpty().withMessage("Your user has to have telephone!")
                    .isLength({min: 11, max: 13}).isNumeric(),

                    body('password').optional()
                    .trim().notEmpty().withMessage("You must have a password!")
                    .isLength({min:5, max: 30}),

                    body('imageURL').optional().trim().notEmpty()
                    .isURL().withMessage("Must be an URL"),
                ];
            
            default:
                console.log("Wrong CRUD method name!");
                return [];
        }
    }

}