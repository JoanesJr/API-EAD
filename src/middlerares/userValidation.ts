import { body } from "express-validator";

export const UserCreateValidator = () => {
    return [
        body("firstName")
            .isString()
            .withMessage("o nome é obrigatório")
            .isLength({min: 3})
            .withMessage("O nome deve conter no minimo 3 caracteres."),
        body("lastName")
            .isString()
            .withMessage("O sobrenome é obrigatório")
            .isLength({min: 3})
            .withMessage("O sobrenome deve conter no minimo 3 caracteres."),
        body("password")
            .isString()
            .withMessage("A senha é obrigatória")
            .isLength({min: 6})
            .withMessage("A senha deve conter no minímo 6 caracteres"),
        body("birth")
            .isDate()
            .withMessage("A data de nascimento é obrigatório"),
        body("email")
            .isEmail()
            .withMessage("E-mail inválido.")
    ];
}
