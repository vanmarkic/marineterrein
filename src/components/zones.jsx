import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import styled from "styled-components"
import GlobalStyle from "../styles/globalStyle"

import * as d3Array from 'd3-array'


import { schemeBlues as scheme, interpolateBlues } from 'd3-scale-chromatic'


import Picnic from "./ZonesWithColor/picnic"
import Water from "./ZonesWithColor/water"
import Fitness from './ZonesWithColor/fitness'
import Gate from "./ZonesWithColor/gate"

import data from "../../content/oneyearfourcamsbyday.json"


const waterMin = d3Array.min(Object.values(data.content.water))
const waterMax = d3Array.max(Object.values(data.content.water))
const picnicMin = d3Array.min(Object.values(data.content.picnic))
const picnicMax = d3Array.max(Object.values(data.content.picnic))
const gateMin = d3Array.min(Object.values(data.content.gate))
const gateMax = d3Array.max(Object.values(data.content.gate))
const fitnessMin = d3Array.min(Object.values(data.content.fitness))
const fitnessMax = d3Array.max(Object.values(data.content.fitness))

const extents = {
    water: { min: waterMin, max: waterMax, range: waterMax - waterMin },
    gate: { min: gateMin, max: gateMax, range: gateMax - gateMin },
    picnic: { min: picnicMin, max: picnicMax, range: picnicMax - picnicMin },
    fitness: { min: fitnessMin, max: fitnessMax, range: fitnessMax - fitnessMin },
}

const sliderStyle = { width: '100%', margin: 50 };

const getRatio = (key, amount) => amount / extents[key].range

const getColor = (key, amount) => {
    const ratio = getRatio(key, amount)
    return interpolateBlues(ratio)
}

const Button = styled.p `
  /* This renders the buttons above... Edit me! */
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem .5rem;
  margin: 0.5rem 1rem;
  width: auto;
  background: transparent;
  color: blue;
  border: 2px solid black;
  cursor: pointer;

`
const Row = styled.div `
        display: flex;
      
      
`
const AmountsContainer = styled.div `
        max-width: 250px;
        min-width: 250px;
      
      
`

const Bar = styled.div `
  width: ${props => props.ratio * 100}%;
  background-color: darkblue;
  height: 20px;

`


const Zones = () => {

    const [dateIndex, setDateIndex] = useState(0);
    const [intervalId, setIntervalId] = useState(undefined);

    let picnicAmount = data.content.picnic[Object.keys(data.content.picnic)[dateIndex]]
    let waterAmount = data.content.water[Object.keys(data.content.water)[dateIndex]]
    let fitnessAmount = data.content.fitness[Object.keys(data.content.fitness)[dateIndex]]
    let gateAmount = data.content.gate[Object.keys(data.content.gate)[dateIndex]]

    const playSlider = () => {
        let intervalIds = setInterval(() => setDateIndex(dateIndex => dateIndex + 1), 200)
            // intervalId
        setIntervalId(intervalIds)
    }

    const pauseSlider = () => {
        clearInterval(intervalId)
    }

    return (

        <
        >


        <
        Row >
        <
        AmountsContainer >
        <
        h2 > { Object.keys(data.content.picnic)[dateIndex] } < /h2> <
        h3 > { Math.round(picnicAmount) } < /h3> <
        Bar ratio = { getRatio("picnic", picnicAmount) }
        /> <
        h3 > { Math.round(waterAmount) } < /h3> <
        Bar ratio = { getRatio("water", waterAmount) }
        /> <
        h3 > { Math.round(fitnessAmount) } < /h3> <
        Bar ratio = { getRatio("fitness", fitnessAmount) }
        /> <
        h3 > { Math.round(gateAmount) } < /h3> <
        Bar ratio = { getRatio("gate", gateAmount) }
        /> < /
        AmountsContainer >

        <
        svg width = "100%"
        height = "100%"
        viewBox = "0 0 3840 2160"
        version = { 1.1 }
        xmlns = "http://www.w3.org/2000/svg"
        style = {
            { position: "relative" }
        } >
        <
        Picnic fillColor = { getColor("picnic", picnicAmount) }
        amount = { picnicAmount }
        /> <
        text fontSize = "30px"
        fontFamily = "Arial, Helvetica, sans-serif"
        x = "2330"
        y = "1500" > { Math.round(picnicAmount) } < /text> <
        Water fillColor = { getColor("water", waterAmount) }
        amount = { waterAmount }
        /> <
        text fontSize = "30px"
        fontFamily = "Arial, Helvetica, sans-serif"
        x = "1700"
        y = "1200" > { Math.round(waterAmount) } < /text> <
        Fitness fillColor = { getColor("fitness", fitnessAmount) }
        amount = { fitnessAmount }
        /> <
        text fontSize = "30px"
        fontFamily = "Arial, Helvetica, sans-serif"
        x = "1800"
        y = "400" > { Math.round(fitnessAmount) } < /text> <
        Gate fillColor = { getColor("gate", gateAmount) }
        amount = { gateAmount }
        /> <
        text fontSize = "30px"
        fontFamily = "Arial, Helvetica, sans-serif"
        x = "2300"
        y = "1000" > { Math.round(gateAmount) } < /text> < /
        svg > <
        /Row>

        <
        Row style = { sliderStyle } >
        <
        Slider min = { 0 }
        max = { Object.keys(data.content.picnic).length - 1 }
        included = { false }
        onChange = { value => setDateIndex(value) }
        value = { dateIndex }
        railStyle = {
            { backgroundColor: 'blue', height: 10 }
        }
        handleStyle = {
            {
                borderColor: 'blue',
                height: 28,
                width: 28,
                marginLeft: 0,
                marginTop: -9,
                backgroundColor: 'black',
            }
        }
        /> < /
        Row >

        <
        Row >
        <
        Button onClick = { playSlider } >
        play <
        /Button> <
        Button onClick = { pauseSlider } >
        pause <
        /Button> < /
        Row > <
        />
    )
}
export default Zones