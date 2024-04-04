import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Panel from '../Layout/Panel/Panel';

// const Profile = ({ topic, nhood, data }) => {

//     return (
//         <Card>
//             <CardHeader title={`${topic} at a glance: ${nhood}`} />
//             <CardContent>
//                 <Table size='small' aria-label='Neighborhood profile table'>
//                     <TableBody>
//                         {data.map((row) => (
//                             <TableRow key={row.id}>
//                                 <TableCell sx={{ fontWeight: 'medium' }}>{row.indicator}</TableCell>
//                                 <TableCell align='right'>{row.value}</TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </CardContent>
//         </Card>
//     );
// };

const Profile = ({ topic, nhood, data }) => (
    <Panel title={`${topic} at a glance: ${nhood}`}>
        <TableContainer>
            <Table size='small' aria-label='Neighborhood profile table'>
                <TableBody>
                    {data.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell sx={{ fontWeight: 'medium' }}>{row.indicator}</TableCell>
                            <TableCell align='right'>{row.value}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </Panel>
);

export default Profile;
