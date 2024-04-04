import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { styled } from '@mui/material/styles';

const Panel = (props) => (
    <Paper variant='outlined' {...props} sx={{ p: 1, m: 1, ...props.sx }}>
        {props.title && (
            <Typography variant={props.heading || 'h6'} sx={{ mb: 1 }}>
                {props.title}
            </Typography>
        )}

        {props.children}
    </Paper>
);

export default Panel;
