import React from 'react'
import { Route, Switch, HashRouter } from "react-router-dom"
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import './App.css'
import Payment from './components/Payment'

const theme = createMuiTheme({
  palette: {
    primary: {
      //HOTM peach color
      main: '#f18383'
    },
    secondary: {
      main: '#000'
    }
  }
})


const App = () => {


  return (
    <ThemeProvider theme={theme}>
      <HashRouter>
        <Switch>
          <Route path='/' >
            <Payment />
          </Route>
        </Switch>
      </HashRouter>
    </ThemeProvider>
  )
}

export default App
