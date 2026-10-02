import { useEffect, useState } from "react";

const endpoint = "https://dummyjson.com/recipes";
export default function RecipesSection() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function getRecipes() {
      const response = await fetch(endpoint);
      const data = await response.json();
      setRecipes(data.recipes);
    }
    getRecipes();
  }, []);

  return (
    <div>
      <h3 className="mt-4 text-center">Recipes</h3>
      <div className="row row-cols-3 g-4 my-3">
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

// Utilizzare try/catch per gestire il caso in cui abbiamo un errore nella risposta dell'api (response.ok ci restituisce false)
