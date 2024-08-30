import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useAppStore } from '../stores/useAppStore';
import { Recipe } from '../types';

export default function Modal() {

  const modal = useAppStore( (state) => state.modal )
  const closeModal = useAppStore( (state) => state.closeModal )
  const recipe = useAppStore( (state) => state.recipe )
  const handleFavorites = useAppStore( (state) => state.handleFavorites )
  const exitsFavorite = useAppStore( (state) => state.exitsFavorite )

  const renderIngredients = () => {
    const ingredients : JSX.Element[] = []
    for(let i = 1; i <= 6; i++) {
        const ingredient = recipe[`strIngredient${i}` as keyof Recipe]
        const measure = recipe[`strMeasure${i}` as keyof Recipe]

        if(ingredient && measure) {
            ingredients.push(
                <li key={i} className='text-lg font-normal'>
                    { ingredient} - {measure}
                </li>
            ) 
        }
    }

    return ingredients
  }
  
  return (
    <>
      <Transition appear show={modal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-70" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6" >
                  <Dialog.Title as="h3" className="text-gray-900 text-4xl font-extrabold my-5 text-center">
                     {recipe.strDrink}
                  </Dialog.Title>
                    <img src={recipe.strDrinkThumb} alt={`Imagen de ${recipe.strDrink}`} className='w-96 mx-auto rounded-lg block'/>
                  <Dialog.Title as="h3" className="text-gray-900 text-2xl font-extrabold my-5 px-2">
                    {renderIngredients()}
                  </Dialog.Title>
                  <Dialog.Title as="h3" className="text-gray-900 text-2xl font-normal my-5 p-2">
                    {recipe.strInstructions}

                    <div className='flex justify-between mt-10 gap-10'>
                      <button
                      type='button'
                      onClick={closeModal}
                      className='text-sm w-full font-bold py-4 text-white bg-gray-500 hover:bg-gray-500 rounded-md uppercase '
                      >
                        Cerrar
                      </button>
                      <button
                      type='button'
                      onClick={() => {
                        handleFavorites(recipe)
                        closeModal()
                      }}
                      className='text-sm w-full font-bold py-4 text-white bg-orange-500 hover:bg-orange-500 rounded-md uppercase '
                      >
                        { exitsFavorite(recipe.idDrink) ? 'Eliminar de favoritos' : 'Agregar a Favoritos' }  
                      </button>
                    </div>
                  </Dialog.Title>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}