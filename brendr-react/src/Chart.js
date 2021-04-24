import React, { useState, useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, PieChart, Pie, Legend, Cell, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import axios from 'axios';

function createData(time, users, items) {
  return { time, users, items };
}

const Data = [
  createData('Nov 2020', 10, 10),
  createData('Dec 2020', 12, 22),
  createData('Jan 2021', 18, 38),
  createData('Feb 2021', 9, 44),
  createData('Mar 2021', 8, 66),
  createData('Apr 2021', 15, 79),
];

const itemData = [
  createData('Nov 2020', 10),
  createData('Dec 2020', 22),
  createData('Jan 2021', 38),
  createData('Feb 2021', 44),
  createData('Mar 2021', 66),
  createData('Apr 2021', 79),
];

const borrowData = [
    {
          "name": "Borrows",
          "value": 0.30
    },
    {
          "name": "Lends",
          "value": 0.70
    },
];

const inUseData = [
    {
          "name": "In Use",
          "value": 0.18
    },
    {
          "name": "Completed",
          "value": 0.82
    },
];

const COLORS = [ "#8884d8", "#0884d8" ]

function extractJoiningDates(users) {
  var arr = []
  for (const user of users) {
    if (typeof user.joining_date != "undefined") {
      arr.push(user.joining_date)
    }
  }
  return arr
}

export default function Chart() {
  const theme = useTheme();

  //const [joiningDates, setJoiningDates] = useState([])
  //const [borrows, setBorrows] = useState()

  //useEffect(() => {
  //  axios.get('/api/admin/joining_dates').then(res => setJoiningDates(extractJoiningDates(res.data)));
  //  axios.get('/api/admin/borrows').then(res => setBorrows(res.data));
  //}, [])
  
  return (
    <React.Fragment>
      <ResponsiveContainer width="95%" height={400}>
        <LineChart
          data={Data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }} >
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="users" stroke={theme.palette.primary.main} dot={false} />
          <Line type="monotone" dataKey="items" stroke={theme.palette.secondary.main} dot={false} />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="55%" height={400}>
        <PieChart width={530} height={250}>
          <Legend verticalAlign="middle" align="right"/>
          <Pie data={borrowData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label labelLine={false}>
            {
              borrowData.map((entry, index) => <Cell fill={COLORS[index]}/>)
            }
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="55%" height={400}>
        <PieChart width={530} height={250}>
          <Legend verticalAlign="middle" align="right"/>
          <Pie data={inUseData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label labelLine={false}>
            {
              inUseData.map((entry, index) => <Cell fill={COLORS[index]}/>)
            }
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
