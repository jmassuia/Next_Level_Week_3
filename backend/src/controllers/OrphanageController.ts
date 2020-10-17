import {Request, Response} from 'express';

import '../database/connection';

//* Rote validator
import * as yup from 'yup';

//* View that filters and return just valiable infor for API consumer
import orphanageView from '../views/orphanages_views';

//* This is based how typeorm works with database changes and methods
import {getRepository} from 'typeorm';

//* Model class*
import Orphanage from '../models/Orphanage';

export default{

    async index(req:Request,res:Response){
        const orphanagesRepository = getRepository(Orphanage);

        const orphanages = await  orphanagesRepository.find({
            relations:['images']
        });

        return res.json(orphanageView.renderMany(orphanages));
    },
    async create(req:Request,res:Response){
        const {
            name, 
            latitude, 
            longitude, 
            instructions, about, opening_hours, open_on_weekends}  = req.body;
        
        const requestImages = req.files as Express.Multer.File[];
        const images = requestImages.map(images =>{
            return {path:images.filename}
        });
        
        const orphanagesRepository = getRepository(Orphanage);
    
        const data ={
            name,
            latitude, 
            longitude, 
            instructions, 
            about, 
            opening_hours, 
            open_on_weekends,
            images
        }
    
        const schema = yup.object().shape({
            name:yup.string().required(),
            latitude: yup.number().required(), 
            longitude: yup.number().required(), 
            instructions: yup.string().required(), 
            about: yup.string().required().max(300), 
            opening_hours: yup.string().required(), 
            open_on_weekends: yup.boolean().required(),
            images: yup.array(yup.object().shape({
                path:yup.string().required()
            }))
        })

        await schema.validate(data,{
            abortEarly:false
        })

        const orphanage = await orphanagesRepository.create(data);

        orphanagesRepository.save(orphanage);
    
        return res.json({orphanage});
    },
    async show(req:Request, res:Response){
        const  id  = req.params;

        const orphanagesRepository = getRepository(Orphanage);
        
        const orphanage = await orphanagesRepository.findOneOrFail(id,{
            relations:['images']
        });

        return res.json(orphanageView.render(orphanage));
    },
    async delete(req:Request, res:Response){
        const id = req.params;

        const orphanagesRepository = getRepository(Orphanage);

        const orphanageOut = orphanagesRepository.findOne({
            where:{
                id:id
            }
        }).then((message)=>{
            console.log(message);
        }).catch((error)=>{
            console.log(error);
        })

        return res.json({orphanageOut})
    }
}