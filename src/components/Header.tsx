import { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";

export default function Header () {

    const {pathname} = useLocation()
    const [searchResult, setSearchResult] = useState({
        ingredient: '',
        category: ''
    })

    const isHome = useMemo( () => pathname === '/' , [pathname] )

    const fetchCategories = useAppStore( (state) => state.fetchCategories )
    const categories = useAppStore( (state) => state.categories )
    const fetchRecipes = useAppStore( (state) => state.fetchRecipes )
    const showNotification = useAppStore( state => state.showNotification)
    
    useEffect( () => {
        fetchCategories()
    }, [] )

    
    const handleChange = (e : React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setSearchResult({
            ...searchResult,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(Object.values(searchResult).includes('')) {
            showNotification({text: 'falta ingredientes o categorias', error: true})
            return
        }
        fetchRecipes(searchResult)
    }

    return (
        <header className={isHome ? 'bg-header' : 'bg-slate-800'}>
            <div className="mx-auto container px-5 py-16">
                <div className="flex justify-between items-center">
                    <div>
                         <img src="./logo.svg" className="w-32" alt="Logo de bebidas" />
                    </div>
                    <nav className="flex gap-4">
                    
                        <NavLink 
                        to={'/'}
                        className={({isActive}) => {
                            return isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'
                        }}
                        >Inicio</NavLink>
                    
                        <NavLink 
                        to={'/favoritos'}
                        className={({isActive}) => {
                            return isActive ? 'text-orange-500 uppercase font-bold' : 'text-white uppercase font-bold'
                        }}
                        >Favoritos</NavLink>
                    </nav>
                </div>

                {
                    isHome && (
                        <>
                            <form onSubmit={handleSubmit} className="my-32 bg-orange-500 p-12 space-y-5 md:w-1/2  rounded-md">
                                <div>
                                    <label htmlFor="ingredient" className="block text-white uppercase font-extrabold mb-2">Nombres o ingredientes</label>
                                    <input
                                    id="ingredient" 
                                    type="text"
                                    placeholder="Nombre o ingrediente, Ej Vodka, tequila, café"
                                    className="focus:outline-none p-2 rounded-md w-full"
                                    name="ingredient"
                                    onChange={handleChange}
                                    value={searchResult.ingredient}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="category" className="block text-white uppercase font-extrabold mb-2">Categorias</label>
                                    <select 
                                    name="category" 
                                    id="category" 
                                    className="focus:outline-none p-2 rounded-md w-full"
                                    onChange={handleChange}
                                    value={searchResult.category}
                                    >
                                        <option value=""> -- Seleccione --</option>
                                        {
                                            categories.drinks.map( (drink) => (
                                                <option key={drink.strCategory} value={drink.strCategory}>{drink.strCategory}</option>
                                            ) )
                                        }
                                    </select>
                                </div>

                                <input type="submit" value="Buscar Resetas" className="w-full block mt-4 bg-orange-600 text-white uppercase font-bold rounded-md py-3 cursor-pointer hover:bg-orange-700 transition-colors text-lg" />
                            </form>
                        </>
                    )
                }
            </div>
        </header>
    )
}