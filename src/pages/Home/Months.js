import React from 'react';
import Rest from '../../utils/rest'
import { Link } from 'react-router-dom';

const baseURL = 'https://mymoney-lkk.firebaseio.com/';

const {useGet} = Rest(baseURL);

const Months = () => {
    const data = useGet('meses');
    if (data.loading) {
        return <span>Carregando ...</span>
    }
    if (Object.keys(data.data).length > 0) {
        return (
            <table className='table'>
            <thead>
                <tr>
                <th>Mês</th>
                <th>Previsão Entrada</th>
                <th>Entrada</th>
                <th>Previsão Saída</th>
                <th>Saída</th>
                </tr>
            </thead>
            <tbody>
                {
                Object
                    .keys(data.data)
                    .map(mes => {
                    return(
                        <tr key={mes}>
                        <td><Link to={`/movimentacoes/${mes}`}>{mes}</Link></td>
                        <td>{data.data[mes].previsao_ent}</td>
                        <td>{data.data[mes].entrada}</td>
                        <td>{data.data[mes].previsao_sai}</td>
                        <td>{data.data[mes].saida}</td>
                        </tr>
                    )
                    })
                }
            </tbody>
            </table>
        )
    }
    return null;
}

export default Months;