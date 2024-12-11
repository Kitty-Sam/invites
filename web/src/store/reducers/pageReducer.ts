import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export enum PageType {
  EDIT_UPWORK_PROFILE = 'EDIT_UPWORK_PROFILE',
}
export interface PageState {
  page: PageType | null
}

export const initialState: PageState = {
  page: null,
}

export const pageReducer = createSlice({
  name: 'pageReducer',
  initialState,
  reducers: {
    showPage: (state: PageState, action: PayloadAction<PageType>) => {
      state.page = action.payload
    },
    closePage: (state: PageState) => {
      state.page = null
    },
  },
})

export const { showPage, closePage } = pageReducer.actions
