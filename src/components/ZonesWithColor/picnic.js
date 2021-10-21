import React, { useRef, useEffect, useState } from "react"

import generateRandomPoints from '../../utils/generateRandomPoints'


const style = {
    fillRule: "nonzero",
    stroke: "#000",
    strokeWidth: "8px",
}




const Picnic = ({ fillColor, amount }) => {
        const polygonPoints = "M2344.6,1255.2l-252,226.8l171,244.2l112.4,-64.8l180.2,-193.8l-211.6,-212.4Z"
        const [randomPoints, setRandomPoints] = useState([])

        useEffect(() => {
            if (amount > 0) {
                setRandomPoints(generateRandomPoints(polygonPoints, Math.floor(amount)))
            }

        }, [amount]);




        return (

                <
                > { /* <polygon id="picnic" points={polygonPoints} style={style} fill={fillColor} /> */ } <
                path id = "picnic"
                d = { polygonPoints }
                fill = "white"
                style = { style }
                /> {
                    randomPoints && randomPoints.map(point => ( < circle cx = { point[0] }
                            cy = { point[1] }
                            r = { style.dots.radius }
                            />))} <
                            />



                        );
                    }

                    export default Picnic