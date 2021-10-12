import React from "react";

export default function card({ name, image, continent, id }) {
    return (
        <div >
            <h3>{name}</h3>
            <h5>{id}</h5>
            <h5>{continent}</h5>
            <img src={image} alt="image not found" width="100px" heigth="80px" />
        </div>

    )
}