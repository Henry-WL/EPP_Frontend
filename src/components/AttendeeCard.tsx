

type Attendee = {
    username: String;
}

type Props = {
    attendees: Attendee[];
}

function AttendeeCard({attendees}: Props) {
  return (
    <div>
            <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-800">
                  Event Attendees
                </h2>
                <ul className="mt-2 space-y-2">
                  {attendees.map((attendee, index) => (
                    <li
                      key={index}
                      className="flex items-center p-2 bg-gray-100 rounded-md"
                    >
                      <div className="avatar placeholder">
                        <div className="bg-neutral text-neutral-content w-12 rounded-full">
                          <span className="text">
                            {attendee.username.slice(0, 1).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="ml-3">
                        <h3 className="font-semibold text-gray-800">
                          {attendee.username}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {attendee.username}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
  )
}

export default AttendeeCard