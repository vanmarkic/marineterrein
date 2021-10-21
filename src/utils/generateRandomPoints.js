import svgPathBbox from "svg-path-bbox"
import pointInSvgPoylgon from 'point-in-svg-polygon'
import { randomPoint } from '@turf/random'

import * as d3Array from 'd3-array'


export default function randomPointsOnPolygon(path, count, bbox) {

    const pathBbox = bbox || svgPathBbox(path)
    const coordinatesArray = d3Array.range(count).map(() => {

        const point = randomPoint(1, { bbox: pathBbox });

        if (pointInSvgPoylgon.isInside(point.features[0].geometry.coordinates, path) === true) {

            return point.features[0].geometry.coordinates;
        } else {
            return randomPointsOnPolygon(path, 1, pathBbox)[0];
        }
    });

    return coordinatesArray
}