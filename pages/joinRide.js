import React, { useContext } from 'react'
import styles from "../styles/createRide.module.css"
import { withRouter } from 'next/router';
import axios from "axios"
import { useAppContext } from '../context/ContextProvider';
function joinRide(props) {
    const [rides,setRides]=React.useState([])
    const {user_details,auth1}=useAppContext()
    const objCreate={
        living_from:"",
        going_to:"",
        date:"",
        persons:""
    }
    const [book,setBook]=React.useState(false)
    const [ride,setRide]=React.useState(true)
    function getData(living_from,going_to,date){
        axios.get(`http://localhost:3011/createRide?living_from=${living_from}&going_to=${going_to}&date=${date}`)
        .then(res=>{
            let data=res.data
            if(data.length!=0){
                setRide(true)
                setRides(res.data)
            }
            else{
                setRide(false)
            }
        })
    }



    const [data,setData]=React.useState(objCreate)
    const {living_from,going_to,date,persons}=data
    const handleChange=(e)=>{
        const {name,value}=e.target
        setData({
            ...data,
            [name]:value
        })
    }


    const handleSubmit=(e)=>{
        e.preventDefault()
        getData(data.living_from,data.going_to,data.date)
    }

    const [Booked,setBooked]=React.useState({})
    const handleBook=(id,Book,seting,persons)=>{
        alert("Comfirm to Book")
        // let data=[]
        // persons=data
        persons.push({
            name:user_details[0].name,
            phone:user_details[0].phone
        })
        console.log(persons)
        setBook(!book)
        if(Book=="book"){
            axios.patch(`http://localhost:3011/createRide/${id}`,{
                setting:Number(seting)-Number(data.persons),
                booked_persons:persons

            })
            .then(res=>setBooked(res.data))
        }
        else{
            axios.patch(`http://localhost:3011/createRide/${id}`,{
                setting:Number(seting)+Number(data.persons)
            })
            .then(res=>res.data)
        }
    }
    return !book?(
        <div className={styles.form_css}>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="FROM" value={living_from} name={"living_from"} onChange={handleChange}/>
                <input type="text" placeholder="TO" value={going_to} name={"going_to"} onChange={handleChange}/><br/>
                <input type="date" value={date} name={"date"} onChange={handleChange}/>
                <input type="number" value={persons} name={"persons"} placeholder="No of people" onChange={handleChange}/>
                <br/><button type="submit">Search</button><br/>
                <button onClick={() => props.router.push('/chooseOption')}>BACK</button>
            </form>

            {ride==true?<div className={styles.rides}>
                {rides && rides.map(e=>
                    <div className={styles.prea}>
                        <pre>Living From                                       Going To</pre>
                        <pre>{e.living_from}                                        {e.going_to}</pre>
                        {e.setting>0?<p>seats left :- {e.setting}</p>:<p>No seats Are available</p>}
                        <button onClick={()=>handleBook(e.id,"book",e.setting,e.booked_persons)}>Book</button>
                    </div>
                )}:
            </div>:<div>No Rides are Available please Choose another Destination</div>}
        </div>
    ):<div>
        <p>Booking Confirm Details</p>
        <h1>Driver Name:-{Booked.name}</h1>
        <pre>Living From :-{Booked.living_from}----Going T0:-{Booked.going_to}</pre>
        <p>mobile no:-{Booked.phone}</p>
        <p>No of seats:-{persons}</p>
        <button onClick={()=>handleBook(Booked.id,"cancel",Number(Booked.setting),Booked.booked_persons)}>Cancel Booking</button>
    </div>
}

export default withRouter(joinRide)
