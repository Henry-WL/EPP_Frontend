import { useContext, useEffect, useState } from "react";
import { useAxios } from "../components/hooks/useAxios";
import LoadingSpinner from "../components/LoadingSpinner";
import authContext, { AuthContextType } from "../context/auth-context";

interface User {
    username: string;
    email: string;
}

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const auth = useContext(authContext) as AuthContextType | null;

  const { sendRequest, isLoading } = useAxios();
  ("");

  useEffect(() => {
    const fetchEvents = async () => {
      if (auth && auth.userId) {
        try {
          const responseData = await sendRequest(`/user/${auth.userId}`);
          console.log(responseData);
          setUser(responseData.data.foundUser);
        } catch (err) {
          console.log(err);
        }
      }
    };

    fetchEvents();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const editProfileHandler = async () => {
    if (isEditing) {
      const response = await sendRequest(`/user/${auth?.userId}`, "PATCH", {
        username,
        email,
        password,
      });

      setUser(response.data.updatedUser);
    }
  };

  return (
    <div>
      {!isLoading && user && (
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

              {isEditing && (
                <div>
                  <div className="form-control mb-4">
                    <label htmlFor="Username" className="label">
                      <span className="label-text text-center">Username</span>
                    </label>
                    <input
                      id="location"
                      name="location"
                      type="text"
                      // value={user.username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="input input-bordered w-full"
                      placeholder={user.username}
                      // autoComplete="email"
                      // required
                    />
                  </div>

                  <div className="form-control mb-4">
                    <label htmlFor="Email" className="label">
                      <span className="label-text text-center">Email</span>
                    </label>
                    <input
                      id="location"
                      name="location"
                      type="text"
                      // value={user.username}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input input-bordered w-full"
                      placeholder={user.email}
                      // autoComplete="email"
                      // required
                    />
                  </div>

                  <div className="form-control mb-4">
                    <label htmlFor="Password" className="label">
                      <span className="label-text text-center">Password</span>
                    </label>
                    <input
                      id="location"
                      name="location"
                      type="password"
                      // value={user.username}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input input-bordered w-full"
                      placeholder=""
                      // autoComplete="email"
                      // required
                    />
                  </div>
                </div>
              )}

              <div className="card-actions mt-4">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setIsEditing(!isEditing);
                    editProfileHandler();
                  }}
                >
                  {isEditing ? "Save" : "Edit Profile"}
                </button>
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
