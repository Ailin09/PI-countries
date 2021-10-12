import React from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCountryDetails } from '../actions/index';
import { useEffect, useState } from "react";
import s from "./CountryDetails.module.css";

export default function CountryDetail(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCountryDetails(props.match.params.idPais));
    }, [dispatch, props.match.params.idPais])
    const countryFound = useSelector((state) => state.details)
    return (
        <div className={s.bod}>
            {countryFound ?

                <div >
                    <div class={s.car}>
                        <h1>{countryFound.name}</h1>

                        <img src={countryFound.image} alt="Imagen no encontrada" width="100px" heigth="80px" ></img>


                        <h3>Id: {countryFound.id}</h3>
                        <h3>Continente: {countryFound.continent}</h3>
                        <h3>Capital: {countryFound.capital}</h3>
                        <h3>Region: {countryFound.subregion}</h3>
                        <h3>Area del país: {countryFound.area}</h3>
                        <h3>Poblacion: {countryFound.population}</h3>
                    </div>

                    <div className={s.activities}>
                        <h1>Actividades:</h1>
                        {countryFound.activities?.map((a) => {
                            return (<div>
                                <h2> {a.name}</h2>
                                <h3>Dificultad: {a.difficulty}</h3>
                                <h3>Duración: {a.duration} min.</h3>
                                <h3>Temporada: {a.season}</h3>
                            </div>
                            )
                        })}
                    </div>
                </div> : <p>Loading...</p>


            }
            <div>
                <Link to='/home'>
                    <button>Volver</button>
                </Link>

            </div>
        </div>
    )
}
