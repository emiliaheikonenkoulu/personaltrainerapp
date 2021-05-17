import './App.css';
import Customerlist from './components/Customerlist';
import AppBar from '@material-ui/core/AppBar';
import React, { useState } from 'react';
import Traininglist from './components/Traininglist';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TrainingCalendar from './components/TrainingCalendar';
import StatisticsPage from './components/StatisticsPage';

function App() {
  const [value, setValue] = useState('one');

  const handleChange = (event, value) => {
    setValue(value);
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab value="one" label="Trainings" />
          <Tab value="two" label="Customers" />
          <Tab value="three" label="Calendar" />
          <Tab value="four" label="Statistics" />
        </Tabs>
      </AppBar>
      {value === 'one' && <Traininglist />}
      {value === 'two' && <Customerlist />}
      {value === 'three' && <TrainingCalendar />}
      {value === 'four' && <StatisticsPage />}
    </div>
  );
}

export default App;
