import { getRepository, Repository } from 'typeorm';

import UserTokensRepositoryInterface from './models/UserTokensRepositoryInterface';

import UserToken from '../models/UserToken';

class UserTokensRepository implements UserTokensRepositoryInterface {
    private ormRepository: Repository<UserToken>;

    constructor() {
        this.ormRepository = getRepository(UserToken);
    }

    public async findByToken(token: string): Promise<UserToken | undefined> {
        const userToken = this.ormRepository.findOne({ where: { token } });

        return userToken;
    }

    public async generate(user_id: string): Promise<UserToken> {
        const userToken = this.ormRepository.create({
            user_id,
        });

        await this.ormRepository.save(userToken);

        return userToken;
    }
}

export default UserTokensRepository;