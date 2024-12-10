import React, { useState } from 'react'
import { UsersTable } from '@/components/UsersAndProfiles/UsersTable/UsersTable'
import { ProfilesTable } from '@/components/UsersAndProfiles/ProfilesTable/ProfilesTable'
import { EUsersOrProfilesMode } from '@/enums/users-profiles-mode.enum'
import NewUser from '@/components/UsersAndProfiles/NewUser/NewUser'
import NewProfile from '@/components/UsersAndProfiles/NewProfile/NewProfile'
import { TabNavigationCustom } from '@/components/shared/TabNavigationCustom/TabNavigationCustom'
import { IProfile } from '@/interfaces/profile.interface'
import { IUser } from '@/interfaces/user.interface'

const ITEMS_PER_PAGE = 5

// Mock data
const users = [
  {
    id: '1',
    name: 'Stephanie Sharkey',
    email: 'steph55@gmail.com',
    goLoginId: 'fadsfhsa66×719x',
    specializedProfiles: ['Web Design', 'UX design', 'Frontend development'],
  },
  {
    id: '2',
    name: 'Joshua Jones',
    email: 'j.jones@aol.com',
    goLoginId: 'kjlkf43u345h',
    specializedProfiles: ['Machine Learning'],
  },
  {
    id: '3',
    name: 'Rhonda Rhodes',
    email: 'r.rhodes@outlook.com',
    goLoginId: 'fjsdbfbqjwt',
    specializedProfiles: ['Product Management', 'Marketing Strategy'],
  },
  {
    id: '4',
    name: 'James Hall',
    email: 'j.hall367@outlook.com',
    goLoginId: 'gkmgotmoboteo17132',
    specializedProfiles: ['3D Animation'],
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
  const [isAddUser, setIsAddUser] = useState(false)
  const [isAddProfile, setIsAddProfile] = useState(false)
  const [isEditUser, setIsEditUser] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)

  const currentData =
    activeTab === EUsersOrProfilesMode.USERS ? users : profiles

  const totalPages = Math.ceil(currentData.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE

  const paginatedData = currentData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  )

  return (
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
          <NewUser setIsOpen={setIsAddUser} isOpen={isAddUser} />
        ) : (
          <NewProfile setIsOpen={setIsAddProfile} isOpen={isAddProfile} />
        )}
      </div>

      {activeTab === EUsersOrProfilesMode.USERS ? (
        <>
          <UsersTable
            users={paginatedData}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            isEditUser={isEditUser}
            setIsEditUser={setIsEditUser}
          />
        </>
      ) : (
        <ProfilesTable
          profiles={paginatedData}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </>
  )
}

export default UsersAndProfiles
