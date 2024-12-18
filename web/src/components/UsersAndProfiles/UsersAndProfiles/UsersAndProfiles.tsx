import React, { useState } from 'react'
import { UsersTable } from '@/components/UsersAndProfiles/UsersTable/UsersTable'
import { ProfilesTable } from '@/components/UsersAndProfiles/ProfilesTable/ProfilesTable'
import { EUsersOrProfilesMode } from '@/enums/users-profiles-mode.enum'
import { NewUser } from '@/components/UsersAndProfiles/NewUser/NewUser'
import { NewProfile } from '@/components/UsersAndProfiles/NewProfile/NewProfile'
import { TabNavigationCustom } from '@/components/shared/TabNavigationCustom/TabNavigationCustom'
import { ButtonWithIconCustom } from '@/components/shared/ButtonWithIconCustom/ButtonWithIconCustom'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { getCurrentModalType, getCurrentPageType } from '@/store/selectors'
import { ModalsType, showModal } from '@/store/reducers/modalReducer'
import { EditProfile } from '@/components/UsersAndProfiles/EditProfile/EditProfile'
import { PageType } from '@/store/reducers/pageReducer'
import { useQuery } from '@redwoodjs/web'
import { getTotalPages } from '@/helpers/pagination/getTotalPages'
import { UPWORK_USERS_QUERY } from '@/queries/user.graphql.query'
import {
  UPWORK_PROFILE_BY_ID_QUERY,
  UPWORK_PROFILES_QUERY,
} from '@/queries/profile.graphql.query'

const ITEMS_PER_PAGE = 5

export const UsersAndProfiles = () => {
  const [activeTab, setActiveTab] = useState<string>(EUsersOrProfilesMode.USERS)
  const [currentPage, setCurrentPage] = useState(1)
  const [currentProfileId, setCurrentProfileId] = useState<number | null>(null)

  const modalType = useAppSelector(getCurrentModalType)
  const pageType = useAppSelector(getCurrentPageType)
  const dispatch = useAppDispatch()

  const { data: allUsers } = useQuery(UPWORK_USERS_QUERY, {
    variables: { page: currentPage, pageSize: ITEMS_PER_PAGE },
  })

  const { data: allProfiles } = useQuery(UPWORK_PROFILES_QUERY, {
    variables: { page: currentPage, pageSize: ITEMS_PER_PAGE },
  })

  const { data: currentProfile } = useQuery(UPWORK_PROFILE_BY_ID_QUERY, {
    variables: { id: currentProfileId },
    skip: !currentProfileId,
  })

  const {
    upworkUsersPerPage = [],
    totalUserItems,
    upworkUsers,
  } = allUsers?.upworkUsers || {}
  const {
    upworkProfilesPerPage = [],
    totalProfileItems,
    upworkProfiles,
  } = allProfiles?.upworkProfiles || {}

  return (
    <>
      {pageType === PageType.EDIT_UPWORK_PROFILE && currentProfile ? (
        <EditProfile
          profile={currentProfile.upworkProfile}
          users={upworkUsers}
        />
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
                profiles={upworkProfiles}
                users={upworkUsersPerPage}
                currentPage={currentPage}
                totalPages={
                  totalUserItems
                    ? getTotalPages(totalUserItems, ITEMS_PER_PAGE)
                    : 1
                }
                onPageChange={setCurrentPage}
              />
            </>
          ) : (
            <ProfilesTable
              profiles={upworkProfilesPerPage}
              currentPage={currentPage}
              totalPages={
                totalProfileItems
                  ? getTotalPages(totalProfileItems, ITEMS_PER_PAGE)
                  : 1
              }
              onPageChange={setCurrentPage}
              setCurrentProfileId={setCurrentProfileId}
            />
          )}
        </>
      )}
    </>
  )
}
