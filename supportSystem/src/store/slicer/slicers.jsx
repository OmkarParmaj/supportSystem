import { createSlice } from '@reduxjs/toolkit';



const valuesSlice = createSlice({
    name:"values",
    initialState:{
        log: false,
    },
    reducers:{
        setlog: (state, action) => {
         state.log = action.payload;
        },
    },
});


export default valuesSlice.reducer;

export const {setlog} = valuesSlice.actions;
