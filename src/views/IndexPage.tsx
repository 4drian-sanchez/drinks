import { useMemo } from "react"
import { useAppStore } from "../stores/useAppStore"
import DrinkCard from "../components/DrinkCard"
import Modal from "../components/Modal"

export default function IndexPage () {

    const drinks = useAppStore( ( state ) => state.drinks)
    
    const hasDrinks = useMemo( () => drinks.drinks.length , [drinks] )
    

    return (
        <div >
            {
                hasDrinks ? (
                    <>
                        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-10 xl:grid-cols-4">
                            {
                                drinks.drinks.map( drink => (
                                    <DrinkCard
                                        key={drink.idDrink}
                                        drink={drink}
                                    />
            
                                ))
                            }
                        </div>
                        <Modal/>
                    </>
                )
                : (
                    <p 
                    className="text-center my-10 font-bold text-gray-700 text-2xl">
                        Busca una receta en el formulario
                    </p>
                )
            }
        </div>
    )
}