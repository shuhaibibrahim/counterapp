import { Button, TableContainer, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Counter from './Counter'
import { db } from './firebase_config'
import MyCount from './MyCount'

function Main({user, logout, auth}) {

    const [counts, setCounts] = useState([])
    const [display, setDisplay] = useState(null)
    const [initialise, setInitialise]=useState(false)
    const [count, setCount] = useState(0)
    const [total, setTotal] = useState(0)

    useEffect(()=>{
        var itemsRef=db.ref('counts')
        
        itemsRef.on('value',(snapshot)=>{
          var counts=snapshot.val()
          var newCounts=[]
          var mytotal=0
          
          for(var id in counts){
            mytotal+=parseInt(counts[id].count)
            newCounts.push(
              {
                  name:counts[id].name,
                  count:counts[id].count
              }
            )
          }
    
          setCounts(newCounts)
          setTotal(mytotal)
        })

        var countRef=db.ref('counts/'+user.uid)
        
        countRef.on('value',(snapshot)=>{
            if(!snapshot.exists())
            {
                setInitialise(true)
            }   
        })
    
      }, []);
    
    const renderPage=()=>{
            if(display===null)
                return (<div>
                    {counts.map(item=><MyCount name={item.name} count={item.count}/>)}
                    <h4>Total - {total}</h4>
                    <Button 
                        variant="contained" 
                        color="secondary"
                        onClick={()=>{
                            setDisplay(<Counter 
                                        id={user.uid} 
                                        user={user} 
                                        initialCount={parseInt(count)}
                                        />)
                        }}
                        style={{marginTop:'40%'}}
                    >Go to Counter</Button>
                    <Button 
                        variant="contained" 
                        color="secondary "
                        onClick={logout}
                        style={{marginTop:'40%'}}
                    >Log Out</Button>
                </div>)
            else    
                return display
    }
    
    const updateCounter=()=>{

        var countRef=db.ref('counts/'+user.uid)
        
        countRef.set({
            name:user.displayName,
            count:parseInt(count)
        })
    }
    const renderInitialise=()=>{
        return (
            <form>
                <TextField 
                    id="standard-basic" 
                    label="Enter initial count" 
                    value={count}
                    onChange={e=>{setCount(e.target.value)}}
                    style={{width:'100%'}} 
                />
                <button 
                    type="submit" 
                    onClick={()=>{
                        updateCounter()
                        setInitialise(false)
                    }} 
                    style={{display: 'none'}}
                />
            </form>
        )
    }

    return (
        <div style={{display:'flex',flexDirection:'column', alignItems:'center',justifyContent:'center', height:'100%'}}>
            {initialise?renderInitialise():renderPage()}
            {display?
                <Button 
                    variant="contained" 
                    color="secondary "
                    onClick={()=>{setDisplay(null)}}
                    style={{marginTop:'40%'}}
                >Go Back</Button>:<div/>
            }
        </div>
    )
}

export default Main
