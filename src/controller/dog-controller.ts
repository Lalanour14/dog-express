import { Router } from "express";
import { dogRepository } from "../repository/dog-repositpory";
import Joi from "joi";

export const dogController = Router();

const dogValidation =  Joi.object({
    name:Joi.string().required(),
    breed :Joi.string().required(),
    birthdate:Joi.string().required()

})


dogController.get('/', async (req,res) => {
    const persons = await dogRepository.findAll();
    res.json(persons);
});

dogController.post('/', async (req,res) => {
    const validation = dogValidation.validate(req.body, {abortEarly:false});
    if(validation.error) {
        res.status(400).json(validation.error);
        return;
    }
    const dog = await dogRepository.persist(req.body);
    res.status(201).json(dog);
});