import styled from 'styled-components'

const MenuContainer = styled.div`
    width:100%;
    display: flex;
    padding: 10px;
    flex-wrap: wrap;
    justify-content: center;
    background: black;
    align-items: center;
`;

const MenuItem = styled.div`
    display: grid;
    grid-template-columns: 20% 70%;
    width: 250px;

    background: rgb(0,0,0);
    background: linear-gradient(90deg, rgba(0,0,0,1) 7%, rgba(29,2,2,1) 47%, rgba(38,3,3,1) 100%);
    margin: 25px;
    border: 2px solid transparent;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.4s;
    &:hover {
        border: 2px solid white;
    }
`;

const Icon = styled.div`
`;

const Tittle = styled.p`
    color: white;
    font-size: 20px;
`;



export { MenuContainer, MenuItem, Icon, Tittle };