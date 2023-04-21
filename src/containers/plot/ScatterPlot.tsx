import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import LinearRegression from '../model/LinearRegression';
import Box from '@mui/material/Box';
import axios from 'axios';
import { URL } from '../../constant';

interface DataPoint {
  x: number;
  y: number;
}

interface Props {
  data: DataPoint[];
}

const ScatterPlot = ({ data }: Props) => {

  const svgRef = useRef<SVGSVGElement | null>(null);
  const [slope, setSlope] = useState<number | null>(null);
  const [intercept, setIntercept] = useState<number | null>(null);
  const [rSquared, setRSquared] = useState<number | null>(null);

  useEffect(() => {

    if (!svgRef.current) return;

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const x = d3.scaleLinear().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    const svg = d3
      .select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    x.domain([d3.min(data, (d: { x: any; }) => d.x) - 1, d3.max(data, (d: { x: any; }) => d.x) + 1]);
    y.domain([d3.min(data, (d: { y: any; }) => d.y) - 1, d3.max(data, (d: { y: any; }) => d.y) + 1]);

    svg
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('r', 5)
      .attr('cx', (d: { x: any; }) => x(d.x))
      .attr('cy', (d: { y: any; }) => y(d.y))
      .style('fill', 'steelblue');

    svg
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    svg.append('g').call(d3.axisLeft(y));

    if (slope && intercept) {
      const line = d3.line()([[x.range()[0], y(slope * x.domain()[0] + intercept)], [x.range()[1], y(slope * x.domain()[1] + intercept)]]);
      
      svg
        .append('path')
        .datum(data)
        .attr('d', line)
        .attr('class', 'line')
        .style('stroke', 'red');
    }
  }, [data, slope, intercept]);

  const fitLinearRegression = async () => {
    try {
        const response = await axios.get(URL + 'linear_regression');
    
        if (!response.data) {
          throw new Error('Failed to fit linear regression model');
        }
    
        const { slope, intercept, rSquared } = await response.data;
    
        setSlope(slope);
        setIntercept(intercept);
        setRSquared(rSquared);
      } catch (error) {
        console.error(error);
      }
  }
  return (
    <Box>
      <h2>Scatter Plot</h2>
      <svg ref={svgRef}></svg>
      <LinearRegression data={data} fit={fitLinearRegression}/>
    </Box>
  );
};

export default ScatterPlot;
