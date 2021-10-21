
import React from "react"

const style = {
  fillRule: "nonzero",
  stroke: "#000",
  strokeWidth: "8px",
}

const Gate = ({ fillColor }) => {


  return (
    <>

      <polygon id="" points="2021 718, 2158 1071, 2556 1468, 2624 1392, 2182 969, 2077 696, 2021 718" fill={fillColor} style={style} />
    </>
  )
};

export default Gate