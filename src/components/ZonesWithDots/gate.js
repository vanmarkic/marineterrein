import React, { useEffect, useState } from "react"
import generateRandomPoints from '../../utils/generateRandomPoints'
import style from './styles'

const Gate = ({ amount }) => {

  const polygonPoints = "M2020.8,718l136.8,353.4l398.6,396.2l68,-75.2l-442.4,-423.4l-104.6,-273.2l-56.4,22.2Z"
  const [randomPoints, setRandomPoints] = useState([])

  useEffect(() => {
    if (amount > 0) {
      setRandomPoints(generateRandomPoints(polygonPoints, Math.floor(amount)))
    }

  }, [amount]);

  return (
    <>

      <path id="gate" fill="white" d={polygonPoints} style={style.zones} />
      {randomPoints && randomPoints.map(point => (<circle fill={style.dots.fill} cx={point[0]} cy={point[1]} r={style.dots.radius}  />))}
    </>
  )
};

export default Gate