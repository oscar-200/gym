import styled from 'styled-components';

const OptionsContainer = styled.div`
    &&&{
    padding-top: 20px;
    padding-left: 10px;
    width: 100%;
    height: 500px;
    text-align: left;
    }
`;

const OptionMenu = styled.span`
    cursor: pointer;
    fontSize: 300px;
    padding: 10px;
    font-size: 25px;
    text-decoration: underline;
`;



export { OptionsContainer, OptionMenu };