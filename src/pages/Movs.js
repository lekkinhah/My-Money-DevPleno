import React, {useState} from 'react'
import Rest from '../utils/rest'



const baseURL = 'https://mymoney-lkk.firebaseio.com/';
const {useGet, usePost, useDelete, usePatch} = Rest(baseURL);



const Movs = ({match}) => {
  const data = useGet(`movimentacoes/${match.params.data}`);
  const dataMonth = useGet(`meses/${match.params.data}`);
  const [dataPatch, patch] = usePatch();
  const [postData, save] = usePost(`movimentacoes/${match.params.data}`);
  const [removeData, remove] = useDelete();
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState(0.0);

  const onChangeDescription = evt => {
    setDescricao(evt.target.value);
  }

  const onChangeValor = evt => {
    setValor(evt.target.value);
  }

  const sleep = time => new Promise(resolve => setTimeout(resolve, time));
  
  const saveMoviment = async() => {
    console.log("botao", valor);
    if(!isNaN(valor)){
      console.log("no if");
      await save({
          descricao,
          valor:parseFloat(valor)
        })
        setDescricao('');
        setValor(0);
        data.refetch();
        await sleep(5000);
        dataMonth.refetch();
    }
  }

  

  const revomeMoviment = async(id) => {
    await remove(`movimentacoes/${match.params.data}/${id}`);
    data.refetch();
    await sleep(5000);
    dataMonth.refetch();
  }

  const updatePrevEnt = (evt) => {
    patch(`meses/${match.params.data}`, {previsao_ent: evt.target.value})
  }

  const updatePrevSai = (evt) => {
    patch(`meses/${match.params.data}`, {previsao_sai: evt.target.value})
  }


  return (
      <div className='container'>
        <h1>Movimentações</h1>
        {
          !dataMonth.loading && dataMonth.data && <div>
          Previsão de entrada: {dataMonth.data.previsao_ent} <input type='text' onBlur={updatePrevEnt}/>/ Previsão saida: {dataMonth.data.previsao_sai}<input type='text' onBlur={updatePrevSai}/> <br/>
          Entrada: {dataMonth.data.entrada} / Saída: {dataMonth.data.saida}
          </div>
        }
        <table className='table'>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {
              data.data &&
              Object
              .keys(data.data)
              .map(movimentacao => {
                return (
                  <tr key={movimentacao}>
                    <td>{data.data[movimentacao].descricao}</td>
                    <td>{data.data[movimentacao].valor}
                        <button className='btn btn-danger' onClick={() => revomeMoviment(movimentacao)} > - </button>
                    </td>
                  </tr>
                )
              })
            }
            <tr>
              <td><input type='text' value={descricao} onChange={onChangeDescription} /></td>
              <td> 
                  <input type='text' value={valor} onChange={onChangeValor}/> 
                  <button className='btn  btn-success' onClick={saveMoviment}>+</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
}

  export default Movs;