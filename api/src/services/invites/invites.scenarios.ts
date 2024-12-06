import type { Prisma, Invite } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.InviteCreateArgs>({
  invite: {
    one: {
      data: {
        email: 'String5724943',
        companyName: 'String',
        firstName: 'String',
        jobTitle: 'String',
        inviteDuration: 2004950,
        status: 'String',
        expiresIn: '2024-12-06T07:51:50.954Z',
        updatedAt: '2024-12-06T07:51:50.954Z',
      },
    },
    two: {
      data: {
        email: 'String3342005',
        companyName: 'String',
        firstName: 'String',
        jobTitle: 'String',
        inviteDuration: 1402600,
        status: 'String',
        expiresIn: '2024-12-06T07:51:50.954Z',
        updatedAt: '2024-12-06T07:51:50.954Z',
      },
    },
  },
})

export type StandardScenario = ScenarioData<Invite, 'invite'>
