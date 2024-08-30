import { useMemo } from "react"
import { useAppStore } from "../stores/useAppStore"
import DrinkCard from "../components/DrinkCard"
import Modal from "../components/Modal"

export default function FavoritePage () {

    const favorites = useAppStore( state => state.favorites )
    const hasFavorites = useMemo( () =>  favorites.length ,[favorites] )

    return (
        <>
            <h1 className="my-10 font-extrabold text-center text-6xl ">Favoritos</h1>
            {
                hasFavorites 
                ? (
                    <>
                        <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-10 xl:grid-cols-4">
                            {
                                favorites.map( drink => (
                                    <DrinkCard drink={drink} key={drink.idDrink}/>
                                ) )
                            }
                        </div>
                        <Modal/>
                    </>
                )
                : (
                    <p className="text-center my-32 text-gray-700 font-bold text-xl">No hay Favoritos</p>
                )
            }
        </>
    )
}