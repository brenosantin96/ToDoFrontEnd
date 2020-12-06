import React, {useState} from 'react'
import './ListarTarefas.css'

export default (props) => {

    const [status, setStatus] = useState(false);
    
    let promise = (e)   => {
        props.list(e.target.value);
    }


    return (
        <div>
            <form>
                <select id="selector1" name="selector"  onChange={promise}>
                    <option value={false} defaultValue="selected">Não realizadas</option>
                    <option value={true}>Realizadas</option>
                    <option value={"all"}>Todas</option>
                </select>
            </form>
        </div>
    )
}