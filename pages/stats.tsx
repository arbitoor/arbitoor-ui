import React from 'react';
import {
  // BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import BarChart from '../components/BarChart/BarChart';
import { DexList, dexList } from '../utils/dexList';
import { statsData } from '../utils/mockStatsData';

function stats() {
  const sortedData = [];

  // for (const data of statsData) {
  //   const dexName = data.dex;
  //   console.log(data);

  //   // sortedData.push(data);
  // }

  const dexCount: Array<{ name: string; value: number }> = [];

  for (const item of statsData) {
    const name = dexList[item.dex as keyof DexList].name;
    let duplicateIdx = -1;
    dexCount.forEach((data: any, idx: number) => {
      if (data.name === name) {
        duplicateIdx = idx;
      }
    });

    if (duplicateIdx > -1) {
      dexCount[duplicateIdx].value += 1;
      continue;
    }
    dexCount.push({
      name,
      value: 1,
    });
  }

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
      {/* <BarChart
        width={500}
        height={300}
        data={dexCount}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />       
      </BarChart> */}
      {/* </ResponsiveContainer> */}

      <BarChart
        data={dexCount}
        // color={backgroundColor}
        // minHeight={340}

        // label={valueLabel}
        // setValue={setLatestValue}
        // setLabel={setValueLabel}
      />
    </div>
  );
}

export default stats;
