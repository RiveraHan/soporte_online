import React, { Component } from 'react';
import {connect} from 'react-redux';
import Moment from 'react-moment';
import 'moment-timezone';

class AtencionReporte extends Component {

    state={
        coverage: [],
        parts: [],
        tasks: [],
        tasksEQP: [],
        idregws: 0,
    }

    handleOnChange = ({target: {value, name}}) => this.setState({[name]: value})

    createAndDownloadPdf = () =>{

        const {coverage, parts, tasks, idregws, tasksEQP} = this.state;
        let task = tasks.find(element=>element.idregws === parseInt(idregws))

        let amount = parts.reduce((acc, current)=>{
            return acc+= parseInt(current.subtotal)
        }, 0);


        let data ={
            info: task,
            coverage,
            parts,
            tasksEQP,
            amount: parseFloat(amount).toFixed(2)
        }

        fetch('/api/export/pdf',{
            body: JSON.stringify({data}), // data can be `string` or {object}!
            headers:{
              'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(res=>{
            return res
                .arrayBuffer()
                .then(res => {
                    const blob = new Blob([res], { type: 'application/pdf' })
                    const link = document.createElement('a')
                    link.href = window.URL.createObjectURL(blob)
                    link.download = 'report.pdf'
                    link.click();
                })
                .catch(e => alert(e))
        }).catch(err=>{
            console.log(err);
        })

    }


    downloadPdf = ()=>{
        let test={
            name: 'Alexander'
        }
        
    }
    
    componentDidMount(){
        let tasks = this.props.tasks
        this.setState({tasks})
    }

    componentDidUpdate(prevProps){
        const {coverage, parts, idregws, tasksEQP} = this.props;
        if(coverage !== prevProps.coverage){
            this.setState({coverage})
        }
        if(parts !== prevProps.parts){
            this.setState({parts})
        }
        if(idregws !== prevProps.idregws){
            this.setState({idregws})
        }
        if(tasksEQP !== prevProps.tasksEQP){
            this.setState({tasksEQP})
        }
    }
    
    render() {

        const {tasks, idregws, parts, coverage, tasksEQP} = this.state;
        
        
        let amount = parts.reduce((acc, current)=>{
            return acc+= parseInt(current.subtotal)
        }, 0);

        const info = tasks.find(element=>element.idregws === parseInt(idregws))

        const partList = parts.map((part, i)=>(
            <tr key={i}>
                <td scope="row">{part.qty}</td>
                <td className="text-center">{part.repuesto}</td>
                <td className="text-center">{part.costo} {part.moneda}</td>
                <td className="text-center">${part.subtotal}</td>
            </tr>
        ))

        const coverageList = coverage.map((element, i)=>(
            <tr key={i}>
                <td scope="row">{element.idregws}</td>
                <td className="text-center">{element.idequipo}</td>
                <td className="text-center">{element.equipo}</td>
                <td className="text-center">{element.consecutivo}</td>
                <td className="text-center">{element.usuario}</td>
            </tr>
        ))

        const tasksList = tasksEQP.map((task, i)=>(
            <tr key={i}>
                <td scope="row">{task.idtarea}</td>
                <td className="text-center">{task.tarea}</td>
                <td className="text-center">{task.propietario}</td>
                <td className="text-center">{task.estado}</td>
            </tr>
        ))

        return (
            <div>
                <div className="container border border-primary py-3 px-3">
                    <h3 className="text-center text-primary">Ficha Tecnica de Atencion</h3>
                    <hr/>
                    <h5 className="text-primary mt-3 font-weight-bold">#1 Resumen datos generales</h5>
                    <div className="row">
                        
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 mt-3">
                            <div className="card">
                                <div className="card-header text-white font-weight-bold" style={{ background: '#508cef'}}>
                                   DATOS DEL TECNICO
                                </div>
                                <div className="card-body">
                                    <p><b>NOMBRE:</b> {  info !== undefined ? info.nombretecnico : null}</p>
                                    <p><b>CARGO:</b>  {  info !== undefined ? info.cargotecnico : null}</p>
                                    <p><b>CARNET:</b> {  info !== undefined ? info.carnetecnico : null}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 mt-3">
                            <div className="card">
                                <div className="card-header text-white font-weight-bold" style={{ background: '#f34f5e'}}>
                                    DATOS DEL USUARIO
                                </div>
                                <div className="card-body">
                                    <p><b>NOMBRE:</b> {  info !== undefined ? info.nombreusuario : null}</p>
                                    <p><b>CARGO:</b>  {  info !== undefined ? info.cargousuario : null}</p>
                                    <p><b>CARNET:</b> {  info !== undefined ? info.carneusuario : null}</p>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* DATOS DE LOS REPUESTOS OCUPADOS */}
                    <div className="row">
                        <div className="col-12">
                            <h5 className="text-primary my-3 font-weight-bold .h5">#2 Resumen de Repuestos Utilizados</h5>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">Qty</th>
                                        <th scope="col">Repuesto</th>
                                        <th scope="col">Precio</th>
                                        <th scope="col">SubTotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { partList !== undefined ? partList : null}
                                    <tr>
                                        <td colSpan="3"></td>
                                        <td className="text-center">${parseFloat(amount).toFixed(2)}</td>
                                    </tr>
                                
                                </tbody>
                            </table>
                        </div>
                    </div>


                    {/*-- DATOS DE LOS EQUIPOS DE COBERTURA */}
                    <div className="row">
                        <div className="col-12">
                            <h5 className="text-primary my-3 font-weight-bold .h5">#3 Resumen de Equipos beneficiarios de la atencion principal</h5>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">idRegws</th>
                                        <th scope="col">idEquipo</th>
                                        <th scope="col">Equipo</th>
                                        <th scope="col">Consecutivo</th>
                                        <th scope="col">Usuario</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { coverageList !== undefined ? coverageList : null}
                                </tbody>
                            </table>
                        </div>
                    </div>


                    {/*TAREAS ASIGNADAS AL EQUIPO */}
                    <div className="row">
                        <div className="col-12">
                            <h5 className="text-primary my-3 font-weight-bold .h5">#4 Resumen de las Tareas del Equipo</h5>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">#Id</th>
                                        <th scope="col">Tarea</th>
                                        <th scope="col">Propietario</th>
                                        <th scope="col">Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { tasksList !== undefined ? tasksList : null}   
                                </tbody>
                            </table>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-4">
                            <div className="card">
                                <div className="card-header bg-warning text-dark font-weight-bold">Resumen del Master</div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Equipo: {info !== undefined ? info.equipo : null}</li>
                                    <li className="list-group-item">Consecutivo: {info !== undefined ? info.consecutivo : null}</li>
                                    <li className="list-group-item">Modelo: {info !== undefined ? info.modelo : null}</li>
                                    <li className="list-group-item">Serie: {info !== undefined ? info.serie : null}</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="card">
                                <div className="card-header bg-warning text-dark font-weight-bold">Resumen de Ingreso</div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item especial">Ingreso: {info !== undefined ? info.ingreso : null}</li>
                                    <li className="list-group-item especial">Inicio: {info !== undefined ? info.inicio : null}</li>
                                    <li className="list-group-item especial">Finalizo: {info !== undefined ? info.final: null}</li>
                                    {/* <li className="list-group-item especial">Ingreso: {info !== undefined ? <Moment format="DD/MM/YYYY">{info.ingreso}</Moment> : null}</li>
                                    <li className="list-group-item especial">Inicio: {info !== undefined ? <Moment format="DD/MM/YYYY HH:mm:ss">{info.inicio}</Moment> : null}</li>
                                    <li className="list-group-item especial">Finalizo: {info !== undefined ? <Moment format="DD/MM/YYYY HH:mm:ss">{info.final}</Moment>: null}</li> */}
                                    
                                </ul>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="card">
                                <div className="card-header bg-warning text-dark font-weight-bold">Resumen de Tiempos</div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Ordinario: {info !== undefined ? info.ordinario: null}</li>
                                    <li className="list-group-item">Pausa: {info !== undefined ? info.pausa : null}</li>
                                    <li className="list-group-item">extra: {info !== undefined ? info.extra : null}</li>
                                    <li className="list-group-item">Total: {info !== undefined ? info.tiempo : null}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-8 col-sm-8 col-md-8 col-lg-10"></div>
                        <div className="col-4 col-sm-4 col-md-4 col-lg-2">
                            <button className="btn btn-outline-primary my-5 btn-block" onClick={this.createAndDownloadPdf}>CREATE TO PDF</button>
                        </div>
                    </div>
                </div>   
            </div>
        );
    }
}

const mapStateToProps = state=>({
    coverage: state.workshop.coverage,
    parts: state.workshop.parts,
    tasks: state.workshop.tasks.data.rows,
    tasksEQP: state.workshop.tasksEQP
})

export default connect(mapStateToProps)(AtencionReporte);