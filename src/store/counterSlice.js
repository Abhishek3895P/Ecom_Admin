import { createSlice } from '@reduxjs/toolkit'


//initial state
const initialState = {
 User:undefined,
 Category:[]
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    set_User: (state, action) => {
      state.User = action.payload
    },set_Category: (state, action) => {
      state.Category = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { set_User,set_Category} = counterSlice.actions

export default counterSlice.reducer