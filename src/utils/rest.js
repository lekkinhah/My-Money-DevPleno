import {useEffect, useReducer} from 'react';
import axios from 'axios';

const initState = {
    loading: false,
    data: {}
  };


const reducer = (state, action) => {
    if(action.type === 'REQUEST'){
      return {
        ...state,
        loading:true
      }
    }
    if(action.type === 'SUCCESS'){
      return{
        ...state,
        loading:false,
        data: action.data
      }
    }
  return state; 
};



const init = baseURL => {

    const useGet = resource => {
        const [data, dispatch] = useReducer (reducer, initState);
        const loaded = async () => {
          dispatch({type:'REQUEST'})
          const res = await axios.get(baseURL + resource + '.json');
          dispatch({type:'SUCCESS', data: res.data});
        }
        useEffect(()=> {
          loaded()
        }, [resource]);
        return {
          ...data,
          refetch: loaded
        }
      }

      const usePost = resource => {
        const [data, dispatch] = useReducer (reducer, initState);
    
        const post = async(data) => {
            dispatch({type:'REQUEST'})
            const res = await axios.post(baseURL + resource + '.json',data)
            dispatch({
              type: 'SUCCESS',
              data: res.data
            })
         }
         return[data, post]
    }
    
    const useDelete = () => {
        const [data, dispatch] = useReducer (reducer, initState);
        const remove = async(resource) => {
            dispatch({type:'REQUEST'})
            await axios
              .delete(baseURL+resource+ '.json')
                  dispatch({
                      type: 'SUCCESS'
                  })
         }
         return[data, remove]
    }

    const usePatch = () => {
      const [data, dispatch] = useReducer (reducer, initState);
      const patch = async(resource, data) => {
          dispatch({type:'REQUEST'})
          await axios
            .patch(baseURL+resource+ '.json', data)
                dispatch({
                    type: 'SUCCESS'
                })
        }
        return[data, patch]
    }

    return {
        useGet,
        usePost,
        useDelete,
        usePatch
    }
}


  export default init