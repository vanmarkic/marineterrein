import React, { useEffect, useState } from "react"

import generateRandomPoints from '../../utils/generateRandomPoints'


import style from './styles'






const Picnic = ({ amount }) => {
  const polygonPoints = "M2344.6,1255.2l-252,226.8l171,244.2l112.4,-64.8l180.2,-193.8l-211.6,-212.4Z"
  const [randomPoints, setRandomPoints] = useState([])

  useEffect(() => {
    if (amount > 0) {
      setRandomPoints(generateRandomPoints(polygonPoints, Math.floor(amount)))
    }

  }, [amount]);




  return (

    <g>
      <path id="picnic" d={polygonPoints} fill="white" style={style.zones} />
      {randomPoints && randomPoints.map(point => (<circle fill={style.dots.fill} cx={point[0]} cy={point[1]} r={style.dots.radius}  />))}
    </g>



  );
}

export default Picnic