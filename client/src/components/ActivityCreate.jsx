import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postActivity, getCountries } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Activity.module.css";

function validate(input) {
    let errors = {};
    if (!input.name)
        errors.name = "Se requiere un Nombre";
    if (!input.difficulty)
        errors.difficulty = "Se requiere un Dificultad";
    if (!input.duration)
        errors.duration = "Se requiere un Duración";
    if (!input.season)
        errors.season = "Se requiere un Temporada del año";

    return errors;
}

export default function ActivityCreate() {
    const dispatch = useDispatch();
    const history = useHistory();
    const countriesFounded = useSelector((state) => state.countries);
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({  //guardo mi formulario
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        countries: []
    })

    function handleChange(e) { // guardar las cosas que el usuario coloca en input
        setInput({
            ...input,
            [e.target.name]: e.target.value // target.name=  agarra el target name y lo completa con el valor del usuario
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }
    function handleCheck(e) {
        if (e.target.checked) {
            setInput({
                ...input,
                difficulty: e.target.value
            })
        }
    }
    function handleSelect(e) {
        setInput({
            ...input,
            countries: [...input.countries, e.target.value]
        })
    }
    function handleSeason(e) {
        console.log(e.target.value)
        setInput({
            ...input,
            season: e.target.value
        })
    }
    function handleSubmit(e) {
        e.preventDefault();
        dispatch(postActivity(input))
        alert("Actividad creada!")
        setInput({
            name: "",
            difficulty: "",
            duration: "",
            season: "",
            countries: []
        })
        history.push("./home")
    }

    useEffect(() => {
        dispatch(getCountries());
    }, []);

    function handleDelete(el) {
        setInput({
            ...input,
            countries: input.countries.filter((e) => e !== el),
        });
    }
    return (
        <div className={styles.body}>

            <h1>Crea tu actividad aquí  ↓</h1>
            <form onSubmit={(e) => handleSubmit(e)} >
                <div className={styles.card}>

                    <div>
                        <label>Nombre: </label>
                        <input type="text" value={input.name} name="name" onChange={(e) => handleChange(e)} />
                        {errors.name && (
                            <p className="error">{errors.name}</p>
                        )}
                    </div>
                    <div>
                        <label>Dificultad: </label>
                        <label><input type="checkbox" value="1" name="Uno" onChange={(e) => handleCheck(e)} />1</label>
                        <label><input type="checkbox" value="2" name="Dos" onChange={(e) => handleCheck(e)} />2</label>
                        <label><input type="checkbox" value="3" name="Tres" onChange={(e) => handleCheck(e)} />3</label>
                        <label><input type="checkbox" value="4" name="Cuatro" onChange={(e) => handleCheck(e)} />4</label>
                        <label><input type="checkbox" value="5" name="Cinco" onChange={(e) => handleCheck(e)} />5</label>
                        {errors.difficulty && (
                            <p className="error">{errors.difficulty}</p>
                        )}
                    </div>
                    <div>
                        <label>Duración: </label>
                        <input type="text" value={input.duration} name="duration" onChange={(e) => handleChange(e)} />
                        {errors.duration && (
                            <p className="error">{errors.duration}</p>
                        )}
                    </div>
                    <div>
                        <label>Temporada del año: </label>
                        <label><input type="checkbox" value="Spring" name="Spring" onChange={(e) => handleSeason(e)} />Primavera</label>
                        <label><input type="checkbox" value="Summer" name="Summer" onChange={(e) => handleSeason(e)} />Verano</label>
                        <label><input type="checkbox" value="Autumn" name="Autumn" onChange={(e) => handleSeason(e)} />Otoño</label>
                        <label><input type="checkbox" value="Winter" name="Winter" onChange={(e) => handleSeason(e)} />Invierno</label>
                        {errors.season && (
                            <p className="error">{errors.season}</p>
                        )}
                    </div>
                    <div>
                        <label>Paises: </label>
                        <select onChange={(e) => handleSelect(e)}>
                            {countriesFounded.map((country) => (
                                <option value={country.name}>{country.name}</option>
                            ))}
                        </select >
                    </div>
                    {input.countries.map((e) => (
                        <div >
                            <p>{e}</p>
                            <button

                                onClick={() => {
                                    handleDelete(e);
                                }}
                            >
                                X
                            </button>
                        </div>
                    ))}
                    <button type="submit">Crear actividad turística</button>

                    <Link to="/home"><button>Volver</button></Link>
                </div>

            </form>
        </div>



    )
}