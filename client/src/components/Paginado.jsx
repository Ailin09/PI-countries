import React from "react";
import styles from "./Paginado.module.css"
export default function Paginado({ countriesPerPage, allCountries, paginado }) {
    const pageNumbers = []

    for (let i = 0; i <= Math.floor(allCountries / countriesPerPage) - 1; i++) { //floor redondea para abajo
        pageNumbers.push(i + 1)

    }
    return (
        <nav>
            <ul className={styles.Paginado}>
                {pageNumbers && pageNumbers.map(number => (
                    <div className={styles.Paginado} key={number}>
                        <a onClick={() => paginado(number)}>{number}</a>
                    </div>
                ))}
            </ul>
        </nav>
    )
}