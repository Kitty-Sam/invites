import {Route, Router} from '@redwoodjs/router'

const Routes = () => {
  return (
    <Router>
      <Route path="/onboarding" page={OnboardingPage} name="onboarding" />
      <Route path="/invites" page={InvitesPage} name="invites" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
