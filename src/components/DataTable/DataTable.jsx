import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Panel from '../Layout/Panel/Panel';

const DataTable = ({ topic, nhood, data, pages, paginationModel, pageChangeHandler, nhoodChangeHandler }) => {
    // console.log(data);
    const { columns, rows } = data;
    return (
        <Panel heading={`${topic} by neighborhood`}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSizeOptions={pages}
                paginationModel={paginationModel}
                onPaginationModelChange={pageChangeHandler}
                onRowSelectionModelChange={(nhood) => {
                    nhoodChangeHandler(nhood[0]);
                    // console.log(nhood);
                }}
                rowSelectionModel={nhood ? [nhood] : []}
                density='compact'
                sx={{ 
                    fontSize: '0.8rem',
                    '& .MuiDataGrid-columnHeaderTitle': {
                        whiteSpace: 'normal',
                    }
                }}
                autoHeight
                disableColumnSelector
                hideFooterSelectedRowCount
                keepNonExistentRowsSelected
                disableColumnMenu
                />
        </Panel>
    )
};

export default DataTable;
