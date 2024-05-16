import React, { useEffect, useState } from "react";
import { SignUp, LogIn, Homepage } from "./pages";
import{Routes,Route, json} from 'react-router-dom';
import RequireAuth from "./RequireAuth";
import Seleccion_paciente from "./pages/Seleccion_paciente";


const App = () => {
  return (
    <div>
      <Routes>
        <Route path={'/signup'} element = {<SignUp/>} />
        <Route path={'/'} element = {<LogIn setToken/>} />
        <Route path={'/seleccion_paciente'} element = {<RequireAuth><Seleccion_paciente/></RequireAuth>} />
      </Routes>
    </div>
  )
}

export default App