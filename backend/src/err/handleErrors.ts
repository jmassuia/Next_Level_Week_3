import { ErrorRequestHandler } from 'express';
import {ValidationError} from 'yup';

//* defining the a model for ValidationErrors with is defined by object strings
interface ValidationErrors{
    [key: string]:string[]
}

const errorHandler: ErrorRequestHandler = (error,request,response, next)=>{

    if(error instanceof ValidationError){
        let errors: ValidationErrors = {};

        error.inner.forEach(err =>{
            errors[err.path] = err.errors
        });

        return response.status(400).json({message: 'Validation failed!'});
    }


    console.log(error);


    return response.status(500).json({message:'Internal server error.'});
}

export default errorHandler;