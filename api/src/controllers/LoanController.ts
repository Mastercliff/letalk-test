import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import { Loan } from '../models/Loan';

class LoanController {

    async index(request: Request, response: Response) {

        const loanRepository: Repository<Loan> = getRepository(Loan);

        const loans: Array<Loan> = await loanRepository.find();

        return response.status(200).json(loans);
    }

    async simulate(request: Request, response: Response) {
        const estates = {
            "MG" : 1,
            "SP" : 0.8,
            "RJ" : 0.9,
            "ES" : 1.11,
        };

        let { estate, cpf, birthday, loan_value, month_parcel_value } = request.body;

        
        try{
            const month_parcel_value_const = month_parcel_value
            const percent:number = estates[estate];
            const total_to_pay:number = loan_value;
            const required_value = loan_value;

            let parcels_count:number = 0; 
            let total_fees:number = 0;
            const date:Date =  new Date();
            let parcels:Array<any> = [];

            for(;1 < loan_value;){
                date.setMonth(date.getMonth() + 1);
                let fees:number = Number.parseFloat((loan_value * (percent/100)).toFixed(2));
                total_fees = Number.parseFloat((total_fees + fees).toFixed(2));

                if(loan_value < month_parcel_value){
                    month_parcel_value =  Number.parseFloat((loan_value + fees).toFixed(2));
                }

                parcels.push(
                    {
                        debit_balance : loan_value,
                        fees,
                        debit_balance_adjust : Number.parseFloat((loan_value + fees).toFixed(2)), 
                        parcel_value: month_parcel_value,
                        date: date.toISOString(),
                    }
                )

                if(loan_value > month_parcel_value){
                    loan_value =  Number.parseFloat(((loan_value - month_parcel_value) + fees).toFixed(2));
                }
                else{
                    loan_value = 0;
                }
                parcels_count++;
            }

            return response.status(200).json({
                cpf,
                birthday,
                estate,
                required_value,
                month_fees: percent,
                total_fees,
                total_to_pay : total_to_pay + total_fees,
                parcels_count,
                parcels,
                month_parcel_value: month_parcel_value_const
            });
            }

        catch(error){
            return response.status(417).json({
                message: 'Houve um erro',
                error,
            });
        }


        
        
    }

    async create(request: Request, response: Response) {
        const { 
                estate, 
                cpf, 
                birthday, 
                loan_value, 
                month_parcel_value,
                month_fee,
                total_fees,
                total_to_pay, 
                parcels_count } = request.body;
        

        const loanRepository: Repository<Loan> = getRepository(Loan);

        try{
            const loan: Loan = loanRepository.create({
                estate, 
                cpf, 
                birthday, 
                loan_value, 
                month_parcel_value, 
                month_fee,
                total_fees,
                total_to_pay,
                parcels_count,
            });
    
            await loanRepository.save(loan);

            return response.status(200).json({
                "message": "Empréstimo Cadastrado",
                "loan": loan
            });
        }
        catch(error){
            return response.status(417).json({
                "message": "Erro na solicitação",
                 error
            });
        }

        
    }
}

export { LoanController };