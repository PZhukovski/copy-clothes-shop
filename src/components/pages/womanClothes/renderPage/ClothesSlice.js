import { createSlice, createAsyncThunk, createEntityAdapter , createSelector} from "@reduxjs/toolkit";
import axios from 'axios';
import { JSON_API } from '../../../JsonPort';
import getFilter from "../../../helpers/getFilter";

export const fetchClothesForWoman = createAsyncThunk(
    'womancollection/fetchClothesForWoman',
    async () => {
        const response = await axios.get(`${JSON_API}/womancollection`);
        //  console.log(response.data);
        return response.data;  
    }  
);


const womanCollectionAdapter = createEntityAdapter({
    // selectId: (user) => user.id,
});

const initialState = womanCollectionAdapter.getInitialState({
    userLoadingStatus: 'idle',
    filterOfClothes: 'All',
    filterOfShoes: 'All',
});


const womanCollectionSlice = createSlice({
    name: 'womancollection',
    initialState,
    reducers: {
        filterClothesChange: (state, action) => {
            state.filterOfClothes = action.payload
        },
        filterShoesChange: (state, action) => {
            state.filterOfShoes = action.payload
        },
       
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchClothesForWoman.pending, state => { state.userLoadingStatus = 'loading' })
            .addCase(fetchClothesForWoman.fulfilled, (state, action) => {
                state.userLoadingStatus = 'idle';
                womanCollectionAdapter.setAll(state, action.payload);
            })
            .addCase(fetchClothesForWoman.rejected, state => {
                state.userLoadingStatus = 'error';
            })
            .addDefaultCase(()=>{})
    }
});
const { actions, reducer} = womanCollectionSlice;

export default reducer;

export const clothesSelector = womanCollectionAdapter.getSelectors(state => state.womancollection);
export const { selectAll: allClothes } = womanCollectionAdapter.getSelectors(state => state.womancollection)

export const filterOfClothes = createSelector(
    allClothes ,
    state => state.womancollection.filterOfClothes,
    (clothes, filter) => {
        const result = getFilter(clothes, filter);
        return result;
    }

)
export const filterOfShoes = createSelector(
    allClothes ,
    state => state.womancollection.filterOfShoes,
    (clothes, filter) => {
        const result = getFilter(clothes, filter);
        return result;
    }

)

export const { 
    filterClothesChange,
    filterShoesChange
} = actions;