import React from 'react';
import logo from './logo.svg';
import './App.css';
import PersonalDetailsForm from './PersonalDetailsForm';
import { log } from 'console';
import ParentComponent from './PersonalDetailsForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Step1Form from './Step1Form';
import { Provider } from 'react-redux';
import Step2Form from './Step2Form';


import { combineReducers } from 'redux'
import { createStore } from 'redux';
import store from './redux/store';

// import { RootState } from './redux/store';}
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
