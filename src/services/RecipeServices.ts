import axios from "axios"
import { categoriesApiResponseSchema, drinksApiResponse, RecipeAPIResponseSchema } from "../schemas/recipesSchema"
import { Drink, searchFilter } from "../types"

export async function getCategories () {
    const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list"
    const {data} = await axios(url)
    const result = categoriesApiResponseSchema.safeParse(data)
    if(result.success) return result.data
}

export async function getRecipes ( filter : searchFilter ) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filter.category}&i=${filter.ingredient}`
    const {data} = await axios(url)
    const result = drinksApiResponse.safeParse(data)
    if(result.success) return result.data
}

export async function getRecipe ( id : Drink['idDrink'] ) {

    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    const {data} = await axios(url)
    const result = RecipeAPIResponseSchema.safeParse(data.drinks[0])
    if(result.success) return result.data
}