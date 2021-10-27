import React, { useEffect, useState } from "react"

import generateRandomPoints from '../../utils/generateRandomPoints'


import style from './styles'


const Water = ({ amount }) => {
  const polygonPoints = "M2157.6,1071.4l-350.4,139.8l138.6,304.2l109,-75.6l37.8,42.2l252,-226.8l-187,-183.8Z"
  const [randomPoints, setRandomPoints] = useState([])

  useEffect(() => {
    if (amount > 0) {
      setRandomPoints(generateRandomPoints(polygonPoints, Math.floor(amount)))
    }

  }, [amount]);





  return (<>
    <path id="water" fill="white" d={polygonPoints} style={style.zones} />
    {randomPoints && randomPoints.map(point => (<circle fill={style.dots.fill} cx={point[0]} cy={point[1]} r={style.dots.radius}  />))}
  </>

  );
}

export default Water