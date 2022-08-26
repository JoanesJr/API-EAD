import { body } from "express-validator";

export const ClassRoomValidator = () => {
    return [
        body("title")
            .isString()
            .withMessage("O titulo é obrigatório")
            .isLength({min: 5})
            .withMessage("O titulo deve conter no minimo 5 caracteres."),
        body("description")
            .isString()
            .withMessage("A Descrição é obrigatória.")
            .isLength({min: 15})
            .withMessage("A Descrição deve conter no minimo 15 caracteres.")
    ];
}
