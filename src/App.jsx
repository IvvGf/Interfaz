import React from "react";
import { SignUp, LogIn } from "./pages";
import{Routes,Route} from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path={'/signup'} element = {<SignUp/>} />
        <Route path={'/'} element = {<LogIn/>} />
      </Routes>
      
    </div>
  
  )
}

export default App