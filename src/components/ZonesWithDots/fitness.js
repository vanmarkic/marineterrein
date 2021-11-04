import React, { useEffect, useState } from "react"

import generateRandomPoints from '../../utils/generateRandomPoints'

import style from './styles'

const Fitness = ({ amount }) => {

  const polygonPoints = "M1095.14,378.321l-22.8,-57.6l-169.2,189.6l62.4,159.6l211.2,-81.6l-63.6,-164.4l-85.2,158.4l-32.4,-18l99.6,-186"
  const [randomPoints, setRandomPoints] = useState([])

  useEffect(() => {
    if (amount > 0) {
      setRandomPoints(generateRandomPoints(polygonPoints, Math.floor(amount)))
    }

  }, [amount]);


  return (
    <g>
      <path id="fitnesstuin" fill="white" d={polygonPoints} style={style.zones} />
      {randomPoints && randomPoints.map((point,index) => (<circle key={index} fill={"lightBlue"} cx={point[0]} cy={point[1]} r={style.dots.radius}  />))}
    </g>

  );

}
export default Fitness






