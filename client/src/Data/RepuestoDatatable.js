export const RepuestoDT = (data) => {

    let rows = data;

    return {
        //ESTRUCTURA DATATABLE
        data: {
            columns: [
                {
                    label: 'Id',
                    field: 'idrepuesto',
                    sort: 'asc',
                    width: 50
                },
                {
                    label: 'Repuesto',
                    field: 'repuesto',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Categoria',
                    field: 'categoria',
                    sort: 'asc',
                    width: 150
                },
            ],
            rows,
        }
    }

}