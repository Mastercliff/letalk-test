import { BaseEntity, Column, CreateDateColumn, Entity, Generated, PrimaryColumn } from "typeorm";


@Entity("loans")
class Loan {
    @PrimaryColumn()
    @Generated('uuid')
    readonly id: string;

    @Column()
    estate: string;

    @Column()
    cpf: string;

    @Column()
    birthday: string;

    @Column()
    loan_value: number;

    @Column()
    month_parcel_value: number;

    @Column()
    month_fee: number;

    @Column()
    total_to_pay: number;

    @Column()
    total_fees: number;

    @Column()
    parcels_count: number;

    @CreateDateColumn()
    created_at: Date;

}


export { Loan };