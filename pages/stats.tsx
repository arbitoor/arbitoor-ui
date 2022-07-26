import React from 'react';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { statsData } from '../utils/mockStatsData';

function stats() {
  const sortedData = [];

  for (const data of statsData) {
    const dexName = data.dex;
    console.log(data);

    // sortedData.push(data);
  }

  const dexCount = statsData.filter((data) => {
    console.log(data.dex);
  });

  // console.log(sortedData);
  return (
    <div
      style={{
        color: 'white',
        height: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* <ResponsiveContainer width="100%" height="100%"> */}
      <BarChart
        width={500}
        height={300}
        data={statsData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="dexName" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="dexCount" fill="#8884d8" />
        {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
      </BarChart>
      {/* </ResponsiveContainer> */}
    </div>
  );
}

export default stats;
