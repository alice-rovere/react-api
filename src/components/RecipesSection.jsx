import { useEffect, useState } from "react";
import { ChefHat } from "lucide-react";

const endpoint = "https://dummyjson.com/recipes";
export default function RecipesSection() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function getRecipes() {
      try {
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error("Attenzione, riprovare più tardi");
        }
        const data = await response.json();
        setRecipes(data.recipes);
      } catch (e) {
        console.log(e);
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    }
    getRecipes();
  }, []);

  return (
    <>
      <button
        className="btn btn-secondary mt-5"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
      >
        {isOpen ? "Chiudi ricette" : "Apri ricette"}
      </button>
      {isOpen && (
        <div>
          <h3 className="mt-4 text-center">Recipes</h3>

          {isLoading && (
            <div className="loader-container">
              <ChefHat className="rotating-image" />

              <span className="bg-secondary text-white p-2 mx-5 rounded">
                IS LOADING
              </span>
            </div>
          )}
          <div className="row row-cols-3 g-4 my-3">
            {error && <p className="bg-danger text-white p-2">{error}</p>}
            {recipes.map((recipe) => (
              <div key={recipe.id} className="col">
                <div className="card">
                  <img src={recipe.image} alt="" className="card-img-top" />
                </div>
                <div className="card-body">
                  <h4 className="h6">{recipe.name}</h4>
                  <span>{recipe.cuisine}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
