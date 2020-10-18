import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    Generated
} from 'typeorm';

@Entity('user_tokens')
class UserToken {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @Generated()
    token: string;

    @Column()
    user_id: string;
}

export default UserToken;