import type { Invite } from '@prisma/client'

import {
  invites,
  invite,
  createInvite,
  updateInvite,
  deleteInvite,
} from './invites'
import type { StandardScenario } from './invites.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('invites', () => {
  scenario('returns all invites', async (scenario: StandardScenario) => {
    const result = await invites()

    expect(result.length).toEqual(Object.keys(scenario.invite).length)
  })

  scenario('returns a single invite', async (scenario: StandardScenario) => {
    const result = await invite({ id: scenario.invite.one.id })

    expect(result).toEqual(scenario.invite.one)
  })

  scenario('creates a invite', async () => {
    const result = await createInvite({
      input: {
        email: 'String328441',
        companyName: 'String',
        firstName: 'String',
        jobTitle: 'String',
        inviteDuration: 1001646,
        status: 'String',
        expiresIn: '2024-12-06T07:51:50.949Z',
        updatedAt: '2024-12-06T07:51:50.949Z',
      },
    })

    expect(result.email).toEqual('String328441')
    expect(result.companyName).toEqual('String')
    expect(result.firstName).toEqual('String')
    expect(result.jobTitle).toEqual('String')
    expect(result.inviteDuration).toEqual(1001646)
    expect(result.status).toEqual('String')
    expect(result.expiresIn).toEqual(new Date('2024-12-06T07:51:50.949Z'))
    expect(result.updatedAt).toEqual(new Date('2024-12-06T07:51:50.949Z'))
  })

  scenario('updates a invite', async (scenario: StandardScenario) => {
    const original = (await invite({ id: scenario.invite.one.id })) as Invite
    const result = await updateInvite({
      id: original.id,
      input: { email: 'String98640032' },
    })

    expect(result.email).toEqual('String98640032')
  })

  scenario('deletes a invite', async (scenario: StandardScenario) => {
    const original = (await deleteInvite({
      id: scenario.invite.one.id,
    })) as Invite
    const result = await invite({ id: original.id })

    expect(result).toEqual(null)
  })
})
