import { GET_EMPLEADOS_ACTIVOS, GET_TECNICOS_ACTIVOS } from '../actions/types';

const initialState = {
    employees: [],
    tecnicos: [],
    msg: null
}


export default function (state = initialState, action) {
    switch (action.type) {

        case GET_EMPLEADOS_ACTIVOS:
            return {
                ...state,
                employees: action.payload.employees,
                msg: action.payload.msg
            }

        case GET_TECNICOS_ACTIVOS:
            return {
                ...state,
                tecnicos: action.payload.tecnicos,
                msg: action.payload.msg
            }

        default:
            return state;
    }
}