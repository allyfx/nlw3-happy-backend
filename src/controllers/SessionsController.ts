import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import users_view from '../views/users_view';

import authConfig from '../config/authConfig';

import User from '../models/User';

export default {
    async create(request: Request, response: Response) {
        const { email, password } = request.body;

        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({ where: { email } });

        if (!user) {
            throw new Error('Email/Password does not match');
        }

        const passwordConfirm = await compare(password, user.password);

        if (!passwordConfirm) {
            throw new Error('Email/Password does not match');
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn,
        });

        const userFormatted = users_view.render(user);

        return response.status(200).json({ user: userFormatted, token });
    }
}