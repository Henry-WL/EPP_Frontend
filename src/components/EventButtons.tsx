import React from 'react'

type Props = {
    joinEventHandler: () => void;
    leaveEventHandler: () => void;
    disabledButton: boolean;
}

function EventButtons({joinEventHandler, leaveEventHandler, disabledButton}: Props) {
  return (
    <div className="p-4 rounded-md space-y-2">
    <button
      onClick={joinEventHandler}
      className={`w-full p-2 rounded-md text-white transition duration-300 ease-in-out 
        ${
          disabledButton
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-500 hover:bg-green-600"
        }`}
      disabled={disabledButton}
    >
      Join Event
    </button>

    <button
      onClick={leaveEventHandler}
      className={`w-full p-2 rounded-md text-white transition duration-300 ease-in-out 
        ${
          !disabledButton
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-red-500 hover:bg-red-600"
        }`}
      disabled={!disabledButton}
    >
      Leave Event
    </button>

    {/* <button
      onClick={() => console.log("like")}
      className="w-full p-2 bg-pink-500 rounded-md text-white transition duration-300 ease-in-out hover:bg-pink-600"
    >
      {"Like event <3"}
    </button> */}
  </div>
  )
}

export default EventButtons