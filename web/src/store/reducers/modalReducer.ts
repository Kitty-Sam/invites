import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export enum ModalsType {
  ADD_INVITE = 'ADD_INVITE',
  ADD_UPWORK_USER = 'ADD_UPWORK_USER',
  DELETE_UPWORK_USER = 'DELETE_UPWORK_USER',
  DELETE_UPWORK_PROFILE = 'DELETE_UPWORK_PROFILE',
  ADD_UPWORK_PROJECT_TO_PORTFOLIO = 'ADD_UPWORK_PROJECT_TO_PORTFOLIO',
  EDIT_UPWORK_USER = 'EDIT_UPWORK_USER',
  ADD_UPWORK_PROFILE = 'ADD_UPWORK_PROFILE',
  EDIT_UPWORK_PROFILE_TITLE = 'EDIT_UPWORK_PROFILE_TITLE',
  EDIT_UPWORK_VALUE_PROPOSITION = 'EDIT_UPWORK_VALUE_PROPOSITION',
  SHOW_INTERVIEW_TRANSCRIPTION = 'SHOW_INTERVIEW_TRANSCRIPTION',
  MANAGE_UPWORK_USERS = 'MANAGE_UPWORK_USERS',
}
export interface ModalsState {
  modal: ModalsType | null
  value: any | null
}

export const initialState: ModalsState = {
  modal: null,
  value: null,
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
    saveModalValue: (state: ModalsState, action: PayloadAction<any>) => {
      state.value = action.payload
    },
    clearModalValue: (state: ModalsState) => {
      state.value = null
    },
  },
})

export const { showModal, closeModal, saveModalValue, clearModalValue } =
  modalReducer.actions
