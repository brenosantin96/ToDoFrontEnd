import React, {useState} from 'react';

export default (props) => {

    const [descricaoEdit, setDescricaoEdit] = useState('');

    let selectDescriptionEdit = (e) => {
        setDescricaoEdit(e.target.value);
    }

    let submitHandler = (e) => {
        e.preventDefault();
        console.log(props.keyEdit);
        props.editTodo(props.keyEdit, descricaoEdit);
        
    }

    return(
        <form onSubmit={submitHandler}>
            <input type="text" name="description" value={descricaoEdit} onChange={selectDescriptionEdit}></input>
            <button type="submit">Alterar</button>
        </form>
        
    )
}