
import './App.css';

function MyCount({name, count}) {
    
    return (
        <div style={{
                display:'flex', 
                justifyContent:'space-between',
                alignItems:'center', 
                marginTop:10, 
                padding:2,
                paddingLeft:10,
                paddingRight:10,
                border:'1px solid grey', 
                borderRadius:30 
            }}
        >
            <div style={{textAlign:'left'}}>
                <h4>{name}</h4>
            </div>

            <div>
                <h3>{count}</h3>
            </div>
        </div>
    );
}

export default MyCount;
