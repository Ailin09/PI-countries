import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, filterCountriesByContinent, filterByAlphabet, filterByPopulation } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import style from "./Home.module.css";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";

export default function Home() {
    const dispatch = useDispatch();
    const allCountries = useSelector((state) => state.countries) // useSelector me trae todo lo que está en el estado de countries
    const [orden, setOrden] = useState('');
    const [filterContinent, setFilterContinent] = useState("All")
    const [filterSeason, setFilterSeason] = useState("All")
    //logica de los estados

    //paginado
    const [currentPage, setCurrentPage] = useState(1); // estado con pagina actual y un estado que me setee la pagin actual.
    const [countriesPerPage, setCountriesPerPage] = useState(10)
    const indexOfLastCountry = currentPage * countriesPerPage //10  
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage
    const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry)


    //ayuda a renderizar
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getCountries()); // = mapdispatchtoprops
        setCountriesPerPage(10)
    }, [dispatch]) // [] para que no se me genere un loop infinito de llamados

    //handlers

    function handlerClick(e) {
        e.preventDefault();
        dispatch(getCountries());
    }

    function handlerFilterContinent(e) {
        setFilterContinent(e.target.value) // guarda lo que selecciona el usuario dentro del estado del componente y se lo mando  mas lo que haya seleccionado en el season
        dispatch(filterCountriesByContinent({ continent: e.target.value, season: filterSeason }))
    }

    function handleSortByAlphabet(e) {
        e.preventDefault();
        dispatch(filterByAlphabet(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`);
    }
    function handleSortPopulation(e) {
        e.preventDefault();
        dispatch(filterByPopulation(e.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`); //arranca vacio y lo seteo, hermoso estado local
    }
    function handleFilterBySeason(e) {
        setFilterSeason(e.target.value)
        dispatch(filterCountriesByContinent({ season: e.target.value, continent: filterContinent })); // le mando lo que selecciono del season mas lo que ya hay seleccionado en el continente
    }


    return (
        <div className={style.body}>

            <h1>Actividades turísticas de todo el mundo </h1>
            <button onClick={e => { handlerClick(e) }}>
                Volver a cargar todos los paises
            </button>

            <Link to="/activity"><button>
                Crear actividad turistica
            </button></Link>
            <div>
                <select onChange={(e) => handleSortByAlphabet(e)}>

                    <option value="asc">A-Z</option>
                    <option value="des">Z-A</option>
                </select>
                <select onChange={(e) => handleSortPopulation(e)}>
                    <option value="poblation">Población</option>
                    <option value="asc">Menor pablacion</option>
                    <option value="des">Mayor Poblacion</option>
                </select>
                <label htmlFor="filtroContinente">Continentes</label>
                <select name="filtroContinente" onChange={e => handlerFilterContinent(e)}>
                    <option value="All">Todos</option>
                    <option value="Europe">Europa</option>
                    <option value="Oceania">Oceania</option>
                    <option value="Americas">America</option>
                    <option value="Africa">Africa</option>
                    <option value="Asia">Asia</option>
                    <option value="Antarctic">Antártida</option>
                </select>
                <label htmlFor="filtroActividades">Actividades Turísticas</label>
                <select name="filtroActividades" onChange={e => handleFilterBySeason(e)}>
                    <option value="All">Todas</option>
                    <option value="Summer">Temporada de verano </option>
                    <option value="Autumn">Temporada de otoño </option>
                    <option value="Winter">Temporada de invierno </option>
                    <option value="Spring">Temporada de primavera </option>
                </select>

                <Paginado
                    countriesPerPage={countriesPerPage}
                    allCountries={allCountries.length} //necesito un valor numerico
                    paginado={paginado}
                />
                <SearchBar />
                {currentCountries.map((e) => {
                    return (

                        <div key={e.id} className={style.card}>
                            <Link to={"/countries/" + e.id}>
                                <Card name={e.name} image={e.image} continent={e.continent} id={e.id} />
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )

}