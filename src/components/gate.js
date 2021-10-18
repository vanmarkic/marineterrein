import { group } from "d3-array"
import React from "react"

const style = {
    fillRule:"nonzero",
    stroke:"#000",
    strokeWidth:"8px",
}

const Gate = ({fillColor, amount}) => {
    console.log(amount)

return (

        <path id="gate" fill={fillColor} d="M2020.8,718l136.8,353.4l398.6,396.2l68,-75.2l-442.4,-423.4l-104.6,-273.2l-56.4,22.2Z" style={style}/>

)};

export default Gate