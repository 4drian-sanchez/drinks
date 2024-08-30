import { useAppStore } from "../stores/useAppStore"
import { Drink } from "../types"

type DrinkCardProps = {
    drink : Drink
}

export default function DrinkCard ({drink}: DrinkCardProps) {

    const selectRecipe = useAppStore( (state) => state.selectRecipe)
    
    
    
    return (
        <div key={drink.idDrink} className="border shadow-md rounded-md">
            <div className="overflow-hidden">
                <img 
                src={drink.strDrinkThumb} 
                alt={`Imagen de ${drink.strDrink}`}
                className="hover:scale-125 transition-transform hover:rotate-2"
                 />
            </div>
            <div className="p-5 ">
                <h2 className="text-gray-800 text-xl font-bold truncate ">{drink.strDrink} </h2>
                <button
                type="button"
                className="w-full bg-orange-400 hover:bg-orange-500 text-white uppercase font-bold py-3 rounded-md mt-4 transition-colors"
                onClick={ () => selectRecipe(drink.idDrink)}
                >
                    Ver Receta
                </button>
            </div>
        </div>
    )
}