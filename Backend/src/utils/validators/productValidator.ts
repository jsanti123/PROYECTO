import { Schema, checkSchema, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import ResponseModel from '../share/responseModel';

// Definir el esquema de validación
const productSchema: Schema = {
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
    },
    category_id: {
        in: ['body'],
        exists: {
            errorMessage: 'El campoes requerido',
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
        matches: {
            options: /^C\d{4}$/,
            errorMessage: 'El campo debe seguir el formato CXXXX',
            bail: true,
        },
        trim: true,
        escape: true, 
    },
    supplier_id: {
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
        matches: {
            options: /^P\d{4}$/,
            errorMessage: 'El campo debe seguir el formato PXXXX',
            bail: true,
        },
        trim: true,
        escape: true, 
    },
    price: {
        in: ['body'],
        exists: {
            errorMessage: 'El campo es requerido',
            bail: true,
        },
        notEmpty: {
            errorMessage: 'El campo no puede estar vacío',
            bail: true,
        },
        custom: {
            options: (value) => {
                if (typeof value !== 'number') {
                    throw new Error('El valor debe ser de tipo número');
                }
                if (value <= 0) {
                    throw new Error('El valor debe ser mayor que cero');
                }
                const priceRegex = /^\d{1,8}(\.\d{1,2})?$/;
                const valueStr = value.toString();

                if (!priceRegex.test(valueStr)) {
                    throw new Error('El valor debe tener máximo 8 dígitos enteros y hasta 2 decimales');
                }
                return true;
            }
        },
    },
    stock: {
        in: ['body'],
        exists: {
            errorMessage: 'El campo es requerido',
            bail: true,
        },
        notEmpty: {
            errorMessage: 'El campo no puede estar vacío',
            bail: true,
        },
        custom: {
            options: (value) => {
                if (typeof value !== 'number') {
                    throw new Error('El campo debe ser de tipo número');
                }
                if (value < 0) {
                    throw new Error('El valor debe ser mayor o igual a cero');
                }
                const MAX_INT = 2147483647; // Valor máximo para un entero de 32 bits
                if (value > MAX_INT) {
                    throw new Error(`El valor no puede ser mayor a ${MAX_INT}`);
                }
                return true;
            },
            bail: true,
        },
        isInt: {
            options: { gt: 0 },
            errorMessage: 'El valor debe ser un número entero',
            bail: true,
        },
    }
};

export const validationProduct = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json(ResponseModel.errorResponse("Validation Error", errors.array() , 400, "VALIDATION_ERROR"));
        return;
    }
    next();
}   

// Middleware de validación usando `checkSchema`
export const validations = checkSchema(productSchema);
