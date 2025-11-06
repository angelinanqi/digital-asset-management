import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    keyword: '',
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setKeyword: (state, action) => {
            state.keyword = action.payload;
        }
    }
})

export const { setKeyword } = searchSlice.actions

export default searchSlice.reducer