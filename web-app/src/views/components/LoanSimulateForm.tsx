import { AxiosResponse } from "axios";
import React, { ChangeEvent, useState } from "react";
import Button from "../../components/shared/Button";
import { ApiService } from "../../services";
import './styles/LoanSimulateForm.css';

function LoanSimulateForm (props: any){
    const {setLoanData} = props;
    const [buttonState, setButtonState] = useState<boolean>(true);
    const [minMonthLoan, setminMonthLoan] = useState<string>('0');

    const formSimulateOnSubmit = async (event: any) =>{
        event.preventDefault();
        const elements = event.target;

        const loan_value:number = Number.parseFloat(elements.loan_value.value);
        const month_parcel_value:number = Number.parseFloat(elements.month_parcel_value.value);

        setButtonState(false);
        let response: AxiosResponse = await ApiService.loan.simulatePost({
            cpf: elements.cpf.value,
            estate: elements.estate.value.toUpperCase(),
            birthday: elements.birthday.value,
            loan_value: loan_value,
            month_parcel_value: month_parcel_value,
        });

        setButtonState(true);

        if(response.status === 200){
            setLoanData(response.data);
            alert("Simulação feita! veja os resultados");
        }
        else{
            alert("Erro, Código " + response.status);
        }
    }

    return <form
            className="loan-form"
            onSubmit={formSimulateOnSubmit}
            >
            <input 
                type="text"
                name="cpf"
                className="form-input" 
                placeholder="CPF" 
                required/>
            <select
                className="form-input mt-2" 
                placeholder="Estado"
                name="estate" 
                required>
                <option value="">UF</option>
                <option value="MG">Minas Gerais</option>
                <option value="SP">São Paulo</option>
                <option value="RJ">Rio de Janeiro</option>
                <option value="ES">Espiríto Santo</option>
            </select>

            <input 
                name="birthday"
                type="text" 
                className="form-input mt-2" 
                placeholder="Data de Nascimento" 
                required/>

            <input 
                name="loan_value"
                type="number" 
                className="form-input mt-2" 
                placeholder="Valor do empréstimo"
                min="50000"
                onChange={(event: ChangeEvent<HTMLInputElement>)=>{
                    const min: number =  Number.parseFloat(event.target.value) * 0.01;
                    setminMonthLoan(min.toFixed(0));
                }}
                required/>

            <input
                name="month_parcel_value"
                type="number" 
                className="form-input mt-2" 
                placeholder="Qual valor deseja pagar por mês?" 
                min={minMonthLoan}
                required/>

            <Button disabled={!buttonState} className="mt-2" type="submit" >
                Simular
            </Button>
        </form>;

}


export default LoanSimulateForm;