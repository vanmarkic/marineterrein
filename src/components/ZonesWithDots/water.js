import React, { useEffect, useState } from "react"

import generateRandomPoints from '../../utils/generateRandomPoints'


import style from './styles'


const Water = ({ amount }) => {
  const polygonPoints = "M1186.34 1241.12l82.8-32.4 63.6 162 135.6-64.8 93.6 132-66 58.8-4.8-6-51.6-73.2-153.6 74.4-99.6-250.8"
  const [randomPoints, setRandomPoints] = useState([])

  useEffect(() => {
    if (amount > 0) {
      setRandomPoints(generateRandomPoints(polygonPoints, Math.floor(amount)))
    }

  }, [amount]);





  return (<>
    <path id="water" d={polygonPoints} style={style.zones} />
    {randomPoints && randomPoints.map((point,index) => (<circle key={index} fill={"white"} cx={point[0]} cy={point[1]} r={style.dots.radius}  />))}
  </>

  );
}

export default Water