import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameCountries } from "../actions";
import style from "./SearchBar.module.css"

export default function SearchBar() {
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handleInputChange(e) {
        e.preventDefault()
        setName(e.target.value)

    }
    function handleSubmit(e) {
       
        e.preventDefault()
        dispatch(getNameCountries(name)) 
        setName("");
    }
    return (
        <div>
            <input className={style.inputt}
                type="text"
                placeholder="Buscar..."
                onChange={(e) => handleInputChange(e)} />
            <button type="submit" onClick={(e) => handleSubmit(e)} className={style.boton}>Buscar</button>
        </div>
    )
}