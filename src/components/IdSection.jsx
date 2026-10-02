import { useEffect, useState } from "react";
const endpoint = "https://randomuser.me/api/";

export default function IdSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getUserInfo() {
      try {
        setIsLoading(true);
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error("Attenzione, riprovare più tardi");
        }
        const data = await response.json();
        setUserData(data.results);
      } catch (e) {
        console.error(e);
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    }
    getUserInfo();
  }, []);

  return (
    <>
      <button
        className="btn btn-secondary mt-5"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
      >
        {isOpen ? "Chiudi user" : "Apri user"}
      </button>
      {isOpen && (
        <div>
          <h3 className="mt-4 text-center">Random User</h3>
          {isLoading && <p className="text-center">Caricamento...</p>}
          {error && <p className="bg-danger text-white p-2">{error}</p>}
          <div className="row row-cols-1 g-4 my-3">
            {userData.map((user) => (
              <div key={user.login.uuid} className="col">
                <div className="card p-3">
                  <img
                    src={user.picture.large}
                    alt={`Foto di ${user.name.first} ${user.name.last}`}
                    className="rounded-circle align-self-center"
                  />
                  <div className="card-body text-center">
                    <h4 className="h5">
                      {user.name.title} {user.name.first} {user.name.last}
                    </h4>
                    <p className="mb-1">{user.email}</p>
                    <p className="mb-1">
                      {user.location.city}, {user.location.country}
                    </p>
                    <p className="mb-0">{user.phone}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
