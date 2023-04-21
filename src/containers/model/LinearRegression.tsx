import React, { useState } from 'react';
import { URL } from '../../constant';
import axios from 'axios';

interface DataPoint {
  x: number;
  y: number;
}

interface Props {
  data: DataPoint[];
  fit: Function;
}

const LinearRegression = ({ data, fit }: Props) => {
  const [slope, setSlope] = useState<number | null>(null);
  const [intercept, setIntercept] = useState<number | null>(null);
  const [rSquared, setRSquared] = useState<number | null>(null);

  const fitLinearRegression = async () => {
    // TODO: fit linear regression using server-side API
    try {
        const response = await axios.get(URL + 'linear_regression');
    
        if (!response.data) {
          throw new Error('Failed to fit linear regression model');
        }
    
        const { slope, intercept, rSquared } = await response.data;
    
        setSlope(slope);
        setIntercept(intercept);
        setRSquared(rSquared);
        if(fit){
          fit();
        }
      } catch (error) {
        console.error(error);
      }
  };

  return (
    <div>
      <h2>Linear Regression</h2>
      <button onClick={fitLinearRegression}>Fit Model</button>
      {slope && (
        <div>
          <p>Slope: {slope}</p>
        </div>
      )}
      {intercept && (
        <div>
          <p>Intercept: {intercept}</p>
        </div>
      )}
      {rSquared && (
        <div>
          <p>R-squared: {rSquared}</p>
        </div>
      )}
    </div>
  );
};

export default LinearRegression;

