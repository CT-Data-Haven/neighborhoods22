import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

const Header = ({ heading }) => (
    <Box sx={{ p: 1 }}>
        <Typography variant='h1'>{heading}</Typography>
        <Alert severity='info' icon={false}>
              Select a topic and indicator to view either a map or a chart. Clicking a neighborhood on the map, chart, or table, or selecting it in the neighborhood menu, will bring up detailed information on that neighborhood. See all neighborhoods in the table below, or download data at bottom.
        </Alert>
    </Box>
);

export default Header;
