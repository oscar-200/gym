import React, { forwardRef, useState, useEffect } from 'react'
import swal from 'sweetalert';
import MaterialTable from 'material-table';
import ModifyActivity from './ModifyActivity'

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
import ArrowUpwardIcon from '@material-ui/icons'

const axios = require('axios');

export default function ConsultActividades() {

    const [actividades, setActividades] = useState([])

    const [isEdit, setIsEdit] = useState(null)
    const [isEmp, setIsEmp] = useState([]) 

    const loadData = () => {
        axios.get('http://localhost:4000/actividades')
            .then(result => {
                console.log(result.data)
                setActividades(result.data)
            })
    }

    useEffect(loadData, [])

    async function onDelete(id) {
        console.log(id)
        try {
            const { data } = await axios.post('http://localhost:4000/elim/act', { id: id })
            console.log(data.message)
            loadData()
            swal({
                text: `La actividad se a eliminado con exito`,
                icon: "success",
                button: "Aceptar"
            })
        }
        catch (error) {
            console.log(error)
            swal({
                text: `Algo a salido mal`,
                icon: "error",
                button: "Aceptar"
            })
        }
    }

    function onDeleteConfirm(data){
        swal({
            title: "Eliminar",
            text: `Estás seguro que deseas eliminar la actividad "${data.id_actividad} - ${data.nombre_clase}" del registro?`,
            icon: "warning",
            buttons: ["No", "Si"]
        }).then(resp=>{
            if(resp){
                onDelete(data.id_actividad)
            }
        })
    }

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
            title: 'Id Actividad',
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
            {isEdit ? <ModifyActivity state={isEmp} setEdit={setIsEdit} refresh={loadData}/> :
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
                    actionsColumnIndex: -1,
                }}
                icons={tableIcons}
                actions={[
                    {
                        icon: Edit,
                        toltip: 'Editar',
                        onClick: (event, rowData) => {
                            setIsEdit('true')
                            setIsEmp(rowData)
                        }
                    },
                    {
                        icon: DeleteOutline,
                        toltip: 'Eliminar',
                        onClick: (event, rowData) => onDeleteConfirm(rowData)
                    }
                ]}

                localization={{
                    header: {
                        actions: 'acciones'
                    }
                }}
            />}
        </div>
    )
}
