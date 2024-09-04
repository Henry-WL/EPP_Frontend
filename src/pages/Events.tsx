import axios from 'axios'
import React, { useEffect, useState } from 'react'
import EventCard from '../components/EventCard'

type Props = {}

function Events({}: Props) {
const [events, setEvents] = useState([])

useEffect(() => {
    const getEvents = async () => {
        const response = await axios.get(`http://localhost:3000/events/`)
        console.log(response)

        setEvents(response.data.allEvents)
    }

    getEvents()



}, [])

  return (
    <div>
        <h1>Events</h1>

        
        <div className='flex gap-4'>
            {events.map((event) => {
                return <EventCard eventName={event.name} eventLocation={event.location} key={event._id}/>
            })}
        </div>

    </div>
  )
}

export default Events