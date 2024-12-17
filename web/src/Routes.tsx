import { Route, Router, Set } from '@redwoodjs/router'
import { UsersAndProfilesLayout } from '@/layouts/UsersAndProfilesLayout/UsersAndProfilesLayout'
import React from 'react'
import InvitesPage from '@/pages/InvitesPage/InvitesPage'
import UsersAndProfilesPage from '@/pages/UsersAndProfilesPage/UsersAndProfilesPage'
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage'
import OnboardingPage from '@/pages/OnboardingPage/OnboardingPage'

export const Routes = () => {
  return (
    <Router>
      <Set wrap={UsersAndProfilesLayout}>
        <Route path="/users" page={UsersAndProfilesPage} name="usersAndProfiles" />
        <Route path="/invites" page={InvitesPage} name="invites" />
      </Set>
      <Route notfound page={NotFoundPage} />
      <Route path="/onboarding" page={OnboardingPage} name="onboarding" />
    </Router>
  )
}
