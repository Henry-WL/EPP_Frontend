import React, { useContext, useEffect, useState } from "react";
import { useAxios } from "../components/hooks/useAxios";
import LoadingSpinner from "../components/LoadingSpinner";
import authContext, { AuthContextType } from "../context/auth-context";

type Props = {};

const ProfilePage = (props: Props) => {
  const [user, setUser] = useState<{}>({});

  const auth = useContext(authContext) as AuthContextType | null;

  const { sendRequest, response, isLoading, error } = useAxios();
  ("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const responseData = await sendRequest(`/user/${auth.userId}`);
        console.log(responseData);
        setUser(responseData.data.foundUser);
      } catch (err) {
        console.log(err);
      }
    };

    fetchEvents();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      {!isLoading && (
        <div className="flex justify-center items-center h-screen bg-base-200">
          <div className="card w-full max-w-sm bg-base-100 shadow-xl">
            {/* Profile Picture */}
            <div className="avatar flex justify-center mt-4">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <div className="avatar placeholder">
                  <div className="bg-neutral text-neutral-content w-24 rounded-full">
                    <span className="text-3xl">
                      {user.username && user.username.slice(0, 1).toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-body items-center text-center">
              {/* Username */}
              <h2 className="card-title text-2xl">{user.username}</h2>
              {/* Email */}
              <p className="text-sm text-gray-500">{user.email}</p>

              <div className="card-actions mt-4">
                <button className="btn btn-primary">Edit Profile</button>
                <button className="btn btn-error" onClick={auth?.logout}>
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
