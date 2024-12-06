import {Route, Router} from '@redwoodjs/router'

const Routes = () => {
  return (
    <Router>
      <Route path="/invites" page={InviteInvitesPage} name="invites" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
