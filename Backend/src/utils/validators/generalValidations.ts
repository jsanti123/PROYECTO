import {Location} from 'express-validator';

export const nameField = {
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
    matches: {
      options: /^[A-Za-zÁ-ÿ0-9\s\-.,()]+$/u,
      errorMessage: 'El campo solo puede contener letras, números y algunos caracteres especiales como -.,()',
      bail: true,
    },
};

export const descriptionField = {
    in: ['body'] as Location[],
    optional: true,
    custom: {
      options: (value: any) => typeof value === 'string' || value === null,
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
};

export const validationsId = (prefix: string) => ({
  in: ['params'] as Location[],
  exists: { errorMessage: 'El campo es requerido', bail: true },
  notEmpty: { errorMessage: 'El campo no puede estar vacío', bail: true },
  matches: {
    options: new RegExp(`^${prefix}\\d{4}$`),
    errorMessage: `El campo debe seguir el formato ${prefix}XXXX`,
    bail: true,
  },
  trim: true,
  escape: true,
});