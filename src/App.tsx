import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import LogIn from './log-in/log-in.component';
import SlideBar from './menu/menu.component';

function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Route path="/" exact component={LogIn} />
          <Route path="/topic" exact component={SlideBar} />
          <Route path="/home-overview" exact component={SlideBar}/>
          <Route path="/list-topic" exact component={SlideBar}/>
          <Route path="/my-faculty" exact component={SlideBar}/>
        </div> 
      </BrowserRouter>
    </div>
  );
}

export default App;
