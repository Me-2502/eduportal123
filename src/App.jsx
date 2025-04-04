import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import { ReactNotifications, Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import HeadingBar from './Headingbar.jsx';
import OptionsBar from './Optionsbar.jsx';
import Dashboard from './Dashboard.jsx';
import Students from './Student.jsx';
import Teachers from './Teachers.jsx';
import Timetable from './Timetable.jsx';
import Settings from './Settings.jsx';
import LoginForm from './Loginform.jsx';
import Marks from './Marks.jsx';
import Give_marks from './Give_marks.jsx';

function App() {
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const [activeSection, setActiveSection] = useState('Dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logger, setLogger] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('changeme@123');
  const [message, setMessage] = useState('');
  const [data, setData] = useState({});
  const [response, setResponse] = useState({});

  const handleLogin = async (username, password, logger) => {
    setUsername(username);
    setLogger(logger);
    setPassword(password);
    try {
        if(logger == 'Student')
          setResponse(await axios.post(`${API_URL}/api/auth/login`, { username, password }))
        else
          setResponse(await axios.post(`${API_URL}/api/auth/faculty_login`, { username, password }))
        if (response.data) {
          setData(response.data);
          setMessage('Login successful');
          setIsLoggedIn(true);
          Store.addNotification({
            title: "Logged-in",
            message: "Successfully logged in. ",
            type: "success",
            insert: "top",
            container: "top-center",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 1000,
              onScreen: true
            }
          });
      } else {
          setMessage('Login failed');
      }
    } catch (error) {
      setMessage('Invalid credentials');
      Store.addNotification({
        title: "Login failed",
        message: "Wrong username or password.",
        type: "danger",
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 1000,
          onScreen: true
        }
      });
      console.log(message);
      console.error('Error logging in:', error);
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      setIsLoggedIn(false);
      setUsername('');
      setPassword('');
      setLogger('');
      setData({});
      setActiveSection('Dashboard');
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'Dashboard':
        return <Dashboard log = {logger}/>;
      case 'Students':
        return <Students data = {data} log = {logger}/>;
      case 'Teachers':
        return <Teachers />;
      case 'Timetable':
        return <Timetable data = {data} log = {logger} user = {username} pass = {password}/>;
      case 'Settings':
        return <Settings data = {data}/>;
      case 'Marks':
        return <Marks user = {username} pass = {password} log = {logger}/>;
      case 'Give_marks':
        return <Give_marks data = {data} log = {logger}/>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <>
      <div className={`app ${isLoggedIn ? '' : ''}`}>
        <ReactNotifications />
        <HeadingBar username={username} login = {isLoggedIn} onLogout={handleLogout} />
        {/* {data.map((item, index) => (console.log(item)))} */}
        {!isLoggedIn && <LoginForm onLogin={handleLogin} />}
        {isLoggedIn  && <div className="content">
          <OptionsBar setActiveSection={setActiveSection} data = {logger}/>
          <div className="main-content">
            {renderContent()}
          </div>
        </div>}
      </div>
    </>
  );
}

export default App;

/*import React, { useState, Component } from 'react'
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    // <>
    //   <div>
    //     <a href="https://vitejs.dev" target="_blank">
    //       <img src={viteLogo} className="logo" alt="Vite logo" />
    //     </a>
    //     <a href="https://react.dev" target="_blank">
    //       <img src={reactLogo} className="logo react" alt="React logo" />
    //     </a>
    //   </div>
    //   <h1>Hello World!</h1>
    //   <div className="card">
    //     <button onClick={() => setCount((count) => count + 1)}>
    //       count is {count}
    //     </button>
    //     <p>
    //       Edit <code>src/App.jsx</code> and save to test HMR
    //     </p>
    //   </div>
    //   <p className="read-the-docs">
    //     Click on the Vite and React logos to learn more
    //   </p>
    // </>
    <Routes>
      {AppRoutes.map((route, index) => {
        const { element, ...rest } = route;
        return <Route key={index} {...rest} element={element} />
      })}
    </Routes>
  );
}

export default App

const timetable = () => {

}

const Options = () => {
  const ds = {display: "inline", paddingTop: "5%", backgroundColor: "#bbb", width: "15%"};
  const s = {backgroundColor: "White", color: "Black", width: "80%", marginBottom: "2%"};
  return (
    <div style={ds}>
      <button id = "report" style={s}>Report</button>
      <button id = "tt" style={s}>Time table</button>
      <button id = "cal" style={s}>Calendar</button>
    </div>
  )
}

const NavBar = () => {
  return(
    <>
      <div id='navbar'>
        <h2 id = "school">School Managenent System</h2>
        <button id = "icon">Login/Logout</button>
        <button id = "icon">Settings</button>
      </div>
    </>
  )
}

export { NavBar , Options};*/
