import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createRecipesSlice, RecipesSliceType, } from "./recipeSlice";
import { createFavoritesSlice, favoritesTypes } from "./favoritesSlice";
import { createNotificationSlice, notificationTypes } from "./notificationSlice";

export const useAppStore = create<RecipesSliceType & favoritesTypes & notificationTypes >() ( devtools ( (...a) => ( {
    ...createRecipesSlice(...a),
    ...createFavoritesSlice(...a),
    ...createNotificationSlice(...a)
})) )