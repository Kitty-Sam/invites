import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { modalReducer } from './reducers/modalReducer'

const rootReducer = combineReducers({
  modals: modalReducer.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

setupListeners(store.dispatch)

export type AppRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector
