import React, { useEffect, useState } from 'react';

import Slider, { Range, Handle, SliderTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';
import styled from "styled-components"
import * as d3Array from 'd3-array'
// import { schemeYlOrRd as scheme, interpolateYlOrRd } from 'd3-scale-chromatic'
import { scaleLinear, scaleQuantile, scaleThreshold } from 'd3-scale'


// import XS from "../images/0-10.png"
// import S from "../images/10-20.png"
// import M from "../images/20-30.png"
// import L from "../images/30-40.png"

import breakpoint from '../styles/globalStyle'

import camData from "../../content/oneyearfourcamsbyday.json"
import densityPeakPerDay from "../../content/density_day.json"

import weatherData from "../../content/schiphol_weather.json"


import Picnic from "./Map/ZonesWithDots/picnic"
import Water from "./Map/ZonesWithDots/water"
import Fitness from './Map/ZonesWithDots/fitness'
import Gate from "./Map/ZonesWithDots/gate"
import BarChart from './BarChart';
import MtMap from './Map/Map';


const weatherDataDates = weatherData.map(el => el.date.substring(0, 10))
const weatherDataAverageTemp = weatherData.map(el => el.TG / 10)


const minDensity = d3Array.min(Object.values(densityPeakPerDay).map(el => el))
const maxDensity = d3Array.max(Object.values(densityPeakPerDay).map(el => el.SwimmingArea))


const waterMin = d3Array.min(Object.values(camData.content.water))
const waterMax = d3Array.max(Object.values(camData.content.water))
const picnicMin = d3Array.min(Object.values(camData.content.picnic))
const picnicMax = d3Array.max(Object.values(camData.content.picnic))
const gateMin = d3Array.min(Object.values(camData.content.gate))
const gateMax = d3Array.max(Object.values(camData.content.gate))
const fitnessMin = d3Array.min(Object.values(camData.content.fitness))
const fitnessMax = d3Array.max(Object.values(camData.content.fitness))
const temperatureMin = d3Array.min(weatherDataAverageTemp)
const temperatureMax = d3Array.max(weatherDataAverageTemp)




const extents = {
  water: { min: waterMin, max: waterMax, range: waterMax - waterMin },
  gate: { min: gateMin, max: gateMax, range: gateMax - gateMin },
  picnic: { min: picnicMin, max: picnicMax, range: picnicMax - picnicMin },
  fitness: { min: fitnessMin, max: fitnessMax, range: fitnessMax - fitnessMin },
  temperature: { min: temperatureMin, max: temperatureMax, range: temperatureMax - temperatureMin },

}


let myData = [0, 1, 2, 3, 4];

let densityColors = ['white', "#ffffb2", "#fecc5c", "#fd8d3c", "#bd0026"]
let densityLabels = ['no data', "0-10", "10-20", "20-30", "30-40"]
let densityPictures = ['no-data', "0-10", "10-20", "20-30", "30-40"]


let quantileScale = scaleQuantile()
  .domain(myData)
  .range(['#ffffb2"', '#fecc5c', '#fd8d3c', "#e31a1c"]);

let thresholdScale = scaleThreshold()
  .domain([0, 1, 2, 3])
  .range(densityColors);



const sliderStyle = {
  // width: '85vw',
  marginTop: 'auto', marginBottom: 'auto'
};

// const getRatio = (key, amount) => amount / extents[key].range

// const getColor = (key, density) => {
//   // const ratio = getRatio(key, amount)
//   // return interpolateYlOrRd(ratio)
// // TODO create 4 discrete values/colors based on differents densities
//   // ["#ffffb2","#fecc5c","#fd8d3c","#e31a1c"]

//    return 
// }

const tempColors = scaleLinear()
  .domain([extents.temperature.min, 10, extents.temperature.max])
  .range(['cyan', 'white', 'red']);

const temperatureColors = weatherDataAverageTemp.map(t => {

  return tempColors(t)
})


const totalAmountOfVisitors = weatherDataDates.map((el, idx) => {
  const picnicAmount = camData.content.picnic[el] === undefined ? 10 : camData.content.picnic[el]
  const fitnessAmount = camData.content.fitness[el] === undefined ? 10 : camData.content.fitness[el]
  const waterAmount = camData.content.water[el] === undefined ? 10 : camData.content.water[el]
  const gateAmount = camData.content.gate[el] === undefined ? 10 : camData.content.gate[el]
  return Math.round(
    picnicAmount +
    waterAmount +
    fitnessAmount +
    gateAmount
  )


})


const Button = styled.div`
z-index:100;
  border-radius: 3px;
  padding: 0.5rem .5rem;
  margin: 0.5rem 0rem 0.5rem 1rem;
  min-width: 40px;
  height: 24px;
  background: darkblue;
  color: white;
  cursor: pointer;
align-self: flex-end;
justify-content: center;
text-align: center;

`
const Row = styled.div`
        display: flex;
        margin:0px;
`

const Wrapper = styled.div`
        display: flex;

        flex-direction: column;
    align-items: center;

   display: flex;
    flex-direction:column;
    @media only screen and ${breakpoint.device.xs}{
      height:95vh;
      justify-content: space-between;
      width:90vw;
      margin:auto;

    }
    @media only screen and ${breakpoint.device.sm}{
         justify-content: space-between;
padding:20px;
    }
    @media only screen and ${breakpoint.device.lg}{
        justify-content: space-between;
padding:20px;
padding: 100px , 0px;
    }
      
`
const TopComponent = styled.div`
    display: flex;
    flex-direction:column;
    @media only screen and ${breakpoint.device.xs}{
        flex-direction: column;
    }
    @media only screen and ${breakpoint.device.sm}{
        flex-direction: row;
    }
    @media only screen and ${breakpoint.device.lg}{
        flex-direction: row;
justify-content: space-around;
width:95vw;

    }
`;
const LegendWrapper = styled.div`

    display: flex;
    flex-direction:column;
    @media only screen and ${breakpoint.device.xs}{
        flex-direction: row;
        max-width:95vw;
        margin: auto;
    }
    @media only screen and ${breakpoint.device.sm}{
        flex-direction: column;
        margin: 50px 10px;

    }
    @media only screen and ${breakpoint.device.lg}{

        flex-direction:column;
        margin:20px 0px;
    }
`;
const Legend = styled.div`

    display: flex;
    flex-direction:row;
    @media only screen and ${breakpoint.device.xs}{
        flex-direction: column;
        align-items: center;
margin: 0px 10px;
    }
    @media only screen and ${breakpoint.device.sm}{
        flex-direction: row;
        align-items: center;
flex-wrap: wrap;
justify-content: flex-end;
    }
    @media only screen and ${breakpoint.device.lg}{
        display: flex;
        flex-direction:row;
        margin: 10px 0px;
        width: 20vw;
        justify-content: space-between;
    }
`;


const AmountsContainer = styled.div`
        max-width: 250px;
        min-width: 250px;
`

const Thermometer = styled.div`
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: flex;
        color: white;
        justify-content: center;
        align-items: center;
        font-size: 1em;
        font-weight: 700;
        margin:15px;
        background: rgb(11,11,11);
        background: linear-gradient(180deg, rgba(11,11,11,1) 0%, rgba(89,89,89,1) 100%);
`


const Metrics = styled.h2`
  margin:0px;
`

const Bar = styled.div`
  width: ${props => props.ratio * 100}%;
  background-color: darkblue;
  height: 20px;

`
const VerticalNeedle = styled.div`
  display: block;
  width:1px;
  height: 10vh;
 margin: auto;
 margin-top: -10vh;
  background-color:white;
`

const handle = props => {
  const { value, dragging, index, ...restProps } = props;
  return (

    <Handle value={value} {...restProps} >
      <VerticalNeedle />
    </Handle>

  );
};

// const DensityLabel = ({ label, color, picture }) => (
//     <Picture file={picture} />
// )

const DensityLabel = styled.div(({ label, color, picture }) => `
    min-width: 400px;  
    background-image: url("../images/${picture}.png");
`)



const TempStrip = () => {
  return (<svg height="10" width="100%">
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
        {temperatureColors.map((color, idx) => {
          return <stop key={idx} offset={idx / (temperatureColors.length - 1)} style={{
            "stopColor": color,
            "stopOpacity": 1
          }} />;
        })}
      </linearGradient>
    </defs>
    <rect width="100%" height="15" fill="url('#grad1')" />
  </svg>);
}


const ZonesColors = () => {

  const [dateIndex, setDateIndex] = useState(0);
  const [intervalId, setIntervalId] = useState(undefined);
  const [isPlaying, setIsPlaying] = useState(false);

  let picnicAmount = camData.content.picnic[weatherDataDates[dateIndex]]
  let waterAmount = camData.content.water[weatherDataDates[dateIndex]]
  let fitnessAmount = camData.content.fitness[weatherDataDates[dateIndex]]
  let gateAmount = camData.content.gate[weatherDataDates[dateIndex]]

  let picnicDensity = densityPeakPerDay[weatherDataDates[dateIndex]] &&
    densityPeakPerDay[weatherDataDates[dateIndex]]['Picnic'] != ''
    ?
    Math.round(parseFloat(densityPeakPerDay[weatherDataDates[dateIndex]]['Picnic'])) * 3
    : undefined

  let waterDensity = densityPeakPerDay[weatherDataDates[dateIndex]] &&
    densityPeakPerDay[weatherDataDates[dateIndex]]['SwimmingArea'] != ''
    ?
    Math.round(parseFloat(densityPeakPerDay[weatherDataDates[dateIndex]]['SwimmingArea'])) * 3
    : undefined
  let fitnessDensity = densityPeakPerDay[weatherDataDates[dateIndex]] &&
    densityPeakPerDay[weatherDataDates[dateIndex]]['Fitness'] != ''
    ?
    Math.round(parseFloat(densityPeakPerDay[weatherDataDates[dateIndex]]['Fitness'])) * 3
    : undefined
  let gateDensity = densityPeakPerDay[weatherDataDates[dateIndex]] &&
    densityPeakPerDay[weatherDataDates[dateIndex]]['Terrace'] != ''
    ?
    Math.round(parseFloat(densityPeakPerDay[weatherDataDates[dateIndex]]['Terrace'])) * 3
    : undefined

  useEffect(() => {
    console.log(picnicDensity)
    if (dateIndex === weatherDataDates.length - 1) clearInterval(intervalId)
  }, [dateIndex]);

  const playSlider = () => {
    if (isPlaying && intervalId) {
      clearInterval(intervalId)
      setIsPlaying(false)
      return
    }
    let intervalIds = setInterval(() => setDateIndex(dateIndex => dateIndex + 1), 200)
    setIntervalId(intervalIds)
    setIsPlaying(true)
  }





  return (

    <Wrapper>




      <TopComponent>
        <LegendWrapper>
          <Legend>

          </Legend>
          <Legend>

          </Legend>
          <Legend>

          </Legend>
          <Legend>

          </Legend>

        </LegendWrapper>
        <Row style={{ height: '65vh' }}>
          <MtMap>
            <Picnic amount={picnicDensity} />
            <Water amount={waterDensity} />
            <Fitness amount={fitnessDensity} />
            <Gate amount={gateDensity} />
          </MtMap>
        </Row>
        <LegendWrapper>
          <Legend style={{ color: 'lightblue' }}>
            Water
          </Legend>
          <Legend style={{ color: 'red' }}>
            Gate
          </Legend>
          <Legend style={{ color: 'white' }}>
            Fitnesstuin
          </Legend>
          <Legend style={{ color: 'yellow' }}>
            Picnic
          </Legend>

        </LegendWrapper>


      </TopComponent>

      <Row style={{ justifyContent: "space-evenly", width: "100%" }}>


        <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
          <div>temperature</div>
          <Metrics>

            {weatherDataAverageTemp[dateIndex]}°C
          </Metrics>
        </div>
        <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', width: '200px' }}>
          <div>date</div>
          <Row >
            <Metrics style={{ width: '40px' }}>{weatherDataDates[dateIndex].substring(8, 11)}-</Metrics>
            <Metrics style={{ width: '40px' }}>{weatherDataDates[dateIndex].substring(5, 7)}-</Metrics>
            <Metrics>{weatherDataDates[dateIndex].substring(0, 4)}</Metrics>
          </Row>
        </div>

        <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }} >
          <div>visitors</div>
          <Metrics>
            {totalAmountOfVisitors[dateIndex]}
          </Metrics>
        </div>

      </Row>

      <Row
      // style={{ maxWidth: '95vw' }}
      >
        <div style={{
          "WebkitTouchCallout": "none",
          "WebkitUserSelect": "none",
          "KhtmlUserSelect": "none",
          "MozUserSelect": "none",
          "MsUserSelect": "none",
          "UserSelect": "none",
          "WebkitTapHighlightColor": "rgba(0,0,0,0)",
          display: 'flex', flexDirection: 'column',
        }}>
          <Row style={sliderStyle}>

            <BarChart data={totalAmountOfVisitors} height="100" width="4000" />
          </Row>
          <Row style={sliderStyle}>
            <TempStrip />
          </Row>
          {/* <Row style={{ width: '100%', justifyContent: 'space-around' , marginLeft: '1.4%'}}>
            <VerticalNeedle />
            <VerticalNeedle />
            <VerticalNeedle />
            <VerticalNeedle />
          </Row> */}
          <Row style={{ ...sliderStyle, marginTop: "30px" }}>
            <Slider
              marks={{
                330: 'Een nieuwe stadswijk',
                210: 'Drukte in de Fitnesstuin',
                69: 'Crowd control',
                150: 'Van wie zijn de data? '
              }}
              min={0}
              max={weatherDataDates.length - 1}
              included={false}
              onChange={value => setDateIndex(value)}
              value={dateIndex}
              railStyle={{ backgroundColor: 'darkgrey', height: 2 }}
              handleStyle={{
                borderColor: 'darkgrey',
                height: 28,
                width: 28,
                marginLeft: 0,
                marginTop: -13,
                backgroundColor: 'black',
              }}
              dotStyle={{ backgroundColor: 'black' }}
              handle={handle}
            />

          </Row>

        </div>
        <Button onClick={playSlider}>
          {isPlaying ? "pause" : "play"}
        </Button>
      </Row >


    </Wrapper >
  )
}
export default ZonesColors


