import React from 'react'
import ReactDOM from 'react-dom/client'
import { StyledEngineProvider, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App.jsx';

import '@fontsource/barlow/400.css';
import '@fontsource/barlow/500.css';
import '@fontsource/barlow/600.css';
import '@fontsource/barlow/700.css';

import './index.css';

const rootElement = document.getElementById('root');

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
    }
});

ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    </React.StrictMode>
);