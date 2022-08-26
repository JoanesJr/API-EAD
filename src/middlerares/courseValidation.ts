import { body } from "express-validator";

export const CourseValidator = () => {
    return [
        body("name")
            .isString()
            .isLength({min: 5})
            .withMessage("O nome deve conter no minimo 5 caracteres."),
        body("description")
            .isString()
            .isLength({min: 10})
            .withMessage("A Descrição deve conter no minimo 15 caracteres."),
        body("filename")
            .isString()
            .withMessage("O arquivo é obrigatório")
    ];
}

export const UpdateCourseValidator = () => {
    return [
        body("name")
            .isString()
            .isLength({min: 5})
            .withMessage("O nome deve conter no minimo 5 caracteres."),
        body("description")
            .isString()
            .isLength({min: 10})
            .withMessage("A Descrição deve conter no minimo 15 caracteres.")
    ];
}