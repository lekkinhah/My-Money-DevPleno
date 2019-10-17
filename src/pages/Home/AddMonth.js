import React, {useState, useRef} from 'react';
import {Redirect} from 'react-router-dom';

const minYear = 2019;
const maxYear = 2024;

const AddMonth = () => {
    const refYear = useRef();
    const refMonth = useRef();
    const [redir, setRedir] = useState('');
    const years = [];
    const months = [];
    for(let i = minYear; i<= maxYear; i++) {
        years.push(i)
    }
    for(let i = 1; i<= 12; i++) {
        months.push(i)
    }

    const zeroPad = num => {
        if (num < 10){
            return '0'+num;
        }
        return num
    }
    const seeMonth = () => {
       setRedir('movimentacoes/'+ refYear.current.value + '-' + refMonth.current.value)
    }

    if(redir != ''){
        return <Redirect to={redir} />;
    }

    return (
       <>
            <h2>Adicionar Mês </h2>
            <select ref={refYear}>
                {years.map(year => <option key={year} value={year}>{year}</option>)} 
            </select>

            <select ref={refMonth}>
                {months.map(zeroPad).map(month => <option key={month} value={month}>{month}</option>)} 
            </select>
            <button onClick={seeMonth}>Adicionar mês</button>
        </>
    );
}

export default AddMonth;
