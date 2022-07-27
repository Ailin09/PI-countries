import React from "react";
import styles from "./Card.module.css"
export default function card({ name, image, continent, id }) {
    return (
        <>
            <img className={styles.img} src={image} alt="img not found" width="180px" heigth="80px"  />
            <h3 >{name}</h3>
            <h5>{continent}</h5>
            <h6>{id}</h6>
        </>

    )
}