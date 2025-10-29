import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from "../pages/Inicio";
import Login from "../pages/Login";
import Registrar from "../pages/Registrar";
import Obrigado from "../pages/Obrigado";
import Dashboard from "../pages/Dashboard";
import Agenda from "../pages/Agenda";
import Cliente from "../pages/Cliente";
import Integracao from "../pages/Integracao";
import AIConfiguracao from "../pages/AIConfiguracao";


function Rotas() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
             <Route path="/registrar" element={<Registrar />} />
                   <Route path="/obrigado" element={<Obrigado />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                          <Route path="/agenda" element={<Agenda />} />
                              <Route path="/cliente" element={<Cliente />} />
                                <Route path="/integracao" element={<Integracao />} />
                                      <Route path="/aiconfiguracao" element={<AIConfiguracao />} />
      </Routes>
    </Router>
  );
}

export default Rotas;
