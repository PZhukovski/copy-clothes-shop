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

const userAdapter = createEntityAdapter({
    
});

const initialState = userAdapter.getInitialState({
    userLoadingStatus: 'idle',
});


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

        addUser: (state, action) => {
            userAdapter.addOne(state, action.payload);
        },

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
            .addDefaultCase(() => { })
    }
});
const { actions, reducer } = userSlice;

export default reducer;

export const userSelector = userAdapter.getSelectors(state => state.user);


export const {
    userFetching,
    userFetched,
    userFetchingError,
    addUser,
    upDateDataUser,
} = actions;