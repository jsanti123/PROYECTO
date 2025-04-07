import { Schema, checkSchema} from 'express-validator';

const categorySchema: Schema = {
    name: {
        in: ['body'],
        exists: {
            errorMessage: 'El campo es requerido',
            bail: true,
        },
        notEmpty: {
            errorMessage: 'El campo no puede estar vacío',
            bail: true,
        },
        isString: {
            errorMessage: 'El campo debe ser una cadena de texto',
            bail: true,
        },
        isLength: {
            options: { min: 3, max: 255 },
            errorMessage: 'El campo debe tener entre 3 y 255 caracteres',
            bail: true,
        },
        trim: true,
        escape: true,
        matches: {
            options: /^[A-Za-zÁ-ÿ0-9\s\-.,()]+$/u,
            errorMessage: 'El campo solo puede contener letras, números y algunos caracteres especiales como -.,()',
            bail: true,
        },
    },
    description: {
        in: ['body'],
        optional: true,
        custom: {
            options: (value) => {
                return typeof value === 'string' || value === null;
            },
            errorMessage: 'El campo debe ser una cadena de texto o nulo',
            bail: true,
        },
        isLength: {
            options: { min: 0, max: 255 },
            errorMessage: 'El campo debe tener entre 0 y 255 caracteres',
            bail: true,
        },
        trim: true,
        escape: true,
    }
};

export const validationsCategory = checkSchema(categorySchema);