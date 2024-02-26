import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Step1Form from './Components/Step1Form';
import { Provider } from 'react-redux';
import Step2Form from './Components/Step2Form';
import store from './redux/store';


function App() {
 

  return (
    <div className="App">
      <Provider store={store}>
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Step1Form  />} />
          <Route path="/step2" element={<Step2Form />} />
        </Routes>
      </div>
    </Router>
    </Provider>
    </div>
  );
}

export default App;
