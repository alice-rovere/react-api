import IdSection from "../components/IdSection";
import RecipesSection from "../components/RecipesSection";

export default function MainSection() {
  return (
    <div className="container min-vh-100 d-flex flex-column  align-items-center ">
      <RecipesSection />
      <IdSection />
    </div>
  );
}
