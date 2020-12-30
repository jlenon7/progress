import React, { useState } from 'react';
import api from '../../services/API';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons'
import { Modal, Button } from 'react-bootstrap';
import './styles.css';

function DevItem({ dev }) {
    const [modal, setModal] = useState(false);   

    async function handleRemoveDev(id, e) {
        const response = await api.delete(`/devs/${id}`);
        await setModal(false);
        window.location.reload();
    }

    return (
    <li className="dev-item">
        <header>
            <img src={dev.avatar_url} alt={dev.name} />
                <div className="user-info">
                    <strong>{dev.name}</strong>
                    <span>{dev.techs.join(', ')}</span>
                </div>
                <div className="icon-del">
                    <a onClick={() => setModal(true)} className="icon-del">
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </a>
                    <Modal show={modal}>
                        <Modal.Header>Tem certeza que deseja remover o Dev {dev.github_username}?</Modal.Header>
                            <Modal.Footer>
                                <Button onClick={(e) => handleRemoveDev(dev._id, e)}>
                                    Excluir
                                </Button>
                                <Button onClick={() => setModal(false)}>
                                    Cancelar
                                </Button>
                            </Modal.Footer>
                    </Modal>

                </div>
        </header>
        <p>{dev.bio}</p>
        <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no Github</a>
    </li>
  );
}

export default DevItem;