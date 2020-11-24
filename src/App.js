import React from 'react'
import './App.css';
import Totals from './Totals'
import Entries from './Entries'


function App() {


  return (
    <div className="App">
      <div className="App__container">
       <h2 className="heading text-center">Expense Tracker</h2>
          <Totals/>
          <Entries/>
      </div>
     
    </div>
  );
}

export default App;
