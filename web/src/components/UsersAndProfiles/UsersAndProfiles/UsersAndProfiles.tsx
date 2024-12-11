import React, { useState } from 'react'
import { UsersTable } from '@/components/UsersAndProfiles/UsersTable/UsersTable'
import { ProfilesTable } from '@/components/UsersAndProfiles/ProfilesTable/ProfilesTable'
import { EUsersOrProfilesMode } from '@/enums/users-profiles-mode.enum'
import NewUser from '@/components/UsersAndProfiles/NewUser/NewUser'
import NewProfile from '@/components/UsersAndProfiles/NewProfile/NewProfile'
import { TabNavigationCustom } from '@/components/shared/TabNavigationCustom/TabNavigationCustom'
import { IProfile } from '@/interfaces/profile.interface'
import { IUser } from '@/interfaces/user.interface'
import { Button } from '@/components/ui/button'
import { ButtonWithIconCustom } from '@/components/shared/ButtonWithIconCustom/ButtonWithIconCustom'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { getCurrentModalType, getCurrentPageType } from '@/store/selectors'
import { ModalsType, showModal } from '@/store/reducers/modalReducer'
import { UsersAndProfilesLayout } from '@/layouts/UsersAndProfilesLayout/UsersAndProfilesLayout'
import { EditProfile } from '@/components/UsersAndProfiles/EditProfile/EditProfile'
import { PageType } from '@/store/reducers/pageReducer'

const ITEMS_PER_PAGE = 5

// Mock data
const users = [
  {
    id: '1',
    name: 'Stephanie Sharkey',
    email: 'steph55@gmail.com',
    goLoginId: 'fadsfhsa66×719x',
    specialties: ['Web Design', 'UX design', 'Frontend development'],
  },
  {
    id: '2',
    name: 'Joshua Jones',
    email: 'j.jones@aol.com',
    goLoginId: 'kjlkf43u345h',
    specialties: ['Machine Learning'],
  },
  {
    id: '3',
    name: 'Rhonda Rhodes',
    email: 'r.rhodes@outlook.com',
    goLoginId: 'fjsdbfbqjwt',
    specialties: ['Product Management', 'Marketing Strategy'],
  },
  {
    id: '4',
    name: 'James Hall',
    email: 'j.hall367@outlook.com',
    goLoginId: 'gkmgotmoboteo17132',
    specialties: ['3D Animation'],
  },
] as IUser[]

const profiles = [
  {
    id: '1',
    name: 'Web Design',
    users: ['Stephanie Sharkey'],
  },
  {
    id: '2',
    name: 'Machine Learning',
    users: ['Joshua Jones'],
  },
  {
    id: '3',
    name: 'Product Management',
    users: ['Rhonda Rhodes'],
  },
  {
    id: '4',
    name: '3D Animation',
    users: ['James Hall', 'Rhonda Rhodes'],
  },
] as IProfile[]

const UsersAndProfiles = () => {
  const [activeTab, setActiveTab] = useState<string>(EUsersOrProfilesMode.USERS)
  const [currentPage, setCurrentPage] = useState(1)
  const [currentProfile, setCurrentProfile] = useState<IProfile | null>(null)

  const modalType = useAppSelector(getCurrentModalType)
  const pageType = useAppSelector(getCurrentPageType)

  const dispatch = useAppDispatch()

  const currentData =
    activeTab === EUsersOrProfilesMode.USERS ? users : profiles

  const totalPages = Math.ceil(currentData.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE

  const paginatedData = currentData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  )

  return (
    <UsersAndProfilesLayout>
      {pageType === PageType.EDIT_UPWORK_PROFILE ? (
        <EditProfile profile={currentProfile} />
      ) : (
        <>
          <div className="flex justify-between">
            <TabNavigationCustom
              tabs={[EUsersOrProfilesMode.USERS, EUsersOrProfilesMode.PROFILES]}
              activeTab={activeTab}
              onTabChange={(tab) => {
                setActiveTab(tab)
                setCurrentPage(1)
              }}
            />

            {activeTab === EUsersOrProfilesMode.USERS ? (
              modalType === ModalsType.ADD_UPWORK_USER ? (
                <>
                  <ButtonWithIconCustom
                    onClick={() => {}}
                    title={'Add User'}
                    src={'/plus.png'}
                  />
                  <NewUser />
                </>
              ) : (
                <ButtonWithIconCustom
                  onClick={() =>
                    dispatch(showModal(ModalsType.ADD_UPWORK_USER))
                  }
                  title={'Add User'}
                  src={'/plus.png'}
                />
              )
            ) : modalType === ModalsType.ADD_UPWORK_PROFILE ? (
              <>
                <ButtonWithIconCustom
                  onClick={() => {}}
                  title={'Add Profile'}
                  src={'/plus.png'}
                />
                <NewProfile />
              </>
            ) : (
              <ButtonWithIconCustom
                onClick={() =>
                  dispatch(showModal(ModalsType.ADD_UPWORK_PROFILE))
                }
                title={'Add Profile'}
                src={'/plus.png'}
              />
            )}
          </div>

          {activeTab === EUsersOrProfilesMode.USERS ? (
            <>
              <UsersTable
                users={paginatedData}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          ) : (
            <ProfilesTable
              profiles={paginatedData}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              setCurrentProfile={setCurrentProfile}
            />
          )}
        </>
      )}
    </UsersAndProfilesLayout>
  )
}

export default UsersAndProfiles
