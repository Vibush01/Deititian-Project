import SectionHeading from '../components/ui/SectionHeading'
import ConsultationCTA from '../components/sections/ConsultationCTA'
import { useRecipes } from '../hooks/usePageData'
import useDocumentMeta from '../hooks/useDocumentMeta'
import fitjeevaMillet from '../assets/images/fitjeeva-millet.webp'

const RecipesPage = () => {
  const { recipes } = useRecipes()
  useDocumentMeta({
    title: 'Healthy Recipes – Millet, Indian & Diet-Friendly Recipes',
    description: 'Explore healthy, delicious recipes curated by FitJeeva dietitians. Millet khichdi, lentil soups & more for diabetes, PCOS, thyroid & weight loss management.',
    canonical: '/recipes',
  })

  return (
    <div className="flex flex-col bg-white overflow-hidden pb-10">
      <section className="py-12 md:py-20 bg-[#E8F5E9] relative overflow-hidden">
        <div className="container-custom text-center max-w-4xl relative z-10">
          <span className="inline-block bg-[#C8E6C9] text-[#1B5E20] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
            Healthy Kitchen
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-[#1B5E20] mb-6">Nutrition Recipes</h1>
          <p className="text-lg text-gray-700">Delicious, simple, and healthy recipes curated by our experts for various lifestyle and health conditions.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="bg-white rounded-3xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
                <div className="h-48 overflow-hidden relative">
                  <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-gray-700 shadow-sm">{recipe.time}</div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-xs font-bold text-[#2E7D32] uppercase tracking-wider mb-2">Good for {recipe.for}</span>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{recipe.title}</h3>
                  
                  <div className="mb-4">
                    <h4 className="font-bold text-sm text-gray-800 mb-1">Ingredients:</h4>
                    <ul className="text-sm text-gray-600 list-disc list-inside">
                      {recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
                    </ul>
                  </div>

                  <div className="mt-auto">
                    <h4 className="font-bold text-sm text-gray-800 mb-1">Instructions:</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{recipe.instructions}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ConsultationCTA />
    </div>
  )
}

export default RecipesPage
