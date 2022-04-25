import React from 'react'
import { MenuContainer, MenuItem, Icon, Tittle } from './../../elements/Menu'
import Person from '@material-ui/icons/AccountCircle';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import Assignment from '@material-ui/icons/Assignment';
import Class from '@material-ui/icons/Class';
import PostAdd from '@material-ui/icons/PostAdd';
import AssignmentTurnedIn from '@material-ui/icons/FormatAlignLeft';
import PersonAddSharp from '@material-ui/icons/PersonAddSharp';
import RecentActors from '@material-ui/icons/RecentActors';
import FolderShared from '@material-ui/icons/FolderShared';
import PeopleOutline from '@material-ui/icons/PeopleOutline';
import Toc from '@material-ui/icons/Toc';
import LibraryAdd from '@material-ui/icons/LibraryAdd';

import './../../css/Menu.css';

export default function MenuManager({ setOper, loadData }) {

    const id_gerente = () => {
        const auth = JSON.parse(localStorage.getItem('auth'))
        const vec = auth.split("-");
        const id = vec[1];
        return id;
    }
    return (
        <MenuContainer>
            <MenuItem onClick={()=>loadData(id_gerente())}>
                <Icon>
                    <Person style={{ color: "white", fontSize: "50px" }} />
                </Icon>
                <Tittle>
                    Informacion personal
                </Tittle>
            </MenuItem>

            <MenuItem onClick={() => setOper('regEmp')}>
                <Icon>
                    <Assignment style={{ color: "white", fontSize: "50px" }} />
                </Icon>
                <Tittle>
                    Registrar empleado
                </Tittle>
            </MenuItem>

            <MenuItem onClick={()=>setOper('conEmp')}>
                <Icon>
                    <RecentActors style={{ color: "white", fontSize: "50px" }} />
                </Icon>
                <Tittle>
                    Consultar empleados
                </Tittle>
            </MenuItem>

            <MenuItem onClick={()=>setOper('regCla')}>
                <Icon>
                    <AddCircleOutline style={{ color: "white", fontSize: "50px" }} />
                </Icon>
                <Tittle>
                    Registrar clase
                </Tittle>
            </MenuItem>

            <MenuItem onClick={()=>setOper('conCla')}>
                <Icon>
                    <Class style={{ color: "white", fontSize: "50px" }} />
                </Icon>
                <Tittle>
                    Consultar clases
                </Tittle>
            </MenuItem>

            <MenuItem onClick={()=>setOper('altAct')}>
                <Icon>
                    <PostAdd style={{ color: "white", fontSize: "50px" }} />
                </Icon>
                <Tittle>
                    Alta de una actividad
                </Tittle>
            </MenuItem>

            <MenuItem onClick={()=>setOper('conAct')}>
                <Icon>
                    <AssignmentTurnedIn style={{ color: "white", fontSize: "50px" }} />
                </Icon>
                <Tittle>
                    Consultar actividades
                </Tittle>
            </MenuItem>

            <MenuItem onClick={()=>setOper('regCli')}>
                <Icon>
                    <PersonAddSharp style={{ color: "white", fontSize: "50px" }} />
                </Icon>
                <Tittle>
                    Registrar Cliente
                </Tittle>
            </MenuItem>

            <MenuItem onClick={()=>setOper('conCli')}>
                <Icon>
                    <PeopleOutline style={{ color: "white", fontSize: "50px" }} />
                </Icon>
                <Tittle>
                    Consultar clientes
                </Tittle>
            </MenuItem>

            <MenuItem onClick={()=>setOper('regMem')}>
                <Icon>
                    <LibraryAdd style={{ color: "white", fontSize: "50px" }} />
                </Icon>
                <Tittle>
                    Registrar membresia
                </Tittle>
            </MenuItem>

            <MenuItem onClick={()=>setOper('conMem')}>
                <Icon>
                    <Toc style={{ color: "white", fontSize: "50px" }} />
                </Icon>
                <Tittle>
                    Consultar membresias
                </Tittle>
            </MenuItem>

            <MenuItem onClick={()=>setOper('conUnCli')}>
                <Icon>
                    <FolderShared style={{ color: "white", fontSize: "50px" }} />
                </Icon>
                <Tittle>
                    Consultar un cliente
                </Tittle>
            </MenuItem>


        </MenuContainer>
    )
}
