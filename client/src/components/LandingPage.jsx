import React from "react";
import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css"

export default function LandingPage() {
    return (
        <div className={styles.body}>
            <div>

                <h1>Por fin vacaciones!!!</h1>
                <h3>Bienvenido a tu diario online de viajes</h3>

                <Link to="/home">

                    <button>Has tus anotaciones aquí</button>

                </Link>
            </div>
        </div >

    )
}