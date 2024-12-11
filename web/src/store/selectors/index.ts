import { AppRootState } from '@/store/store'

export const getCurrentModalType = (state: AppRootState) => state.modals.modal
export const getCurrentPageType = (state: AppRootState) => state.page.page
