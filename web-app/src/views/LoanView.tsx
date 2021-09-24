import { AxiosResponse } from 'axios';
import React, { useState } from 'react';
import Button from '../components/shared/Button';
import Card from '../components/shared/Card';
import '../styles/LoanView.css';
import LoanSimulateForm from './components/LoanSimulateForm';
import LoanSimulateTable from './components/LoanSimulateTable';
import { ApiService } from '../services';

import {MdArrowForward} from 'react-icons/md';

function LoanView(){
    const [loanData, setLoanData] = useState<any>(undefined);
    const [buttonState, setButtonState] = useState<boolean>(true);

    return <div className="loan-container">
        <p className="loan-title">Simule e solicite o seu empréstimo.</p>

        <h3> Preencha o formulário abaixo </h3>

        <Card >
            <LoanSimulateForm setLoanData={setLoanData} />
        </Card>

        <h3 className="mt-5 mb-3"> Veja a simulação para o seu empréstimo antes de efetivar </h3>

        <Card className="flex-column mt-2">
            <LoanSimulateTable data={loanData} />
            <Button
                disabled={loanData === undefined && buttonState === true}
                className="mt-4" color="submit"
                onClick={async () => {
                    setButtonState(false);
                    try {
                        let response: AxiosResponse = await ApiService.loan.post({
                            cpf: loanData.cpf,
                            estate: loanData.estate,
                            birthday: loanData.birthday,
                            loan_value: loanData.required_value,
                            month_parcel_value: loanData.month_parcel_value,
                            month_fee: loanData.month_fees,
                            total_to_pay: loanData.total_to_pay,
                            total_fees: loanData.total_fees,
                            parcels_count: loanData.parcels_count,
                        });

                        if(response.status === 200){
                            alert(response.data.message);
                            document.location.reload();
                        }
                        else{
                            alert('Houve um erro ' + response.status);
                        }
                        setButtonState(true);
                        
                    } catch (error) {
                        setButtonState(true);
                        alert('Houve um erro ' + error);
                    }
                }}
                >
                
                Efetivar empréstimo <MdArrowForward className="ml-1" style={{color: 'white', fontSize: '18px'}}/>
            </Button>
        </Card>
    </div>
}

export default LoanView;