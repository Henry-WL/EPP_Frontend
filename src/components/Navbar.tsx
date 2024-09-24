import { useContext } from "react";
import authContext, { AuthContextType } from "../context/auth-context";
import { Link, useNavigate } from "react-router-dom";

export default function Example() {
  const auth = useContext(authContext) as AuthContextType | null;

  if (!auth) {
    return <p>Loading...</p>
  }

  console.log(auth);
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
      <Link className="btn btn-ghost text-xl" to={'/'}>EPP</Link>
      </div>


    {auth.isLoggedIn && 
    <>
    
    <div className="flex-1">
        <Link className="btn btn-ghost text-xl" to={'/events'}>All Events</Link>

        <Link className="btn btn-ghost text-xl" to={'/payment'}>Payments</Link>


        {auth.isStaff && 
        
        <Link className="btn btn-ghost text-xl" to={'/newevent'}>New Event</Link>
        }
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link className="justify-between" to={'/profile'}>
                Profile
              </Link>
            </li>
            <li>
            <Link className="justify-between" to={'/myevents'}>
                My Events
                <span className="badge">New</span>
              </Link>
            </li>
            {/* <li>
              <a>Settings</a>
            </li> */}
            <li onClick={() => auth.logout()}>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </>
    
    }


      
    </div>
  );
}
