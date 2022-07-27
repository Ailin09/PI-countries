import React from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCountryDetails, resetDetail } from '../actions/index';
import { useEffect} from "react";
import s from "./CountryDetails.module.css";

export default function CountryDetail(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCountryDetails(props.match.params.idPais));
    }, [dispatch, props.match.params.idPais])
    useEffect(() => {
        return () => {
            dispatch(resetDetail())
        }
    }, [dispatch])
    const countryFound = useSelector((state) => state.details)
    const traducir = (season) => {
        switch (season) {
            case "Summer":
                return "Verano"
            case "Spring":
                return "Primavera"
            case "Autumn":
                return "Otoño"
            case "Winter":
                return "Invierno"
            default:
                return " "

        }
    }
    return (
        <div  >

                    <div className={s.botonDetail}>
                       <Link to='/home'>
                       <button >Volver</button>
                      </Link>

                    </div>
            {countryFound ?
                <div  className={s.container}>
                    <div className={s.car}>
                      <div className={s.title}>

                        <h1>{countryFound.name}</h1>
                      </div>
                        <div className={s.countryDetail}>
                        <img src={countryFound.image} alt="Imagen no encontrada" ></img>
                        <h4>Id: {countryFound.id}</h4>
                        <h4>Continente: {countryFound.continent}</h4>
                        <h4>Capital: {countryFound.capital}</h4>
                        <h4>Region: {countryFound.subregion}</h4>
                        <h4>Area del país: {countryFound.area}</h4>
                        <h4>Poblacion: {countryFound.population}</h4>
                        </div>
                    </div>

                    <div className={s.activities}>
                    <div className={s.title}>
                        <h1>Actividades</h1>
                        </div>
                        {countryFound.activities?.map((a) => {
                            return (<div key={a.id} className={s.activity}>
                                <h2> {a.name}</h2>
                                <h4>Dificultad: {a.difficulty}</h4>
                                <h4>Duración: {a.duration} min.</h4>
                                <h4>Temporada: {traducir(a.season)}</h4>
                            </div>
                            )
                        })}
                    </div>
          
                </div> : <p>Loading...</p>


            }
        </div>
    )
}
