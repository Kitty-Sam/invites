import * as z from 'zod'
import { SubmitHandler, useForm } from '@redwoodjs/forms'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { durations } from '@/constants/invite-duration'
import { EStatus } from '@/enums/invite-status.enum'
import { useMutation } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import { useApolloClient } from '@apollo/client'
import { InputCustom } from '@/components/shared/InputCustom/InputCustom'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { getCurrentModalType } from '@/store/selectors'
import { closeModal, ModalsType } from '@/store/reducers/modalReducer'
import { GET_INVITES_QUERY } from '@/services/invite.graphql.service'

//Добавление нового инвайта
const CREATE_INVITE_MUTATION = gql`
  mutation CreateInviteMutation($input: CreateInviteInput!) {
    createInvite(input: $input) {
      id
      email
      companyName
      firstName
      lastName
      jobTitle
      inviteDuration
      message
      status
      expiresIn
      createdAt
      updatedAt
    }
  }
`

export interface IProps {}

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: 'First name must be at least 2 characters.',
  }),
  lastName: z.string().min(2, {
    message: 'Last name must be at least 2 characters.',
  }),
  jobTitle: z.string().min(2, {
    message: 'Job Title must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  companyName: z.string().min(1, {
    message: 'Company name is required.',
  }),
  message: z
    .string()
    .min(1, {
      message: 'Company name is required.',
    })
    .optional(),
  inviteDuration: z
    .number()
    .min(3, { message: 'Duration is 7 days by default' }),
})

type FormData = z.infer<typeof formSchema>

export const NewInvite = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>()

  const client = useApolloClient()

  const modalType = useAppSelector(getCurrentModalType)
  const dispatch = useAppDispatch()

  const [createInvite, { loading, error }] = useMutation(
    CREATE_INVITE_MUTATION,
    {
      onCompleted: () => {
        console.log('Invite created')
        client.refetchQueries({
          include: [GET_INVITES_QUERY],
        })
        navigate(routes.invites())
      },
      onError: (error) => {
        console.log('creation with error')
      },
    }
  )

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    dispatch(closeModal())

    const duration = data.inviteDuration ? Number(data.inviteDuration) : 7

    createInvite({
      variables: {
        input: {
          jobTitle: data.jobTitle,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          companyName: data.companyName,
          status: EStatus.ACTIVE,
          inviteDuration: data.inviteDuration ? Number(data.inviteDuration) : 7,
          expiresIn: new Date(
            new Date().getTime() + duration * 24 * 60 * 60 * 1000
          ).toISOString(),
        },
      },
    })

    reset()
  }

  const onInviteDurationChange = (value: string) => {
    setValue('inviteDuration', Number(value))
  }

  return (
    <Dialog
      open={modalType === ModalsType.ADD_INVITE}
      onOpenChange={() => dispatch(closeModal())}
    >
      <DialogContent className="bg-white sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">New Invitation</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Detailed information about you
          </p>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          autoComplete="off"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <InputCustom
                id="email"
                type="email"
                label="E-mail"
                required
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && (
                <span className="text-sm text-red-500">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="grid gap-2">
              <InputCustom
                id="companyName"
                label="Company Name"
                required
                {...register('companyName', {
                  required: 'Company name is required',
                })}
              />
              {errors.companyName && (
                <span className="text-sm text-red-500">
                  {errors.companyName.message}
                </span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <InputCustom
                id="firstName"
                label="Name"
                required
                {...register('firstName', {
                  required: 'First name is required',
                })}
              />
              {errors.firstName && (
                <span className="text-sm text-red-500">
                  {errors.firstName.message}
                </span>
              )}
            </div>
            <div className="grid gap-2">
              <InputCustom
                id="lastName"
                required
                label="Last Name"
                {...register('lastName', {
                  required: 'First name is required',
                })}
              />
              {errors.lastName && (
                <span className="text-sm text-red-500">
                  {errors.lastName.message}
                </span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <InputCustom
                id="jobTitle"
                label="Job Title"
                {...register('jobTitle', {
                  required: 'First name  is required',
                })}
                required
              />
              {errors.jobTitle && (
                <span className="text-sm text-red-500">
                  {errors.jobTitle.message}
                </span>
              )}
            </div>
            <div className="space-y-1">
              <label
                htmlFor="inviteDuration"
                className="block text-sm font-medium"
              >
                Invite Duration
              </label>
              <Select
                onValueChange={onInviteDurationChange}
                required
                defaultValue={'7'}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {durations.map((el) => (
                    <SelectItem value={el.value} key={el.value}>
                      {el.option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-2">
            <label htmlFor="message">Message</label>
            <Textarea
              id="message"
              placeholder="Enter your message here"
              className="min-h-[100px]"
              {...register('message')}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset()
              }}
            >
              Discard
            </Button>
            <Button variant="default" type="submit">
              <img src="/send.png" alt="Send" className="h-5 w-5" />
              <span>Send Invite</span>
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
