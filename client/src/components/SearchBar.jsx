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
        dispatch(getNameCountries(name)) //name= estado local
        setName("");
    }
    return (
        <div>
            <input className={style.input}
                type="text"
                placeholder="Buscar..."
                onChange={(e) => handleInputChange(e)} />
            <button type="submit" onClick={(e) => handleSubmit(e)}>Buscar</button>
        </div>
    )
}