import { configureStore } from '@reduxjs/toolkit'

import contactsSlice from './contacts-slice'

const store = configureStore({
  reducer: { contacts: contactsSlice.reducer },
})

export default store
