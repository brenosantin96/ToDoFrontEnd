import React, { useState } from 'react';
import './FormToDo.css';


export default (props) => {

    const [description, setDescription] = useState('');
    const [status, setStatus] = useState(false);



    let selectStatus = (e) => {
        setStatus(e.target.value);
    }

    let selectDescription = (e) => {
        setDescription(e.target.value);
    }

    let submitHandler = (e) => {
        e.preventDefault();
        props.addTodo(description, status);
        console.log(description + " e " + status);
    }


    return (
        <div>
            <form onSubmit={submitHandler}>
                <div className="CabecalhoForm">
                    <label>Adicionar Tarefa:</label>
                    <input type="text" name="description" value={description} onChange={selectDescription}></input>
                </div>
                <label htmlFor="done">Tarefa Realizada:</label>
                <select id="done" name="done" onChange={selectStatus}>
                    <option value={false}>Não</option>
                    <option value={true}>Sim</option>
                </select>
                <button type="submit">Adicionar</button>
            </form>
        </div>
    )
}