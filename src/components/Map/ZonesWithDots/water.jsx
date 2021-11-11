import React, { useEffect, useState } from "react"

import generateRandomPoints from '../../../utils/generateRandomPoints'


import style from './styles'


const Water = ({ amount }) => {
  const polygonPoints = "M142.85,546.85l41.4,-16.2l31.8,81l67.8,-32.4l46.8,66l-33,29.4l-2.4,-3l-25.8,-36.6l-76.8,37.2l-49.8,-125.4"
  const [randomPoints, setRandomPoints] = useState([])

  useEffect(() => {
    if (amount > 0) {
      setRandomPoints(generateRandomPoints(polygonPoints, Math.floor(amount)))
    }

  }, [amount]);





  return (<>
    <path id="water" d={polygonPoints} style={style.zones} />
    {randomPoints && randomPoints.map((point,index) => (<circle key={index} fill={"lightBlue"} cx={point[0]} cy={point[1]} r={style.dots.radius}  />))}
  </>

  );
}

export default Water