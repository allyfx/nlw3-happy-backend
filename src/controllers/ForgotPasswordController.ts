import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import EtherealMailProvider from '../providers/MailProvider/implementations/EtherealMailProvider';

import User from '../models/User';

const mailProvider = new EtherealMailProvider();

export default {
    async create(request: Request, response: Response): Promise<Response> {
        const { email } = request.body;
        
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({ where: { email } });

        if (!user) {
            return response.status(404).json({ message: "User does not exists." });
        }

        await mailProvider.sendMail({
            to: {
                name: user.name,
                email: user.email,
            },
            subject: '[Happy]Recuperação de senha',
            link: `${process.env.APP_WEB_URL}/reset-password?token=`
        });

        return response.status(204).json();
    }
}