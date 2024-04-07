// store/index.jsx

import { configureStore } from '@reduxjs/toolkit';
import valuesSlice from './slicer/slicers';

const store = configureStore({
  reducer: {
    values: valuesSlice,
    // Add other reducers if you have more
  },
});

export default store;
