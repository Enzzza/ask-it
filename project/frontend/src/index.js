//import { createMuiTheme } from '@material-ui/core/styles';
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClientProvider, QueryClient } from 'react-query';
import { Spinner } from './components/utils/Spinner';
import SpinnerContextProvider from './contexts/SpinnerContext';
import { SnackbarProvider } from 'material-ui-snackbar-provider';
import CustomSnackbar from './components/utils/snackbar/CustomSnackbar';
import CssBaseline from "@material-ui/core/CssBaseline";

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    background:{
      default:"#303030",
    }
  },
  
});

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <ThemeProvider theme={darkTheme}>
        <SpinnerContextProvider>
          <SnackbarProvider SnackbarComponent={CustomSnackbar}>
            <>
              <CssBaseline />
              <App />
              <Spinner />
            </>
          </SnackbarProvider>
        </SpinnerContextProvider>
      </ThemeProvider>
    </React.StrictMode>
  </QueryClientProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
