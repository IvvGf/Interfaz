import { SignUp, LogIn,Seleccion_paciente, Importacion_datos} from "./pages";
import{BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import RequireAuth from "./RequireAuth";



const App = () => {
  return (
    <div>
      <Routes>
        <Route path={'/signup'} element = {<SignUp/>} />
        <Route path={'/'} element = {<LogIn/>} />
        {/* <Route path={'/seleccion_paciente'} element = {<RequireAuth><Seleccion_paciente/></RequireAuth>} /> */}
        <Route path={'/seleccion_paciente'} element = {<Seleccion_paciente/>} />
        <Route path={'/importacion_datos/:patientId'} element = {<Importacion_datos/>} />
        
      </Routes>
    </div>
  )
}

export default App