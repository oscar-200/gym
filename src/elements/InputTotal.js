import React from "react";
import { TittleInput, InputItem, Input, MessageError } from './Forms';

const ComponentInputTotal = ({ state, setState, titulo, type, id, messageError, expresionReg, total, setTotal, costo}) => {
    const onChange = (e) =>{
        setState({...state, campo: e.target.value});
        if(expresionReg.test(e.target.value) && e.target.value !== ''){
            setTotal(''+(parseInt(costo) * parseInt(e.target.value)));
        }
        else{
            setTotal('0')
        }
    }

    const validation = () => {
        if(expresionReg){
            if(expresionReg.test(state.campo)){
                setState({...state, valido: 'true'})
            }
            else{
                setState({...state, valido: 'false'})
            }
                
        }
    }

    return (
        <InputItem>
            <TittleInput>{titulo}:</TittleInput>
            <Input
                name={id}
                type={type}
                id={id}
                placeholder=""
                value={state.campo}
                onChange={onChange}
                onKeyUp={validation}
                onBlur={validation}
                valido={state.valido}
                required
            />

            <MessageError valido={state.valido} >{messageError}</MessageError>
        </InputItem>
    );
}

export default ComponentInputTotal;