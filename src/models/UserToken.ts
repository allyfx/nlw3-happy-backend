import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    Generated,
    CreateDateColumn,
    UpdateDateColumn
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

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default UserToken;