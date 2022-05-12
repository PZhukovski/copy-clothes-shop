import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import axios from 'axios';
import { JSON_API } from '../../JsonPort';

export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async (id) => {
        const response = await axios.get(`${JSON_API}/users/${id}`);
        //console.log(response.data);
        return response.data;
    }
);
// export const upDateUser = createAsyncThunk(
//     'user/upDateUser',
//     async (id, data) => {
//         try {
//             //console.log(arg);
//             const resp = await axios.put(`http://localhost:3001/users/${id}`, data);
//            // console.log(resp.data);
//              return resp.data;  
//         } catch (err) {
//             console.error(err);
//         }
//     }
// );
// console.log(fetchUser);

const userAdapter = createEntityAdapter({
    // selectId: (user) => user.id,
});

const initialState = userAdapter.getInitialState({
    userLoadingStatus: 'idle',
});
//console.log(initialState);



const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

        addUser: (state, action) => {
            userAdapter.addOne(state, action.payload);
        },

        // upDateDataUser: (state, {payload})=>{
        //     const {id, ...changes} = payload;
        //     userAdapter.updateOne(state, {id, changes});
        // }
        upDateDataUser: (state, action) => {
            userAdapter.updateOne(state, action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, state => { state.userLoadingStatus = 'loading' })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.userLoadingStatus = 'idle';
                userAdapter.addOne(state, action.payload);

            })
            .addCase(fetchUser.rejected, state => {
                state.userLoadingStatus = 'error';
            })
            // .addCase(upDateUser.fulfilled, (state, {payload}) =>{
            //     state.userLoadingStatus = 'dataChanges';
            //     const {id, ...changes} = payload;
            //     userAdapter.updateOne(state, {changes});
            // })
            // .addCase(upDateUser.fulfilled, (state, action) =>{
            //     state.userLoadingStatus = 'dataChanges';
            //     userAdapter.updateOne(state, action.payload);
            // })
            .addDefaultCase(() => { })
    }
});
const { actions, reducer } = userSlice;

export default reducer;

export const userSelector = userAdapter.getSelectors(state => state.user);
// console.log(userSelector);

// export const userSelector = () =>{

//     return selectAll;
// }
// console.log(store.getState());
// export const userSelector = createSelector(
//     (state) => state.filters.activeFilter,
//     selectAll,
//     //(state) => state.heroes.heroes,
//     (filter, heroes) => {
//         if (filter === 'all'){
//             return heroes;
//         } else {
//             return heroes.filter(item => item.element === filter)
//         }
//     }
// );

// export const filteredHeroesSelector = createSelector(
//     (state) => state.filters.activeFilter,
//     selectAll,
//     //(state) => state.heroes.heroes,
//     (filter, heroes) => {
//         if (filter === 'all'){
//             return heroes;
//         } else {
//             return heroes.filter(item => item.element === filter)
//         }
//     }
// );
export const {
    userFetching,
    userFetched,
    userFetchingError,
    addUser,
    upDateDataUser,
} = actions;