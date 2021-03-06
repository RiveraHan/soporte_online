import React from 'react';
import FormularioAtencionReportadaTecnico from '../Forms/FormularioAtencionReportadaTecnico';
import Notification from '../Notifications/Notification'

const PaginaAtencionReportadaTecnico = () =>{
    
    return (
        <div className="container">
            <div className="my-5 mx-3 py-3 px-3 border rounded shadow">
                <FormularioAtencionReportadaTecnico/>
            </div>
            <Notification/>
        </div>
        
    );
    
}

export default PaginaAtencionReportadaTecnico;