  import { createSlice } from '@reduxjs/toolkit';

  const initialState = {
    BASE_URL: "https://vtechsap.coder.az/api",
    language: "az",
  };

  export const techSlice = createSlice({
    name: "tech",
    initialState,
    reducers: {
      setLanguage: (state, action) => {
        state.language = action.payload;  
      },
      setLanguages: (state, action) => {
        state.languages = action.payload; 
      },
      setNavbarData: (state, action) => {
        console.log("Navbar Data set edildi:", action.payload);
      },
    },
  });

  export const { setLanguage, setLanguages, setNavbarData } = techSlice.actions;

  export default techSlice.reducer;
