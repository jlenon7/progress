import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';
import './styles.css'
import api from '../../services/api';

export default function Profile() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();

    const ongId = localStorage.getItem('ongId');

    async function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        };

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId
                }
            });

            history.push('/profile');
        } catch (err) {
            alert(`Erro ao cadastrar caso, tente novamente! ${err}`);
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontar um heroi para resolver isso.</p>
                
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={30} color="#E02041" />
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input 
                        type="text" 
                        placeholder="Titulo do caso" 
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder="Descricao"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />

                    <input 
                        type="text" 
                        placeholder="Valor em reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}