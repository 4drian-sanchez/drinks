import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import { useEffect } from "react"
import { useAppStore } from "../stores/useAppStore"
import Notification from "../components/Notification"

export default function Layout () {

    const localFavoriteStore = useAppStore( state => state.localFavoriteStore )
    
    useEffect( () => {
        localFavoriteStore()
    }, [] )

    return (
        <>
            <Header/>

            <main className="container mx-auto py-16 md:px-10">
                <Outlet/>
                <Notification/>
            </main>
        </>
    )
}