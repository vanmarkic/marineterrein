import React from "react"

const style = {
    fillRule: "nonzero",
    stroke: "#000",
    strokeWidth: "8px",
}

const Water = ({ fillColor }) => (

    <path id="water" fill={fillColor} d="M2157.6,1071.4l-350.4,139.8l138.6,304.2l109,-75.6l37.8,42.2l252,-226.8l-187,-183.8Z" style={style} />

);

export default Water