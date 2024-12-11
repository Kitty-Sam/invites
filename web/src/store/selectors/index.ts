import { AppRootState } from '@/store/store'

export const getCurrentModalType = (state: AppRootState) => state.modals.modal
