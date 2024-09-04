import axios from 'axios'
import React, { useEffect, useState } from 'react'

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

        
        <div>
            {events.map((event) => {
                return <h1 key={event._id}>{event.name}</h1>
            })}
        </div>

    </div>
  )
}

export default Events