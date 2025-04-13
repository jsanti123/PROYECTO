import { Schema, checkSchema} from 'express-validator';
import { nameField, descriptionField, validationsId } from './generalValidations';

const categoryCreateSchema: Schema = {
    name: nameField,
    description: descriptionField,
};
const categoryUpdateSchema: Schema = {
    name: nameField,
    description: descriptionField,
};
const categoryValidateIdSchema: Schema = {
    id: validationsId('C'),
};

export const validationsCreateCategory = checkSchema(categoryCreateSchema);
export const validationsUpdateCategory = checkSchema(categoryUpdateSchema);
export const validationsCategoryId = checkSchema(categoryValidateIdSchema);