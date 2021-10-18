import React from "react"

const style = {
    fillRule: "nonzero",
    stroke: "#000",
    strokeWidth: "8px",
}

const Picnic = ({ fillColor }) => (
    <>
        <path id="picnic" d="M2344.6,1255.2l-252,226.8l171,244.2l112.4,-64.8l180.2,-193.8l-211.6,-212.4Z" fill={fillColor} style={style} />
    </>


);

export default Picnic