import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import { isAfter, addHours } from 'date-fns';

import UserTokens from '../models/UserToken';
import User from '../models/User';

export default {
    async create(request: Request, response: Response): Promise<Response> {
        const { token, password } = request.body;

        const usersRepository = getRepository(User);
        const userTokensRepository = getRepository(UserTokens);

        const userToken = await userTokensRepository.findOne({ where: { token } });

        if (!userToken) {
            return response.status(404).json({ message: "User token does not exists" });
        }

        const user = await usersRepository.findOne(userToken.user_id);

        if (!user) {
            return response.status(404).json({ message: "User does not exists" });
        }

        const compareDate = addHours(userToken.created_at, 2);

        if (isAfter(Date.now(), compareDate)) {
            return response.status(404).json({ message: "Token expired" });
        }

        user.password = await hash(password, 8);

        await usersRepository.save(user);

        return response.status(200).json();
    }
}