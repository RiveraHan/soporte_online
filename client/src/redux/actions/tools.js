import { GET_CATALOGO_EQP, GET_EQUIPOS_ACTIVOS, GET_TAREAS_BY_EQP, CREATE_NOTIFICATION, GET_REPUESTOS_BY_EQP, GET_COBERTURA } from './types'
import { EqpDT } from '../../Data/EqpDatatable'
import { RepuestoDT } from '../../Data/RepuestoDatatable'
import { TareasEQPDT } from '../../Data/TareasEqpDatatable'
import { AssignamentsDT } from '../../Data/AssignamentsDatatable';
import api from '../../api/api'


export const getEqpActivos = id => dispatch => {
    api.eqp.getActivos(id).then(res => {

        let eqps = EqpDT(res.eqps)

        dispatch({
            type: GET_EQUIPOS_ACTIVOS,
            eqps,
        })

    }).catch(err => {
        console.log(err);
    })
}

export const cobertura = id => dispatch => {
    api.eqp.getActivos(id).then(res => {

        let eqps = EqpDT(res.eqps)

        dispatch({
            type: GET_COBERTURA,
            eqps,
        })

    }).catch(err => {
        console.log(err);
    })
}

export const getCatalogo = () => dispatch => {
    api.eqp.getCatalogo().then(res => {


        dispatch({
            type: GET_CATALOGO_EQP,
            catalogo: res.catalogo
        })

    }).catch(err => {
        console.log(err);
    })
}

export const getTareasEqp = idregws => dispatch => {
    api.eqp.getTareasEqp(idregws).then(res => {

        let tareas = TareasEQPDT(res.tareas)

        dispatch({
            type: GET_TAREAS_BY_EQP,
            tareasEqp: tareas
        })

    }).catch(err => {
        console.log(err);
    })
}


export const setEquipoRegin = cluster => dispatch => {
    api.eqp.setEquipoRegin(cluster.data).then(res => {

        dispatch({
            type: CREATE_NOTIFICATION,
            payload: {
                msg: res.msg,
                type: 'success'
            }
        })

        api.workshop.task(cluster.info).then(res => {

            let info = AssignamentsDT(res.task);

            dispatch({
                type: 'GET_TASK_FILTER_BY_DATE',
                payload: {
                    info,
                    msg: res.msg
                }
            })

        }).catch(err => {
            console.log(err);
        })

    }).catch(err => {
        console.log(err)
    })
}

export const setUsuarioRegin = data => dispatch => {
    api.eqp.setUsuarioRegin(data).then(res => {

        dispatch({
            type: CREATE_NOTIFICATION,
            payload: {
                msg: res.msg,
                type: 'success'
            }
        })

    }).catch(err => {
        console.log(err)
    })
}

export const getRepuestos = idequipo => dispatch => {
    api.rep.getRepuestos(idequipo).then(res => {

        let reps = RepuestoDT(res.repuestos)

        dispatch({
            type: GET_REPUESTOS_BY_EQP,
            reps
        })

    }).catch(err => {
        console.log(err)
    })
}

export const Tareas = cluster => dispatch => {

    if (cluster.data.opt === 'UPD') {
        api.workshop.tasksEqp({ id: cluster.data.idregws }).then(res => {

            let previousT = res.tasks.slice();
            let currentT = cluster.currentT;
            let IDS = '-';
            let count = 0;

            for (let i = 0; i < previousT.length; i++) {

                for (let j = 0; j < currentT.length; j++) {

                    if (previousT[i].idtarea === currentT[j].idtarea) {
                        if (previousT[i].estado !== currentT[j].estado) {
                            IDS = IDS + currentT[j].idtarea + `-`;
                            count = count + 1;
                        }
                    }

                }

            }

            IDS = IDS.substring(1, IDS.length);

            let data = {
                idregws: '0',
                idregin: cluster.data.idregin,
                IDS,
                size: count,
                opt: cluster.data.opt
            }

            api.task.tareas(data).then(res => {

                dispatch({
                    type: CREATE_NOTIFICATION,
                    payload: {
                        msg: res.msg,
                        type: 'success'
                    }
                })

                dispatch({
                    type: 'GET_TASKS_EQP',
                    payload: {
                        tasksEQP: currentT,
                    }
                })

            }).catch(err => {
                console.log(err);
            })

        })
    }
    else {
        api.task.tareas(cluster.data).then(res => {

            dispatch({
                type: CREATE_NOTIFICATION,
                payload: {
                    msg: res.msg,
                    type: 'success'
                }
            })

            dispatch({
                type: 'GET_TASKS_EQP',
                payload: {
                    tasksEQP: cluster.currentT,
                }
            })

        }).catch(err => {
            console.log(err);
        })
    }

}

export const Cobertura = data => dispatch => {
    api.cvg.cobertura(data).then(res => {

        dispatch({
            type: CREATE_NOTIFICATION,
            payload: {
                msg: res.msg,
                type: 'success'
            }
        })

        api.workshop.coverage({ id: data.idregws }).then(res => {

            dispatch({
                type: 'GET_COVERAGE_BY_IDREGWS',
                payload: {
                    coverage: res.coverage,
                    msg: res.msg
                }
            })

        })

    })
}

export const Repuestos = data => dispatch => {

    if (data.opt === 'UPD') {

        api.workshop.parts({ id: data.idregws }).then(res => {
            let previousP = res.parts;
            let currentP = data.currentP;

            let IDS = '-';
            let VALUES = '-'
            let count = 0;

            for (const i in previousP) {
                for (const j in currentP) {
                    if (previousP[i].idrepuesto === currentP[j].idrepuesto) {
                        if (previousP[i].qty !== currentP[j].qty) {
                            IDS = IDS + currentP[j].idrepuesto + `-`;
                            VALUES = VALUES + currentP[j].qty + `-`;
                            count = count + 1;
                        }
                    }
                }
            }


            IDS = IDS.substring(1, IDS.length);
            VALUES = VALUES.substring(1, VALUES.length);

            let info = {
                idregws: data.idregws,
                IDS,
                VALUES,
                size: count,
                opt: data.opt
            }


            api.rep.repuestos(info).then(res => {

                dispatch({
                    type: CREATE_NOTIFICATION,
                    payload: {
                        msg: res.msg,
                        type: 'success'
                    }
                })

                api.workshop.parts({ id: data.idregws }).then(res => {
                    dispatch({
                        type: 'GET_PARTS_BY_IDREGWS',
                        payload: {
                            parts: res.parts,
                            msg: res.msg
                        }
                    })
                })

            })

        })

    }
    else {
        api.rep.repuestos(data).then(res => {

            dispatch({
                type: CREATE_NOTIFICATION,
                payload: {
                    msg: res.msg,
                    type: 'success'
                }
            })

            api.workshop.parts({ id: data.idregws }).then(res => {
                dispatch({
                    type: 'GET_PARTS_BY_IDREGWS',
                    payload: {
                        parts: res.parts,
                        msg: res.msg
                    }
                })
            })
        })
    }

}


export const noSave = (data) => dispatch => {
    dispatch({
        type: CREATE_NOTIFICATION,
        payload: {
            msg: data.msg,
            type: data.type
        }
    })

}