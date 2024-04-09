import React from 'react'
import ReactDOM from 'react-dom/client'
import { StyledEngineProvider, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { schemePuBuGn, schemeRdPu, schemeGreys } from 'd3-scale-chromatic';

import App from './App.jsx';

import '@fontsource/barlow/400.css';
import '@fontsource/barlow/500.css';
import '@fontsource/barlow/600.css';
import '@fontsource/barlow/700.css';
import '@fontsource/barlow-semi-condensed/400.css';
import '@fontsource/barlow-semi-condensed/600.css';
import '@fontsource/barlow-semi-condensed/700.css';

import './index.css';

const rootElement = document.getElementById('root');

const palette = schemePuBuGn[5];
const grays = schemeGreys[5];
const hilite = palette[3];
const gray = grays[3];

const theme = createTheme({
    components: {
        MuiPopover: {
            defaultProps: {
                container: rootElement,
            }
        },
        MuiPopper: {
            defaultProps: {
                container: rootElement,
            }
        }
    },
    typography: {
        fontFamily: 'Barlow, sans-serif',
        fontWeightBold: 600,
        h2: {
            fontWeight: 600
        }
    },
    palette: {
        primary: {
            main: hilite,
        },
        
    }
});

ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <App palette={palette} />
        </ThemeProvider>
    </React.StrictMode>
);