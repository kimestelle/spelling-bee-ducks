import { useState } from 'react';
import { Link } from "react-router-dom";

import ThreeDuck from '../components/ThreeDuck';

import duck from '../assets/duck.svg';
import eyeOff from '../assets/eye.svg';
import eye from '../assets/eye-off.svg';

import '../styles/App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);

  const handleToggle = () => {
    if (type==='password'){
       setIcon(eye);
       setType('text')
    } else {
       setIcon(eyeOff)
       setType('password')
    }
 }

  const handleLogIn = () => {
    setLoggedIn(true);
  };

  const handleLogOut = () => {
    setLoggedIn(false);
  };

  return (
    <div className='App' id='root'>
      <div className='title-bar'>
        <h1 className='title-element'> better-spelling-bee </h1>
        <img src={duck} className='title-element duck' alt='duck' />
      </div>

      <ThreeDuck />

      {loggedIn ? (
        <div>
          <button className='login button' onClick={handleLogOut}>
            log out
          </button>
          <div className='play'>
            <Link to={'play'}>play!</Link>
          </div>
        </div>
      ) : (
        <div className='login-bar'>
          <input name='username' placeholder='username'>
          </input>
          <input 
            name='password' 
            placeholder='password'
            type={type}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"/>
            <img src={icon} onClick={handleToggle} className='eye'/>
          <button className='login button' onClick={handleLogIn}>
            log in
          </button>
          <button className='signup button'>
            create account
          </button>
        </div>
      )}
    </div>
  );
}

export default App;


