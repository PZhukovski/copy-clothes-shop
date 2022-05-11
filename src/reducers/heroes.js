// import { createReducer } from "@reduxjs/toolkit"

// const initialState = {
//     heroes: [],
//     heroesLoadingStatus: 'idle',
   
// }

// const heroes = (state = initialState, action) => {
//     switch (action.type) {
//         case 'HEROES_FETCHING':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'loading'
//             }
//         case 'HEROES_FETCHED':
//             return {
//                 ...state,
//                 heroes: action.payload,
//                 heroesLoadingStatus: 'idle'
//             }
//         case 'HEROES_FETCHING_ERROR':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'error'
//             }
//         case 'HERO_ADD':
//             const newAddHeroList = [...state.heroes, action.payload]
//             return {
//                 ...state,
//                 heroes: newAddHeroList,
                
//             }
//         case 'HERO_REMOVE':
//             const newHeroList = state.heroes.filter(item => item.id !== action.payload);
//             return {
//                 ...state,
//                 heroes: newHeroList
                
//             }
      
//         default: return state


//     }
// }

// export default heroes;