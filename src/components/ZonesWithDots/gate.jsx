import React, { useEffect, useState } from "react"
import generateRandomPoints from '../../utils/generateRandomPoints'
import style from './styles'

const Gate = ({ amount }) => {

  const polygonPoints = "M1399.94 734.721l26.4-9.6 82.8 213.6 550.8 537.6-27.6 28.8-18-16.8v-1.2h-2.4l-30 16.8-148.8-150 13.2-14.4-63.6-62.4-13.2 13.2-200.4-196.8-52.8-60-115.2-298.8"
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