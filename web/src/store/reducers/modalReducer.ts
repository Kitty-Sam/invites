import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export enum ModalsType {
  ADD_UPWORK_USER = 'ADD_UPWORK_USER',
  EDIT_UPWORK_USER = 'EDIT_UPWORK_USER',
  ADD_UPWORK_PROFILE = 'ADD_UPWORK_PROFILE',
  ADD_INVITE = 'ADD_INVITE',
}
export interface ModalsState {
  modal: ModalsType | null
}

export const initialState: ModalsState = {
  modal: null,
}

export const modalReducer = createSlice({
  name: 'modalReducer',
  initialState,
  reducers: {
    showModal: (state: ModalsState, action: PayloadAction<ModalsType>) => {
      state.modal = action.payload
    },
    closeModal: (state: ModalsState) => {
      state.modal = null
    },
  },
})

export const { showModal, closeModal } = modalReducer.actions
