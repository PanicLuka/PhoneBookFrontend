import { createSlice } from '@reduxjs/toolkit'

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contactItems: [],
    contactListIsShown: true,
    addNewContactFormIsShown: false,
    isLoggedIn: false,
    isUpdated: false,
    isCreated: false,
    isDeleted: false,
  },
  reducers: {
    updateSnackBar(state) {
      state.isUpdated = true
    },
    isCreated(state) {
      state.isCreated = true
    },
    isDeleted(state) {
      state.isDeleted = !state.isDeleted
    },
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
    removeFromContacts(state, action) {
      state.contactItems.splice(action.payload, 1)
    },
  },
})

export const contactsActions = contactsSlice.actions

export default contactsSlice
