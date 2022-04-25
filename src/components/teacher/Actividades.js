import React, { forwardRef, useState, useEffect } from 'react'
import MaterialTable from 'material-table';

import "./../../css/homeGerent.css";

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const axios = require('axios');

export default function ConsultarActividades() {

    const [actividades, setActividades] = useState([])


    const loadData = () => {
        axios.get('http://localhost:4000/actividades')
            .then(result => {
                console.log(result.data)
                setActividades(result.data)
            })
    }

    useEffect(loadData, [])

    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    };

    const columnas = [
        {
            title: 'Id actividad',
            field: 'id_actividad'
        },
        {
            title: 'Clase',
            field: 'nombre_clase'
        },
        {
            title: 'Maestro',
            field: 'nombre_emp'
        },
        {
            title: 'Cupos',
            field: 'cupos'
        },
        {
            title: 'Hora de inicio',
            field: 'hra_inicio'
        },
        {
            title: 'Hora fin',
            field: 'hra_fin'
        }
    ]

    return (
        <div className='tabla'>
            <MaterialTable
                columns={columnas}
                data={actividades}
                title={'Actividades'}
                pagination
                options={{
                    rowStyle: {
                        backgroundColor: 'rgb(50,50,50)',
                        color: '#FFF',
                        fontSize: 15
                    },

                }}
                icons={tableIcons}
                localization={{
                    header: {
                        actions: 'Inscripciones'
                    }
                }}
            />
        </div>
    )
}
