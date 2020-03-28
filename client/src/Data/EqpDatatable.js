export const EqpDT = (data) => {

    let rows = data;

    return {
        //ESTRUCTURA DATATABLE
        data: {
            columns: [
                {
                    label: 'Id',
                    field: 'idequipo',
                    sort: 'asc',
                    width: 50
                },
                {
                    label: 'Equipo',
                    field: 'equipo',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Consecutivo',
                    field: 'consecutivo',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Modelo',
                    field: 'modelo',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Serie',
                    field: 'serie',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Estado',
                    field: 'estado',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Usuario',
                    field: 'resguardo',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Usuario',
                    field: 'usuario',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'cat',
                    field: 'idcategoria',
                    sort: 'asc',
                    width: 40
                },
            ],
            rows,
        }
    }

}