import { Metadata } from '@redwoodjs/web'

const OnboardingPage = () => {
  return (
    <>
      <Metadata title="Onboarding" description="Onboarding page" />

      <h1>OnboardingPage</h1>
      <p>
        Find me in{' '}
        <code>./web/src/pages/OnboardingPage/OnboardingPage.tsx</code>
      </p>
      {/*
          My default route is named `onboarding`, link to me with:
          `<Link to={routes.onboarding()}>Onboarding</Link>`
      */}
    </>
  )
}

export default OnboardingPage
