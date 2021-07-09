import React,{ Suspense } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  //Link
} from "react-router-dom";
import Auth from './hoc/auth'

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import NavBar from './components/views/NavBar/NavBar';
import Footer from './components/views/Footer/Footer';
import MovieDetail from './components/views/MovieDetail/MovieDetail';


function App() {
  return (
    <Router fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage,false)} /> {/*exact 붙여주고 component에 넣으면 같아짐*/}
          <Route exact path="/register" component={Auth(RegisterPage,false)}/>
          <Route exact path="/movie/:movieId" component={Auth(MovieDetail, null)} />
        </Switch>
      </div>
      <Footer />
    </Router>
  )
}

export default App