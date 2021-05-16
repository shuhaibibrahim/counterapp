
import './App.css';
import { useEffect, useState } from 'react';
import { db } from './firebase_config';
import { Button } from '@material-ui/core';
import useSound from 'use-sound';
import tikSfx from './tik.mp3'

function Counter({id, user, initialCount}) {
    
    const [count, setCount] = useState(0)
    const [play] = useSound(tikSfx);

    useEffect(()=>{
        var itemRef=db.ref('counts/'+id)
        
        itemRef.on('value',(snapshot)=>{
            if(snapshot.exists())
            {
                var countItem=snapshot.val()
                setCount(parseInt(countItem.count))
            }
            // else
            // {
            //     itemRef.set({
            //         name:user.displayName,
            //         count:initialCount
            //     })
            // }
                
        })

    }, []);
    
    const countInc=(e)=>{
        var itemRef=db.ref('counts/'+id)
        var updates = {};
        itemRef.set({
            name:user.displayName,
            count:count+1
        })
        play()
    }
    return (
        <div >
            <h4>{user.displayName}</h4>
            <h2>{count}</h2>
            <Button 
                variant="contained" 
                color="primary"
                onClick={countInc}
                style={{borderRadius:'50%', height:50, width:50, backgroundColor:'green', aspectRatio:1}}
            ></Button>
        </div>
    );
}

export default Counter;