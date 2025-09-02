import Joi from 'joi'
import {IBook} from '../models/book.model'

export interface ValidateResult {
    valid: boolean
    errors: {field: string, message: string}[]
}


const bookSchema = Joi.object({
    // trim() quita todos los espacios al inicio y al final, para asegurar que no se mande una cadena solo con espacios
    title: 
        Joi.string()
        .required()
        .trim()
        .min(3)
        .max(200)
        .messages({
            'string.empty': 'El titulo del libro no puede estar vacio',
            'string.min': 'El título del libro tiene que tener al menos tres caracteres',
            'string.max': 'El título del libro no puede tener mas de 200 caracteres',
            'any.required': 'El título del libro es obligatorio'
        }),
    author: 
        Joi.string()
        .required()
        .trim()
        .min(3)
        .max(200)
        .messages({
            'string.empty': 'El autor del libro no puede estar vacio',
            'string.min': 'El autor del libro tiene que tener al menos tres caracteres',
            'string.max': 'El autor del libro no puede tener mas de 200 caracteres',
            'any.required': 'El autor del libro es obligatorio'
        }),
    status: 
        Joi.string()
        .required()
        .valid("Pending", "In Progress", "Completed")
        .messages({
           'any.only':  'El estado debe ser "Pending", "In Progress", "Completed"'
        }),
    currentPage: 
        Joi.number()
        .min(0)
        .max(Joi.ref('totalPages'))
        .messages({
            'number.min': 'La página actual tiene que ser al menos 0',
            'number.max': 'La página actual no puede ser mayor que el total de páginas'
        })
        ,
    totalPages: 
        Joi.number()
        .required()
        .min(1)
        .messages({
         'number.min': 'El numero de página totales debe ser al menos 1',   
         'any.required': 'El numero de página totales es obligatorio',   
        }),
        
    startReading:
        Joi.date()
        .messages({
            'date.base': 'La fecha de inicio de lectura no es válida'
        })
        ,
    endReading:
        Joi.date()
        .messages({
            'date.base': 'La fecha de fin de lectura no es válida'
        })
        




})

export const validateNweBook = (payload: Partial<IBook>): ValidateResult => {

    const {error} = bookSchema.validate(payload, { abortEarly: false })

    if (!error) {
        return {valid: true, errors: []}
    }

    const errors = error.details.map((detail) => ({

        field: detail.context?.key || "uknown",
        message: detail.message

    }))

    return {valid: false, errors}
 

}


    // title: string;
    // author: string;
    // status: string;
    // currentPage: number;
    // totalPages: number;
    // startReading: Date;
    // endReading: Date;