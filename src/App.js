import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './navbar';
import Home from './home'
import QuienesSomos from './quienessomos'
import Contacto from './contacto'
import Cotizacion from './cotizacion'
import Footer from './footer';
import PokemonList from './PokemonList';

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route exact path="/Home" element={<Home />} />
                    <Route exact path="/Quienessomos" element={<QuienesSomos />} />
                    <Route exact path="/PokemonList" element={<PokemonList />} />
                    <Route exact path="/Contacto" element={<Contacto />} />
                    <Route exact path="/Cotizacion" element={<Cotizacion />} />
                    <Route path="/" element={<Home />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}
export default App;