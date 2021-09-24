import React from 'react';
import './styles/LoanSimulateTable.css';

let localData =  {
    "month_fees": 0,
    "total_fees": 0,
    "total_to_pay": 0,
    "parcels_count": 0,
    "required_value" : 0,
    "month_parcel_value": 0,
    "parcels": [
        {
            "debit_balance": 0,
            "fees": 0,
            "debit_balance_adjust": 0,
            "parcel_value": 0,
            "date": ""
        },
    ]
};

interface LoanSimulateTableProps {
    data?: any
}

function LoanSimulateTable(props: LoanSimulateTableProps){
    const { data } = props;

    if(data !== undefined){
        localData = data;
    }

    return <div>
        <div className="grid">
            <div>
                VALOR REQUERIDO:
                <h4>
                R$ {localData.required_value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                </h4>
            </div>

            <div className="ml-4">
                TAXA DE JUROS: 
                <h4>
                {localData.month_fees}% AO MÊS
                </h4>
            </div>

            <div className="ml-4">
                VALOR DA PARCELA:
                <h4>
                R$ {localData.month_parcel_value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                </h4>
            </div>

            <div>
                TOTAL DE MESES PRA QUITAR:
                <h4>
                {localData.parcels_count} MESES
                </h4>
            </div>

            <div className="ml-4">
                TOAL DE JUROS:
                <h4>
                R$ {localData.total_fees.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                </h4>
            </div>

            <div className="ml-4">
                TOTAL A PAGAR:
                <h4>
                R$ {localData.total_to_pay.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                </h4>
            </div>
        </div>

        <p className="mt-4 flex-row">
            PROJEÇÃO DOS VALORES:
        </p>
        <table className="loan-simulate-table">
        <thead>
           <tr>
            <th>SALDO DEVEDOR</th>
            <th>JUROS</th>
            <th>SALDO DEVEDOR AJUSTADO</th>
            <th>VALOR DA PARCELA</th>
            <th>VENCIMENTO</th>
           </tr>
        </thead>
        <tbody>
          {localData.parcels.map((item, index) => {
            return <tr key={index}>
              <td>
               R$ {item.debit_balance.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
              </td>
              <td>
              R$ {item.fees.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
              </td>
              <td>
              R$ {item.debit_balance_adjust.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
              </td>
              <td>
              R$ {item.parcel_value.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
              </td>
              <td>
              {item.date.split('T')[0].split('-')[2]}/{item.date.split('T')[0].split('-')[1]}/{item.date.split('T')[0].split('-')[0]}
              </td>
            </tr>;
          })}
        </tbody>
    </table>
    </div>;
}

export default LoanSimulateTable;