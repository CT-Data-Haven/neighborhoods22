import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Panel from '../Layout/Panel/Panel';

const Control = ({
    items,
    label,
    selected,
    changeHandler,
    id,
}) => (
    <FormControl fullWidth variant='filled'>
        <InputLabel id={`${id}-select-label`}>{label}</InputLabel>
        <Select
            labelId={`${id}-select-label`}
            id={`${id}-select`}
            value={selected}
            label={label}
            onChange={(e) => changeHandler(e.target.value)}
        >
            {items.map((d) => <MenuItem key={d.value} value={d.value}>{d.label}</MenuItem>)}
        </Select>
    </FormControl>
);

const ControlRow = ({ controls }) => (
    controls.map((control) => (
        <Grid item xs={12} md={6} key={`control-${control.key}`}>
            <Control
                key={`control-${control.key}`}
                id={control.key}
                {...control} />
        </Grid>
    ))
);

const ControlPanel = ({ controlGrps }) => (
    <Panel>
        <Grid container columnSpacing={2} rowSpacing={2}>
            <ControlRow controls={controlGrps.location} />
            <ControlRow controls={controlGrps.topic} />
        </Grid>
    </Panel>
);

export default ControlPanel;
