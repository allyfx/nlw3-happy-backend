import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    Generated
} from 'typeorm';

@Entity('user_tokens')
class UserToken {
    @PrimaryGeneratedColumn('increment')
    id: string;

    @Column()
    @Generated('uuid')
    token: string;

    @Column()
    user_id: number;
}

export default UserToken;