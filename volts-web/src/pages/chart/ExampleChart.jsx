import React, { PureComponent } from "react";
import { PieChart, Pie, Cell } from "recharts";

const RADIAN = Math.PI / 180;

const cx = 130;
const cy = 110;
const iR = 50;
const oR = 80;

export default function Example({ niddleValue, data, chartName }) {
  const exp = new Examplec();
  /*
  const data = [
    { name: 'A', value: 35, color: '#011F26' },
    { name: 'B', value: 35, color: '#025E73' },
    { name: 'C', value: 25, color: '#F2A71B' },
  ];
  */
  return exp.render(niddleValue, data, chartName);
}

class Examplec extends PureComponent {
  render(niddleValue, data, chartName) {
    const value = niddleValue;
    const needle = (value, data, cx, cy, iR, oR, color) => {
      let total = 0;
      data.forEach((v) => {
        total += v.value;
      });
      const ang = 180.0 * (1 - value / total);
      const length = (iR + 2 * oR) / 3;
      const sin = Math.sin(-RADIAN * ang);
      const cos = Math.cos(-RADIAN * ang);
      const r = 5;
      const x0 = cx + 5;
      const y0 = cy + 5;
      const xba = x0 + r * sin;
      const yba = y0 - r * cos;
      const xbb = x0 - r * sin;
      const ybb = y0 + r * cos;
      const xp = x0 + length * cos;
      const yp = y0 + length * sin;
      const key=Math.floor(Math.random() * (100 - 2 + 1)) + 2+niddleValue
      return [
        <circle key={Math.round(key+niddleValue+Math.random()*12)} cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
        <path
        key={Math.round(key+niddleValue+Math.random()*1321)}
          d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
          stroke="#none"
          fill={color}
        />,
      ];
    };
    return (
      <>
        <div 
        key={Math.round(Math.random()+niddleValue)}
          style={{
            display: "flex",
            justifyItems: "center",
            flexDirection: "column",
            padding: 10,
            alignItems: "center",
          }}
        >
          <PieChart width={270} height={120}>
            <Pie
              dataKey="value"
              startAngle={180}
              endAngle={0}
              data={data}
              cx={cx}
              cy={cy}
              innerRadius={iR}
              outerRadius={oR}
              fill="#8884d8"
              stroke="none"
              label
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            {needle(value, data, cx, cy, iR, oR, "#d0d000")}
          </PieChart>
          <a>{niddleValue}</a>
          <a>{chartName}</a>
        </div>
      </>
    );
  }
}
