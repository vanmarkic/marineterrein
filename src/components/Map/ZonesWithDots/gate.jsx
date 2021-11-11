import React, { useEffect, useState } from "react"
import generateRandomPoints from '../../../utils/generateRandomPoints'
import style from './styles'

const Gate = ({ amount }) => {

  const polygonPoints = "M249.65 293.65l13.2-4.8 56.3 135.9 260 240-13.3 14.1-9-8.4v-.6h-1.2l-15 8.4-74.4-75 6.6-7.2-31.8-31.2-6.6 6.6-100.2-98.4-26.4-30-57.6-149.4"
  const [randomPoints, setRandomPoints] = useState([])

  useEffect(() => {
    if (amount > 0) {
      setRandomPoints(generateRandomPoints(polygonPoints, Math.floor(amount)))
    }

  }, [amount]);

  return (
    <>

      <path id="gate" d={polygonPoints} style={style.zones} />
      {randomPoints && randomPoints.map((point,index) => (<circle key={index} fill={"red"} cx={point[0]} cy={point[1]} r={style.dots.radius} />))}
    </>
  )
};

export default Gate