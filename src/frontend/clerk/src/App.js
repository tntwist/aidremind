import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import history from "./services/history";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import './App.css';
import { Container } from '@material-ui/core';
import Header from "./components/header";
import Landing from "./components/landing";
import Task from "./components/task";
import Tasks from "./components/tasks";
import { BarlowTTF } from "../src/assets/Barlow-Regular.ttf";
import { FredokaOneTTF } from "../src/assets/FredokaOne-Regular.ttf";

function App() {

  const barlow = {
    fontFamily: 'Barlow',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 400,
    src: `
      local('Barlow'),
      local('Barlow-Regular'),
      url(${BarlowTTF}) format('ttf')
    `,
    unicodeRange:
      'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
  };

  const fredokaone = {
    fontFamily: 'FredokaOne',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 400,
    src: `
      local('FredokaOne'),
      local('FredokaOne-Regular'),
      url(${FredokaOneTTF}) format('ttf')
    `,
    unicodeRange:
      'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
  };

  const theme = createMuiTheme({
    palette: {
      primary: { main: '#3cf8bb' },
      secondary: { main: '#003af0' },
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          '@font-face': [fredokaone],
        },
      },
    },
    typography: {
      fontFamily: [
        'Barlow',
        'FredokaOne'
      ].join(','),
      button: {
        minWidth: '50%'
      }
    },
  });

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container fixed>
          <Header />
          <Router history={history}>
            <Switch>
              <Route path="/" exact component={Landing} />
              <Route path="/tasks" exact component={Tasks} />
              <Route path="/task/:id" component={Task} />
            </Switch>
          </Router>
        </Container>
      </ThemeProvider>

    </div>
  );
}

export default App;
