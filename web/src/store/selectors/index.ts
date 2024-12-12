import { AppRootState } from '@/store/store'

export const getCurrentModalType = (state: AppRootState) => state.modals.modal
export const getCurrentModalValue = (state: AppRootState) => state.modals.value

export const getCurrentPageType = (state: AppRootState) => state.page.page
