import { configureStore } from '@reduxjs/toolkit';

import user from '../components/pages/profile/ProfileSlice';
import  womancollection from '../components/pages/womanClothes/renderPage/ClothesSlice';


const stringMiddleware = () => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action)
}; 



const store = configureStore({
    reducer: {user, womancollection},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
    
})
export default store;