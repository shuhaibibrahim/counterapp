
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

    const countReset=(e)=>{
        var itemRef=db.ref('counts/'+id)
        var updates = {};
        itemRef.set({
            name:user.displayName,
            count:0
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
                style={{
                    borderRadius:'50%', 
                    height:'85%', 
                    width:'90%',
                    backgroundColor:'light-blue',
                }}
            ></Button>
            <div style={{width:'100%', display:'flex', justifyContent:'flex-end'}}>
                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={countReset}
                    style={{
                        borderRadius:'50%', 
                        height:'5%', 
                        width:'5%',
                        backgroundColor:'red',
                    }}
                ></Button>
            </div>
        </div>
    );
}

export default Counter;