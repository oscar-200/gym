import React, { forwardRef, useState, useEffect } from 'react'
import swal from 'sweetalert';
import MaterialTable from 'material-table';
import ModifyActivity from './../branch_manager-manager/ModifyActivity'

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

import icono from '@material-ui/icons/AssignmentTurnedIn';

//import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ArrowUpwardIcon from '@material-ui/icons'

const axios = require('axios');

export default function ConsultarActividades() {

    const [actividades, setActividades] = useState([])

    const [isEdit, setIsEdit] = useState(null)
    const [isEmp, setIsEmp] = useState([])

    const id_client = () => {
        const auth = JSON.parse(localStorage.getItem('auth'))
        const vec = auth.split("-");
        const id = vec[1];
        return id;
    }

    const loadData = () => {
        axios.get('http://localhost:4000/actividades')
            .then(result => {
                console.log(result.data)
                setActividades(result.data)
            })
    }

    useEffect(loadData, [])

    async function onInscriptionConfirm(data) {
        swal({
            title: "Inscripcion",
            text: `Estás seguro que deseas inscribirte a la actividad "${data.nombre_clase}"?`,
            icon: "warning",
            buttons: ["No", "Si"]
        }).then(resp => {
            if (resp) {
                onInscription(data)
            }
        })
    }

    const onInscription = async (data) => {

        if (await cuposDisponibles(data.id_actividad) === 'true') {
            console.log("si hay cupos")
            if (await disponibilidadHorario(data.hra_inicio, data.hra_fin, id_client()) === 'true') {
                await inscribir(id_client(), data.id_actividad)
            }
            else{
                swal({
                    text: `Ya tienes una clase asignada en ese horario`,
                    icon: "error",
                    button: "Aceptar"
                })
            }
        }
        else {
            swal({
                text: `Ya no hay cupos para esta clase`,
                icon: "error",
                button: "Aceptar"
            })
            loadData();
        }

    }

    const inscribir = async (id_cliente, id_actividad) =>{
        const body = {id_cliente, id_actividad};
        await axios.post('http://localhost:4000/api/reg/agenda', body)
            .then(({ data }) => {
                console.log(data)
                swal({
                    text: `Inscripcion con exito`,
                    icon: "success",
                    button: "Aceptar"
                })
                axios.post('http://localhost:4000/decrem/cupos', {id:id_actividad})
                .then(({data}) => {
                    console.log(data)
                    loadData()
                })
                .catch(({response}) =>{
                    console.log(response)
                })
            })
            .catch(({ response }) => {
                console.log(response)
                swal({
                    text: `Algo a salido mal`,
                    icon: "error",
                    button: "Aceptar"
                })
            })
    }

    const disponibilidadHorario = async (hraInicio, hraFin, id) => {
        const body = { hraInicio, hraFin, id }
        console.log(body)
        //console.log(id_actividad)
        const disponible = await axios.post('http://localhost:4000/disp/horario/client', body)
            .then(({ data }) => {
                //console.log(id_client())
                console.log(data)
                if (data.length >= 1) {
                    return 'false'
                }
                return 'true'
            })
            .catch(({ response }) => {
                console.log(response)
            })
        return disponible
    }

    const cuposDisponibles = async (id) => {
        const disponible = await axios.post('http://localhost:4000/disp/cupos', { id: id })
            .then(({ data }) => {
                if (data.cupos > 1) {
                    return 'true'
                }
                return 'false'
            })
            .catch(({ response }) => {
                console.log(response)
            })
        return disponible
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
            {isEdit ? <ModifyActivity state={isEmp} setEdit={setIsEdit} refresh={loadData} /> :
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
                    actions={[
                        {
                            icon: icono,
                            tooltip: 'Inscribirse',
                            onClick: (event, rowData) => {
                                onInscriptionConfirm(rowData)
                            }
                        }
                    ]}

                    localization={{
                        header: {
                            actions: 'Inscripciones'
                        }
                    }}
                />}
        </div>
    )
}
