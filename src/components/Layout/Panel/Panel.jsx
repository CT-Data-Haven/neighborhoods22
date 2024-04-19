import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const Panel = (props) => (
    <Paper
        variant='outlined'
        sx={{
            p: 1,
            m: 1,
            ...props.sx
        }}
        {...props}
    >
        {props.heading && (
            <Typography
                variant={props.hLevel || 'h2'}
                sx={{
                    m: 1,
                }}
            >
                {props.heading}
            </Typography>
        )}

        {props.children}
    </Paper>
);

export default Panel;
