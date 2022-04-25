import styled, {css} from 'styled-components'

const Form = styled.form`
    padding-top: 20px;
    padding-bottom: 20px;
`;

const InputsContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 50% 50%;

    @media only screen and (max-width: 1100px){
            width: 100%;
            display: grid;
            grid-template-columns: 100%;
    }


`;

const TittleInput = styled.p`
    font-size: 20px;
    color: rgb(170, 170, 170);
    padding: 5px 20px 5px 35px;
    text-align: left;

    @media only screen and (max-width: 570px){
        font-size: 18px;
        padding: 5px 20px 5px 35px;
        text-align: left;
    }

`;

const InputItem = styled.div`
    min-height: 100px;

    @media only screen and (max-width: 1100px){
        min-height: 90px;
    }
    @media only screen and (max-width: 570px){
        height: auto;
    }
`;

const Input = styled.input`
    font-size: 20px;
    width: 80%;
    border: none;
    padding: 2px;
    background: #5c5c5ca1;
    color: white;
    border-radius: 5px;
    border: 1px solid rgb(150, 150, 150);

    &:focus{
        border-bottom: 2px solid rgb(109, 53, 0);

    }



    @media only screen and (max-width: 570px){
        font-size: 18px;
    }
`;




const Select = styled.select`
    font-size: 20px;
    width: 80%;
    border: none;
    padding: 2px;
    margin-bottom: 20px;
    background: #5c5c5ca1;
    color: white;
    border-radius: 5px;
    border: 1px solid rgb(83, 83, 83);

    &:focus{
        border: 2px solid rgb(109, 53, 0);
    }

    @media only screen and (max-width: 570px){
        font-size: 18px;
    }
`;

const Option = styled.option`
`;



const MessageError = styled.p`
    font-size: 15px;
    margin-button: 0;
    padding-top: 6px;
    color: rgb(240,142,142);
    display: none;
    width: 80%;
    margin: 0 auto;
    

    @media only screen and (max-width: 570px){
        font-size: 12px;
    }

    ${props => props.valido === 'false' && css`
        display: block;
    `}
    ${props => props.valido === 'true' && css`
        display: none;
    `}
`;

const Button = styled.button`
    margin-top: 20px;
    border: none;
    width: 150px;
    color: rgb(66, 66, 66);
    font-size: 20px;
    background-color: rgb(212, 154, 46);
    padding-top: 1vh;
    padding-bottom: 1vh;
    cursor: pointer;
`;

const MessageGood = styled.p`
    font-size: 15px;
    margin-button: 0;
    padding-top: 6px;
    color: rgb(11,166,116);
    display: none;
    width: 80%;
    margin: 0 auto;

    ${props => props.valido === 'true' && css`
        display: block;
    `}
`;

const MessageNoGood = styled.p`
    font-size: 15px;
    margin-button: 0;
    padding-top: 6px;
    color: rgb(255,235,218);
    display: none;
    width: 80%;
    margin: 0 auto;
    ${props => props.valido === 'false' && css`
        display: block;
    `}
`;

const ButtonCancel = styled.button`
    margin-top: 20px;
    border: none;
    width: 150px;
    color: White;
    font-size: 2vh;
    background-color: Red;
    padding-top: 1vh;
    padding-bottom: 1vh;
    cursor: pointer;
`;

const Tittle = styled.h1`
    font-size: 28px;
    padding-bottom: 10px;

    @media only screen and (max-width: 570px){
        font-size: 22px;
    }
`;

const TextArea = styled.textarea`
    font-size: 2.5vh;
    width: 80%;
    border: none;
    padding: 5px;
    background: #5c5c5ca1;
    color: white;
    border-radius: 5px;
    border: 1px solid rgb(83, 83, 83);
    resize: none;
    height: 150px;
`;

const ButtonClose = styled.button`
    margin-top: 20px;
    border: none;
    width: 150px;
    color: rgb(255, 255, 255);
    font-size: 20px;
    background-color: rgb(95, 32, 5);
    padding-top: 1vh;
    padding-bottom: 1vh;
    cursor: pointer;
    border-radius: 5px;
`;

export { Form, InputsContainer, TittleInput, InputItem, Input, Select, Option, MessageError, Button, MessageGood, MessageNoGood, ButtonCancel, Tittle, TextArea, ButtonClose};