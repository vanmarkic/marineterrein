import React, { useEffect, useState, useMemo, memo } from "react"

import generateRandomPoints from '../../utils/generateRandomPoints'


import style from './styles'






const Picnic = ({ amount }) => {
  const polygonPoints = "M1769.54 1290.32l-20.4-20.4-250.8 224.4 61.2 91.2 12-8.4 129.6 189.6 52.8-26.4-1.2-3.6 4.8-14.4 28.8-15.6 22.8 6 30-13.2 168-169.2-174-177.6-4.8 3.6-63.6 66-56.4-55.2 20.4-20.4-8.4-7.2 49.2-49.2"
  const [randomPoints, setRandomPoints] = useState([])

  useEffect(() => {
    if (amount > 0) {
      setRandomPoints(memoizedValue)
    }

  }, [amount]);


  const memoizedValue = useMemo(() => generateRandomPoints(polygonPoints, Math.floor(amount)), [amount]);



  return (

    <g>
      <path id="picnic" d={polygonPoints} fill="white" style={style.zones} />
      {randomPoints && randomPoints.map((point, index) => (<circle key={index} fill={"yellow"} cx={point[0]} cy={point[1]} r={style.dots.radius}  />))}
    </g>



  );
}

export default memo(Picnic)