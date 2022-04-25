import React from "react";
import { TittleInput, InputItem, Input, MessageError } from './Forms';

const ComponentInputTime = ({ state, setState, titulo, type, id, messageError, expresionReg, max, min}) => {
    const onChange = (e) =>{
        setState({...state, campo: e.target.value});
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
                max={max}
                min={min}
            />

            <MessageError valido={state.valido} >{messageError}</MessageError>
        </InputItem>
    );
}

export default ComponentInputTime;