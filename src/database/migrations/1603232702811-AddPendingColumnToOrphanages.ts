import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export default class AddPendingColumnToOrphanages1603232702811 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('orphanages', new TableColumn({
            name: 'pending',
            type: "boolean",
            default: true,
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('orphanages', 'pending');
    }

}
