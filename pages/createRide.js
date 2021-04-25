import React from 'react'
import styles from "../styles/createRide.module.css"
import { withRouter } from 'next/router';
import axios from 'axios'
import { useAppContext } from '../context/ContextProvider';

function createRide(props) {
    const {user_details}=useAppContext()
    console.log(user_details[0])
    const [liveLocation,setLivelocation]=React.useState("")
    const [alreadyRide,setAlready]=React.useState([])
    console.log(alreadyRide)
    React.useEffect(()=>{
            axios.get(`http://localhost:3011/createRide?user_id=${user_details[0].id}`)
            .then(res=>{
                setAlready(res.data)
                })
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
            location(position.coords.latitude,position.coords.longitude)
          });
        },[])
    function location(lal,lon){
        axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${lal}+${lon}&key=6bd8acc71124426db34aa583f2bc3d95`)
        .then(res=>setLivelocation(res.data.results[0].components.county))
    }
    console.log(liveLocation)
    const [obj,setObj]=React.useState({
        living_from:liveLocation,
        going_to:"",
        date:"",
        time:"",
        price:"",
        setting:""
    })
    
    const handleChange=(e)=>{
        e.preventDefault()
        const {name,value}=e.target
        setObj({
            ...obj,
            [name]:value
        })
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post(`http://localhost:3011/createRide`,{
            ...obj,
            name:user_details[0].name,
            phone:user_details[0].phone,
            booked_persons:[],
            user_id:user_details[0].id
        })
        .then(res=>{
            setAlready([res.data])
        })
    }

    const handleCancelTrip=(id)=>{
        axios.delete(`http://localhost:3011/createRide/${id}`)
        .then(()=>setAlready([]))
    }
    return (alreadyRide.length==0?
        <div className={styles.form_css}>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="FROM" value={obj.living_from} name={"living_from"} onChange={handleChange}/>
                <p>TO</p>
                <input type="text" placeholder="TO" value={obj.going_to} name={"going_to"} onChange={handleChange}/><br/>
                <input type="date" value={obj.date} name={"date"} onChange={handleChange}/>
                <input type="time" value={obj.time} name={"time"} onChange={handleChange}/>
                <input type="text" value={obj.price} name={"price"} onChange={handleChange}/>
                <input type="number" value={obj.setting} name={"setting"} onChange={handleChange}/>
                <input type="submit" value="CREATE"/>
            </form>
            <button onClick={() => props.router.push('/chooseOption')}>BACK</button>
            
        </div>:<div><h2>You Create trip from {alreadyRide[0].living_from}  To  {alreadyRide[0].going_to} on {alreadyRide[0].date} and timming {obj.time}</h2>
            <button onClick={()=>handleCancelTrip(e.id)}>Cancel Trip</button>
            {alreadyRide.length==1 ? alreadyRide[0].booked_persons.map((e,i)=>
        <div>
            <h4>person no {i+1}</h4>
            <p>{e.name}</p>
            <p>{e.phone}</p>
        </div>):<div></div>}
        </div>
    )
}

export default withRouter(createRide)
