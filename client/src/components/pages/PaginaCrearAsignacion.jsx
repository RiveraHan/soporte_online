import React, { Component } from 'react';
import {connect} from 'react-redux';
import {empleados_activos, tecnicos_activos} from '../../redux/actions/empleados';
import TablaEmpleados from '../Table/TablaEmpleados';


class PaginaCrearAsignacion extends Component {

    state={
        user:{
            idusuario: '',
            full_name: ''
        }
    }

    componentDidMount(){
        this.props.empleados_activos();
        this.props.tecnicos_activos();
    }

    render() {
        return (
            <div>
                <TablaEmpleados/>
            </div>
        );
    }
}

export default connect(null,{empleados_activos, tecnicos_activos})(PaginaCrearAsignacion);