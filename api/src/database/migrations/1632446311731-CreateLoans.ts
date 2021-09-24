import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateLoans1632446311731 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "loans",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        isPrimary: true
                    },
                    {
                        name: "estate",
                        type: "varchar"
                    },
                    {
                        name: "cpf",
                        type: "varchar"
                    },
                    {
                        name: "birthday",
                        type: "varchar"
                    },
                    {
                        name: "loan_value",
                        type: "double"
                    },
                    {
                        name: "month_parcel_value",
                        type: "double"
                    },
                    {
                        name: "month_fee",
                        type: "double",
                    },
                    {
                        name: "total_to_pay",
                        type: "double"
                    },
                    {
                        name: "total_fees",
                        type: "double"
                    },
                    {
                        name: "parcels_count",
                        type: "double",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("loans");
    }

}
