import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import orphanage_view from '../views/orphanages_view';
import * as Yup from 'yup';

import Orphanage from '../models/Orphanage';

export default {
    async index(request: Request, response: Response) {
        const orphanagesRepository = getRepository(Orphanage);

        const orphanage = await orphanagesRepository.find({
            where: { pending: true },
            relations: ['images']
        });

        if (!orphanage) {
            return response.status(400).json({ message: 'Orphanage does not exists.' });
        }

        return response.json(orphanage_view.renderMany(orphanage));
    },

    async create(request: Request, response: Response) {
        const { id } = request.params;
    
        const orphanagesRepository = getRepository(Orphanage);

        const orphanage = await orphanagesRepository.findOne(id, {
            relations: ['images']
        });

        if (!orphanage) {
            return response.status(400).json({ message: 'Orphanage does not exists.' });
        }

        orphanage.pending = false;
    
        await orphanagesRepository.save(orphanage);
    
        return response.status(201).json(orphanage_view.render(orphanage));
    }
}