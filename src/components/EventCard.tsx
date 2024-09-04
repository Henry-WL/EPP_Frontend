import React from 'react'

type Props = {
    eventName:string;
    eventLocation:string
}

function EventCard({eventName, eventLocation}: Props) {
    return (
        <div
          className="max-w-sm border-2 border-black"
        //   imgAlt="Meaningful alt text for an image that is not purely decorative"
        >
            <img src="https://flowbite-react.com/images/blog/image-1.jpg" alt="" />
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Noteworthy technology acquisitions 2021
          </h5>
          <h2>{eventName}</h2>
          <h2>{eventLocation}</h2>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
          </p>
        </div>
      );
}

export default EventCard