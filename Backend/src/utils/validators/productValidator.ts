import { Schema, checkSchema, Location} from 'express-validator';
import { nameField, descriptionField, validationsId } from './generalValidations';
  
const idField = (prefix: string) => ({
    in: ['body'] as Location[],
    exists: { errorMessage: 'El campo es requerido', bail: true },
    notEmpty: { errorMessage: 'El campo no puede estar vacío', bail: true },
    isString: { errorMessage: 'El campo debe ser una cadena de texto', bail: true },
    matches: {
      options: new RegExp(`^${prefix}\\d{4}$`),
      errorMessage: `El campo debe seguir el formato ${prefix}XXXX`,
      bail: true,
    },
    trim: true,
    escape: true,
});
  
const priceField = {
    in: ['body'] as Location[],
    exists: { errorMessage: 'El campo es requerido', bail: true },
    notEmpty: { errorMessage: 'El campo no puede estar vacío', bail: true },
    custom: {
      options: (value: any) => {
        if (typeof value !== 'number') throw new Error('El valor debe ser de tipo número');
        if (value <= 0) throw new Error('El valor debe ser mayor que cero');
        if (!/^\d{1,8}(\.\d{1,2})?$/.test(value.toString())) {
          throw new Error('El valor debe tener máximo 8 dígitos enteros y hasta 2 decimales');
        }
        return true;
      },
    },
};
  
const stockField = {
    in: ['body'] as Location[],
    exists: { errorMessage: 'El campo es requerido', bail: true },
    notEmpty: { errorMessage: 'El campo no puede estar vacío', bail: true },
    custom: {
      options: (value: any) => {
        if (typeof value !== 'number') throw new Error('El campo debe ser de tipo número');
        if (value < 0) throw new Error('El valor debe ser mayor o igual a cero');
        if (value > 2147483647) throw new Error('El valor no puede ser mayor a 2147483647');
        return true;
      },
      bail: true,
    },
    isInt: {
      options: { gt: 0 },
      errorMessage: 'El valor debe ser un número entero',
      bail: true,
    },
};

const productCreateSchema: Schema = {
    name: nameField,
    description: descriptionField,
    category_id: idField('C'),
    supplier_id: idField('P'),
    price: priceField,
    stock: stockField,
    warehouse_id: idField('A'),
};

const validationsUpdateSchema: Schema = {
    name: nameField,
    description: descriptionField,
    price: priceField,
    category_id: idField('C'),
    supplier_id: idField('P'),
}

const productValidateIdSchema: Schema = {
    id: validationsId('P')
}

export const validationsCreateProduct = checkSchema(productCreateSchema);
export const validationsUpdateProduct = checkSchema(validationsUpdateSchema);
export const validationsProductId = checkSchema(productValidateIdSchema);
