import { checkSchema, Location, Schema } from 'express-validator';
import { nameField } from "./generalValidations";

const locationField = {
    in: ['body'] as Location[],
    exists: { errorMessage: 'El campo es requerido', bail: true },
    notEmpty: { errorMessage: 'El campo no puede estar vacío', bail: true },
    isString: { errorMessage: 'El campo debe ser una cadena de texto', bail: true },
    isLength: {
        options: { min: 3, max: 255 },
        errorMessage: 'El campo debe tener entre 3 y 255 caracteres',
        bail: true,
    },
    trim: true,
    escape: true,
}

const validationsCreateSchema: Schema = {
    name: nameField,
    location: locationField,
}

export const validationsCreateWarehouse = checkSchema(validationsCreateSchema);