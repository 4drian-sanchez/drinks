import { StateCreator } from "zustand"
import { Recipe } from "../types"
import { createNotificationSlice, notificationTypes } from "./notificationSlice"

export type favoritesTypes = {
    favorites: Recipe[]
    handleFavorites : (recipe: Recipe) => void
    exitsFavorite : (id : Recipe['idDrink'] ) => boolean
    localFavoriteStore: () => void
}

export const createFavoritesSlice : StateCreator<favoritesTypes & notificationTypes, [] , [], favoritesTypes> = (set, get, api) => ({
    favorites: [],
    handleFavorites : ( (recipe) => {
        if( get().favorites.some( recipeState => recipeState.idDrink === recipe.idDrink ) ) {
            set( (state) => ({
                favorites: state.favorites.filter( favoriteState => favoriteState.idDrink !== recipe.idDrink )
            }) )
            createNotificationSlice(set, get, api).showNotification({text: 'Se elimino correctamente de favoritos', error: false})
        }else {
            set( (state) => ({
                favorites: [
                    ...state.favorites,
                    recipe
                ]
            }))

            createNotificationSlice(set, get, api).showNotification({text: 'Se agrego correctamente a favoritos', error: false})                
        }
        localStorage.setItem('favorites', JSON.stringify(get().favorites))

    }),
    exitsFavorite: (id) => {
        return get().favorites.some( recipeState => recipeState.idDrink === id)
    },
    localFavoriteStore: () => {
        const favoritesLS = localStorage.getItem('favorites')
        if(favoritesLS) {
            set( () => ({
                favorites: JSON.parse(favoritesLS)
            }))
        }
    }
})