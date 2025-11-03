import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from "../pages/Inicio";
import Login from "../pages/Login";
import Registrar from "../pages/Registrar";
import Obrigado from "../pages/Obrigado";
import Dashboard from "../pages/Dashboard";
import Configuracao from "../pages/Configuracao";
import Contatos from "../pages/Contatos";
import Esqueceusenha from "../pages/Esqueceusenha";


function Rotas() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
             <Route path="/registrar" element={<Registrar />} />
                   <Route path="/obrigado" element={<Obrigado />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                       <Route path="/configuracao" element={<Configuracao />} />
                        <Route path="/contatos" element={<Contatos />} />
                          <Route path="/esqueceuasenha" element={<Esqueceusenha />} />
                        
      </Routes>
    </Router>
  );
}

export default Rotas;
