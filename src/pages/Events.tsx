import axios from 'axios'
import React, { useEffect, useState } from 'react'
import EventCard from '../components/EventCard'
import { useHttpClient } from '../components/hooks/http-hook'

type Props = {}

function Events({}: Props) {
const [events, setEvents] = useState([])
const { isLoading, error, sendRequest, clearError } = useHttpClient();


console.log('hello')

useEffect(() => {
    // const getEvents = async () => {
    //     const response = await axios.get(`http://localhost:3000/events/`)
    //     console.log(response)

    //     setEvents(response.data.allEvents)
    // }

    // getEvents()


    const fetchEvents = async () => {
        try {
            const responseData = await sendRequest('http://localhost:3000/events/')
            console.log(responseData)
            setEvents(responseData.allEvents)
        }

        catch (err) {
            console.log(err)
        }

    }
    
    fetchEvents()


}, [sendRequest])

  return (
    <div>
        <h1>Events</h1>

        {isLoading && (
            <div><h1 className='text-3xl'>Loading....</h1></div>
        )}

        {!isLoading &&
        
        <div className='flex gap-4'>
            {events.map((event) => {
                return <EventCard eventName={event.name} eventLocation={event.location} id={event._id}/>
            })}
        </div>
        }

    </div>
  )
}

export default Events