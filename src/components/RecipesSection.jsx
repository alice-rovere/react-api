import { useEffect, useState } from "react";

const endpoint = "https://dummyjson.com/recipes";
export default function RecipesSection() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getRecipes() {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error("Attenzione, riprovare più tardi");
        }
        const data = await response.json();
        setRecipes(data.recipes);
      } catch (e) {
        console.log(e);
        setError(e.message);
      }
    }
    getRecipes();
  }, []);

  return (
    <div>
      <h3 className="mt-4 text-center">Recipes</h3>
      <div className="row row-cols-3 g-4 my-3">
        {error && <p>{error}</p>}
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
  );
}

// Mostrare un loader mentre prendiamo i dati. Potete usare questo snippet per simulare un delay della risposta, come abbiamo visto a lezione:
// // Fake delay
// await new Promise(resolve => setTimeout(resolve, 2000));
