import React, { useState, useEffect, useCallback } from 'react';
import {MDBDataTable} from 'mdbreact';
import {connect} from 'react-redux';
import {modelo_cobertura} from '../../modelos/cobertura'

const mapStateToProps = state=>({
    cobertura: state.tools.cobertura
})

const CoberturaTable = (props) => {

    const {cobertura, fetchDataComponent} = props;
    const [data, setData] = useState(modelo_cobertura([]).data);
    
    const handleOnClick = useCallback((e)=>{
        let field= e.currentTarget;
        // //console.log(e.currentTarget.cells[1])
        let id=parseInt(field.cells[0].innerText)
        let equipo=`${field.cells[1].innerText}`
        let consecutivo=`${field.cells[2].innerText}`
        let modelo=`${field.cells[3].innerText}`
        let usuario=`${field.cells[6].innerText}`
        
        let eqp={
            id, equipo, consecutivo, modelo, usuario
        }

        fetchDataComponent(eqp)
    },[fetchDataComponent])

    useEffect(()=>{

        if(cobertura.data !== undefined){
            let funcion='clickEvent'

            for(let i=0; i<cobertura.data.rows.length; i++){
                Object.defineProperty(cobertura.data.rows[i], funcion, {value: handleOnClick, writable: true})
                 
            }
            
            setData(cobertura.data);
        }

    },[cobertura, handleOnClick])

    return (
        <div className="container my-5 py-5">
            <MDBDataTable
                bordered
                hover
                data={data}
                entries={3}
                entriesOptions={[3,5,10,20,40]}
            />
        </div>
    );
    
    
}

export default connect(mapStateToProps)(CoberturaTable);