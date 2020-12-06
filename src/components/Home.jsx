import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './Home.css';
import Form from './FormToDo';
import ListarTarefas from './ListarTarefas';
import EditInput from './EditInput';
import checkButton from '../icons/checkicon.png';
import deleteButton from '../icons/deleteButton.png';
import editButton from '../icons/editIcon.png';

export default (props) => {

    useEffect(() => {
        fetchToDos();
    }, [])

    const [descricoes, setDescricoes] = useState([]);
    const [status, setStatus] = useState(false);
    const [filteredTodos, setFilteredTodos] = useState([]);
    const [showEditInput, setShowEditInput] = useState(false)
    const onClick = () => setShowEditInput(true)

    useEffect(() => {
        filterHandler();
    }, [descricoes])

    const filterHandler = () => {
        switch (status) {
            case true:
                setFilteredTodos(descricoes.filter(desc => desc.done === true));
                break;
            case false:
                setFilteredTodos(descricoes.filter(desc => desc.done === false));
                break;
            default:
                setFilteredTodos(descricoes);
                break;
        }
    }

    async function fetchToDos() {
        try {
            const response = await api.get(`/todos`);
            const descricoes = await response.data;
            setDescricoes(descricoes);
        } catch (e) {
            console.log(e);
        }

    }


    async function getFilteredToDos(propStatus) {

        if (propStatus == 'all') {
            setStatus('all');
            const response = await api.get(`/todos`);
            const descricoes = await response.data;
            setDescricoes(descricoes);
        }

        if (propStatus == 'true') {
            setStatus(true);
            propStatus = true;
            const response = await api.get(`/todos`);
            const descricoes = await response.data;
            setDescricoes(descricoes);
        }


        if (propStatus == 'false') {
            propStatus = false;
            setStatus(false);
            const response = await api.get(`/todos`);
            const descricoes = await response.data;
            setDescricoes(descricoes);

        }
    }



    async function addToDo(description, status) {
        const toDO = { description: description, done: status };

        try {
            const response = await api.post('/todos', toDO);
            console.log(response);
            fetchToDos();
        }
        catch (e) {
            console.log("Deu erro: " + e);
        }
    }

    //Funcao para remover Todo
    async function removeToDo(id) {
        try {
            const response = await api.delete('/todos/' + id);
            console.log(response);
            fetchToDos();
        }
        catch (e) {
            console.log("Deu erro: " + e);
        }
    }

    //Funcao para marcar como Concluida ou não concluida
    async function checkTodo(id, done) {

        if (done === true) {
            done = false;
        } else { done = true; }

        const todo = { done: done }

        try {
            const response = await api.put('/todos/' + id, todo);
            console.log(response.data);
            fetchToDos();
        }
        catch (e) {
            console.log("Deu erro: " + e);
        }

    }

    async function editTodo(id, description) {

        const todo = { description: description }

        try {
            const response = await api.put('/todos/' + id, todo);
            console.log(response.data);
            setShowEditInput(false);
            fetchToDos();
        }
        catch (e) {
            console.log("Deu erro: " + e);
            setShowEditInput(false);
        }
    }


    const onClickEditButton = () => {

        if(showEditInput === false){
            setShowEditInput(true);
        } else 
        setShowEditInput (false);
    }

    // {descricoes.map(desc => 
    //                         
    //                         
    //     (<li key={desc._id}><span>{desc.description}</span>
    //     <button> Editar </button>
    //     <button onClick={() => removeToDo(desc._id)}>Excluir</button></li>))}

    return (
        <div>
            <h2>Lista de Afazeres - Breno</h2>
            <Form addTodo={addToDo}></Form>
            <ListarTarefas list={getFilteredToDos}></ListarTarefas>
            <section className="sectionLista">
                <div className="listaTodos">
                    <ul>
                        {filteredTodos.map(filteredTodo => (
                            <li className={`li${filteredTodo.done ? "TodoFeito" : ''}`} key={filteredTodo._id}><span>{filteredTodo.description}</span>
                                <button className="botaoTodo" onClick={() => checkTodo(filteredTodo._id, filteredTodo.done)}><img src={checkButton}></img></button>
                                <button className="botaoTodo" onClick={() => removeToDo(filteredTodo._id)}> <img src={deleteButton}></img> </button>
                                <button className="botaoTodo" onClick={onClickEditButton}> <img src={editButton}></img> </button>
                                {showEditInput ? <EditInput editTodo={editTodo} keyEdit={filteredTodo._id} /> : null}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>

    )
}


{/* <ul>
    {descricoes.filter(desc => desc.done == status).map(filteredTodo =>
        (<li key={filteredTodo._id}><span>{filteredTodo.description}</span>
            <button> Editar </button>
            <button onClick={() => removeToDo(filteredTodo._id)}>Excluir</button></li>))}
</ul> */}