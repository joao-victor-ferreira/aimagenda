import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Inicio from '../pages/Inicio';
import Login from '../pages/Login';
import Registrar from '../pages/Registrar';
import Obrigado from '../pages/Obrigado';
import Dashboard from '../pages/Dashboard';
import Configuracao from '../pages/Configuracao';
import Contatos from '../pages/Contatos';
import Esqueceusenha from '../pages/Esqueceusenha';


const stripePromise = loadStripe('pk_test_51SVBIERyE84ZdboWdk7D3GXd2wGAxV3ken8kRnoKbBIWRXFf4H3vyGjOJk2Bk0bcVFKX0RpWQ26XNZZcUQm0pcnU00003Xu90u');

function Rotas() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        
        {/* Envolver a rota de Registrar com Elements do Stripe */}
        <Route 
          path="/registrar" 
          element={
            <Elements stripe={stripePromise}>
              <Registrar />
            </Elements>
          } 
        />
        
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