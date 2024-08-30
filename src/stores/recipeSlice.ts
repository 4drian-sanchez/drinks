import { StateCreator } from "zustand"
import { getCategories, getRecipe, getRecipes } from "../services/RecipeServices"
import { CategoriesApiResponse, Drink, drinksApiResponse, Recipe, searchFilter } from "../types"

export type RecipesSliceType = {
    categories: CategoriesApiResponse
    drinks: drinksApiResponse
    fetchCategories: () => Promise<void>
    fetchRecipes : ( filters : searchFilter ) => Promise<void>
    selectRecipe: (id : Drink['idDrink']) => Promise<void>
    recipe: Recipe
    modal: boolean
    closeModal: () => void
}

export const createRecipesSlice : StateCreator<RecipesSliceType> = (set) => ({
    categories: {
        drinks: []
    },
    drinks: {
        drinks: []
    },
    modal: false,
    recipe : {} as Recipe,
    fetchCategories: async () => {
        const categories = await getCategories()
        set( () => ({
            categories
        }))
    },

    fetchRecipes: async (filters) => {
        const drinks = await getRecipes(filters)
        set( () => ({
            drinks
        }))
    },
    selectRecipe: async (id) => {
        const recipe = await getRecipe(id)
        set( () => ({
            recipe,
            modal: true
        }) )
    },
    closeModal: () => {
        set( () => ({
            modal: false,
            recipe: {} as Recipe
        }))
    }
})