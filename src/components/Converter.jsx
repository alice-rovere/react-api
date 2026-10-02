import { useEffect, useState } from "react";
const endpoint = "https://api.frankfurter.dev/v1/latest?from=EUR&to=USD";

export default function Converter() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [converterKey, setConverterKey] = useState([]);
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    async function getUserInfo() {
      try {
        setIsLoading(true);
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error("Attenzione, riprovare più tardi");
        }
        const data = await response.json();
        setConverterKey([data]);
        // setUserData(data.results);
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
        {isOpen ? "Chiudi converter" : "Apri converter"}
      </button>
      {isOpen && (
        <div>
          <h3 className="mt-4 text-center">Converter</h3>
          {isLoading && <p className="text-center">Caricamento...</p>}
          {error && <p className="bg-danger text-white p-2">{error}</p>}
          <div className="row row-cols-1 g-4 my-3">
            {/* // {"amount":1.0,"base":"EUR","date":"2026-10-02","rates":{"USD":1.1225}}            */}
            {converterKey.map((item, index) => (
              <div key={index} className="col">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">Valuta: {item.base}</h5>
                    <p className="card-text">Data: {item.date}</p>
                    <p className="card-text">
                      Tasso di cambio: {item.rates.USD.toFixed(2)} USD
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <div>
              <input
                type="number"
                placeholder="Inserisci importo in EUR"
                className="form-control my-2"
                value={amount}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
              />
              <button className="btn btn-primary">Converti in USD</button>
              <p className="mt-2">
                Risultato:{" "}
                {amount * (converterKey[0]?.rates.USD.toFixed(2) || 0)} USD
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
