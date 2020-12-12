import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import LogIn from './log-in/log-in.component';
import SlideBar from './menu/menu.component';

function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Route path="/login" exact component={LogIn} />
        </div> 
        <Route path="*" exact component={SlideBar} />
      </BrowserRouter>
    </div>
  );
}

export default App;
