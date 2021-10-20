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

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
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
            setErrors(validate({
                ...input,
                difficulty: e.target.value

            }))
        }
    }
    function handleSelect(e) {
        setInput({
            ...input,
            countries: [...input.countries, e.target.value]
        })
        setErrors(validate({
            ...input,
            countries: e.target.value

        }))
    }
    function handleSeason(e) {
        console.log(e.target.value)
        setInput({
            ...input,
            season: e.target.value
        })
        setErrors(validate({
            ...input,
            season: e.target.value

        }))
    }
    function handleSubmit(e) {
        e.preventDefault();
        if (Object.keys(errors).length > 0) {
            alert("Todos los campos deben estar completados")
        } else {
            dispatch(postActivity(input))
            alert("Actividad creada!")
            history.push("./home")
        }
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

            <div >
                <form onSubmit={(e) => handleSubmit(e)} >
                    <div className={styles.card}>
                        <h1>Crea tu actividad aquí  ↓</h1>

                        <div>

                            <label>Nombre: </label>

                            <br />
                            <input type="text" value={input.name} name="name" onChange={(e) => handleChange(e)} />
                            {errors.name && (
                                <p className={styles.error}>{errors.name}</p>
                            )}
                        </div>
                        <br />
                        <div className={styles.difficulty}>

                            <label>Dificultad: </label>
                            <br />
                            <label><input type="checkbox" value="1" name="Uno" onChange={(e) => handleCheck(e)} />1</label>
                            <label><input type="checkbox" value="2" name="Dos" onChange={(e) => handleCheck(e)} />2</label>
                            <label><input type="checkbox" value="3" name="Tres" onChange={(e) => handleCheck(e)} />3</label>
                            <label><input type="checkbox" value="4" name="Cuatro" onChange={(e) => handleCheck(e)} />4</label>
                            <label><input type="checkbox" value="5" name="Cinco" onChange={(e) => handleCheck(e)} />5</label>
                            {errors.difficulty && (
                                <p className={styles.error}>{errors.difficulty}</p>
                            )}
                        </div>
                        <br />
                        <div className={styles.duration}>

                            <label>Duración: </label>
                            <br />
                            <input type="text" value={input.duration} name="duration" onChange={(e) => handleChange(e)} />
                            {errors.duration && (
                                <p className={styles.error}>{errors.duration}</p>
                            )}
                        </div>
                        <br />
                        <div className={styles.season}>

                            <label>Temporada del año: </label>
                            <br />
                            <label><input type="checkbox" value="Spring" name="Spring" onChange={(e) => handleSeason(e)} />Primavera</label>
                            <label><input type="checkbox" value="Summer" name="Summer" onChange={(e) => handleSeason(e)} />Verano</label>
                            <label><input type="checkbox" value="Autumn" name="Autumn" onChange={(e) => handleSeason(e)} />Otoño</label>
                            <label><input type="checkbox" value="Winter" name="Winter" onChange={(e) => handleSeason(e)} />Invierno</label>
                            {errors.season && (
                                <p className={styles.error}>{errors.season}</p>
                            )}
                        </div>
                        <br />
                        <div className={styles.country}>
                            <label>Paises: </label>
                            <br />
                            <select onChange={(e) => handleSelect(e)}>
                                {countriesFounded.map((country) => (
                                    <option value={country.name}>{country.name}</option>
                                ))}
                            </select >
                        </div>
                        <br />
                        {input.countries.map((e) => (
                            <div >
                                <p>{e}</p>
                                <button
                                    className={styles.btn}
                                    onClick={() => {
                                        handleDelete(e);
                                    }}
                                >X</button>
                            </div>
                        ))}
                        <button type="submit" >Crear actividad turística</button>

                        <Link to="/home"><button>Volver</button></Link>
                    </div>

                </form>
            </div>
        </div>



    )
}