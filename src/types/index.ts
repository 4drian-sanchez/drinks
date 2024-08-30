import {z} from "zod";
import { categoriesApiResponseSchema, drinkApiResponse, drinksApiResponse, RecipeAPIResponseSchema, searchFilterSchema } from "../schemas/recipesSchema";

export type CategoriesApiResponse = z.infer< typeof categoriesApiResponseSchema >

export type searchFilter = z.infer< typeof searchFilterSchema >

export type drinksApiResponse = z.infer< typeof drinksApiResponse >
export type Drink = z.infer< typeof drinkApiResponse >

export type Recipe = z.infer< typeof RecipeAPIResponseSchema >