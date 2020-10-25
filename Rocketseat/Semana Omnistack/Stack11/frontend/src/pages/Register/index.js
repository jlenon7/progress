import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import logoImg from '../../assets/logo.svg';

import api from '../../services/api';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();
    
    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf,
        };

        try {
            const response = await api.post('ongs', data);

            alert(`Seu ID de acesso: ${response.data.id}`);
            history.push('/');
        } catch (err) {
            alert(`Erro no cadastro: ${err}, tente novamente mais tarde`)
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastro</h1>
                    <p>Faca seu cadastro, entre na paltaforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
                
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={30} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input 
                        type="text"
                        placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)} 
                        required
                    />
                    <input 
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <input 
                        type="text"
                        placeholder="WhatsApp" 
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                        required
                    />

                    <div className="input-group">
                        <input 
                            type="text"
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                            required
                        />
                        <input 
                            type="text"
                            placeholder="UF"
                            style={{ width: 80 }} 
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                            required
                        />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}