import firebase, { auth, provider } from './firebase_config';
import './App.css';
import { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import Main from './Main.js';

function App() {
  
  const [user, setUser] = useState(null)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } 
    });
  }, [])

  const login=()=>{

    auth.signInWithPopup(provider) 
    .then((result) => {
      const user = result.user;
      setUser(user)
    });

  }

  const logout=()=>{
    auth.signOut()
      .then(() => {
        setUser(null)
      });
  }

  return (
    <div className="App" style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
      {user?<Main user={user} logout={logout} auth={auth}/>:
        <Button 
          variant="contained" 
          color="secondary "
          onClick={login}
        >Log In</Button>
      }
    </div>
  );
}

export default App;
