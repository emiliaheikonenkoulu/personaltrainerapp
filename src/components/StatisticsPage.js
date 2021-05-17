import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import _ from 'lodash';

function StatisticsPage() {
    const [duration, setDuration] = useState([]);

    useEffect(() => {
        fetchDuration();
    }, []);

    const fetchDuration = () => {
        fetch('https://customerrest.herokuapp.com/api/trainings')
            .then(response => response.json())
            .then(data => setDuration(data.content))
            .catch(err => console.error(err))
    };
    
    const sum = _(duration)
    .groupBy('activity')
    .map((item) => ({
        name: item[0].activity,
        duration: _.sumBy(item, 'duration')
    }))
   .value();
   
    return(
        <div>
            <BarChart width={1000} height={500} data={sum}>
               <CartesianGrid strokeDasharray="3 3" />
               <XAxis dataKey="name" />
               <YAxis label={{ value: "Duration (min)", angle: -90, position: "insideLeft"}} />
               <Tooltip />
               <Legend />
               <Bar dataKey="duration" fill="#8884d8" legendType="star" />
            </BarChart> 
        </div>
    )
}

export default StatisticsPage;