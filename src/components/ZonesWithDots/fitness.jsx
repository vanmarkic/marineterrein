import React, { useEffect, useState } from "react"

import generateRandomPoints from '../../utils/generateRandomPoints'

import style from './styles'

const Fitness = ({ amount }) => {

  const polygonPoints = "M1708.8,288.2l105.4,267.6l-225.2,81.2l-60,-147.4l168,-189.2l11.8,-12.2Z"
  const [randomPoints, setRandomPoints] = useState([])

  useEffect(() => {
    if (amount > 0) {
      setRandomPoints(generateRandomPoints(polygonPoints, Math.floor(amount)))
    }

  }, [amount]);


  return (
    <g>
      <path id="fitnesstuin" fill="white" d={polygonPoints} style={style.zones} />
      {randomPoints && randomPoints.map((point,index) => (<circle key={index} fill={style.dots.fill} cx={point[0]} cy={point[1]} r={style.dots.radius}  />))}
    </g>

  );

}
export default Fitness






