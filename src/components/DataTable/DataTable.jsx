import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Panel from '../Layout/Panel/Panel';

const DataTable = ({
    topic,
    nhood,
    data,
    pages,
    paginationModel,
    pageChangeHandler,
    nhoodChangeHandler
}) => {
    const { columns, rows } = data;
    return (
        <Panel heading={`${topic} by neighborhood`}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSizeOptions={pages}
                paginationModel={paginationModel}
                onPaginationModelChange={pageChangeHandler}
                onRowSelectionModelChange={(nhood, det) => {
                    if (nhood.length) {
                        nhoodChangeHandler(nhood[0]);
                    }
                }}
                rowSelectionModel={nhood ? [nhood] : []}
                density='compact'
                sx={{
                    fontSize: '0.8rem',
                    '& .MuiDataGrid-columnHeaderTitle': {
                        whiteSpace: 'normal',
                        lineHeight: '1.1em',
                        py: '0.3rem',
                        // overflow: 'visible',
                    },
                    '& .MuiDataGrid-columnHeader': {
                        height: 'unset !important',
                        alignSelf: 'end',
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        maxHeight: '8rem !important',
                    },
                    '& .MuiDataGrid-columnHeaderRow': {
                        // alignItems: 'flex-end',
                    },
                }}
                autoHeight
                autosizeOnMount
                autosizeOptions={{ expand: true, includeHeaders: true}}
                disableColumnSelector
                hideFooterSelectedRowCount
                keepNonExistentRowsSelected
                disableColumnMenu
                disableMultipleRowSelection
            />
        </Panel>
    )
};

export default DataTable;
