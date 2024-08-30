import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Layouts/Layout'

const FavoritePage = lazy( () => import('./views/FavoritesPage') )
const IndexPage = lazy( () => import('./views/IndexPage') )

export default function RouterApp () {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout/>}>
                    <Route path='/' element={
                        <Suspense fallback="cargando...">
                            <IndexPage/>
                        </Suspense>
                        } index/>
                    <Route path='/favoritos' element={
                        <Suspense fallback="cargando...">
                            <FavoritePage/>
                        </Suspense>
                    } />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}