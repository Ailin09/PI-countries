import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css"
import './style.css'
export default function LandingPage() {
    return (
      <div >
        <h1>Bienvenidos a la App del Mundo</h1>
        <h3 className={styles.title} >Aquí podrás buscar, filtrar y ordenar todos los países, obtener información de cada uno así como también crear tus propias actividades turísticas.</h3>
      <div className="wrapper">

        <Link to="/home">
         <div >
      <div className="earth day"></div>
      <div className="earth night"></div>
    </div>
      </Link>
           
        </div >
        </div >
      

    )
}