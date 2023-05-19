import './App.css';
import {Calendar} from './Calendar/Calendar';

function App() {
  return (
    <div className='calendar-box'>
      <h1>Calendar Task</h1>
      <Calendar date='2023-10-08'/>
    </div>
  );
}

export default App;
