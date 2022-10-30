import { createSlice } from '@reduxjs/toolkit'

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contactItems: [],
    contactListIsShown: true,
    addNewContactFormIsShown: false,
    isLoggedIn: false,
  },
  reducers: {
    setAllContacts(state, action) {
      state.contactItems = action.payload
    },
    logout(state) {
      state.isLoggedIn = false
      console.log(state.isLoggedIn)
    },
    login(state) {
      if (localStorage.getItem('JWT')) {
        state.isLoggedIn = true
        console.log(state.isLoggedIn)
      }
    },
    toggleAddForm(state) {
      state.addNewContactFormIsShown = true
      state.contactListIsShown = false
    },
    toggleContacts(state) {
      state.contactListIsShown = true
      state.addNewContactFormIsShown = false
    },
    addNewContactItem(state, action) {
      console.log('works')
    },
    removeFromContacts(state, action) {
      state.contactItems.splice(action.payload, 1)
    },
  },
})

export const contactsActions = contactsSlice.actions

export default contactsSlice
