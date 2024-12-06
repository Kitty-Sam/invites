import * as z from 'zod';
import {FC} from "react";
import type {CreateInviteMutation, CreateInviteMutationVariables,} from 'types/graphql'
import {navigate, routes} from '@redwoodjs/router'
import type {TypedDocumentNode} from '@redwoodjs/web'
import {useMutation} from '@redwoodjs/web'
import {toast} from '@redwoodjs/web/toast'
import {SubmitHandler, useForm} from "@redwoodjs/forms";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import {InputCustom} from "@/components/Invite/InputCustom/InputCustom";
import {Button} from "@/components/ui/button";
import {EStatus} from "@/components/Invite/Invites/Invites";
import {QUERY} from "@/components/Invite/InvitesCell/InvitesCell";




const CREATE_INVITE_MUTATION: TypedDocumentNode<
  CreateInviteMutation,
  CreateInviteMutationVariables
> = gql`
  mutation CreateInviteMutation($input: CreateInviteInput!) {
    createInvite(input: $input) {
      id
    }
  }
`
export interface IProps {
  setIsOpen: (value: boolean) => void;
  isOpen: boolean;
}


const formSchema = z.object({
  firstName: z.string().min(2, {
    message: 'First name must be at least 2 characters.',
  }),
  lastName: z
    .string()
    .min(2, {
      message: 'Last name must be at least 2 characters.',
    })
    .optional(),
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
  inviteDuration: z.number().min(3, { message: 'Duration is 7 days by default' }),
});

type FormData = z.infer<typeof formSchema>;

export const durations = [
  { option: '3 Days', value: '3' },
  { option: '7 Days', value: '7' },
  { option: '14 Days', value: '14' },
  { option: '30 Days', value: '30' },
] as const;

export const NewInvite : FC<IProps> = ({ setIsOpen, isOpen }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const [createInvite, { loading, error }] = useMutation(
    CREATE_INVITE_MUTATION,
    {
      refetchQueries: [{ query: QUERY }],
      onCompleted: () => {
        toast.success('Invite created')
        navigate(routes.invites())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsOpen(false)
    //@ts-ignore
    createInvite({ variables: { input: {...data, status: EStatus.ACTIVE, inviteDuration: Number(data.inviteDuration),  expiresIn: new Date(new Date().getTime() + Number(data.inviteDuration) * 24 * 60 * 60 * 1000).toISOString() } } })
    reset();

  }

  const onInviteDurationChange = (value: string) => {
    setValue('inviteDuration', Number(value));
  };


  return (<Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 hover:bg-blue-600">
          <span>New Invite</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl">New Invitation</DialogTitle>
          <p className="text-sm text-muted-foreground">Detailed information about you</p>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" autoComplete="off">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <InputCustom
                id="email"
                type="email"
                label="E-mail"
                required
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            </div>
            <div className="grid gap-2">
              <InputCustom
                id="companyName"
                label="Company Name"
                required
                {...register('companyName', { required: 'Company name is required' })}
              />
              {errors.companyName && <span className="text-red-500 text-sm">{errors.companyName.message}</span>}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <InputCustom
                id="firstName"
                label="Name"
                required
                {...register('firstName', { required: 'First name  is required' })}
              />
              {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName.message}</span>}
            </div>
            <div className="grid gap-2">
              <InputCustom id="lastName" label="Last Name" {...register('lastName')} />
              {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName.message}</span>}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <InputCustom
                id="jobTitle"
                label="Job Title"
                {...register('jobTitle', { required: 'First name  is required' })}
                required
              />
              {errors.jobTitle && <span className="text-red-500 text-sm">{errors.jobTitle.message}</span>}
            </div>
            <div className="space-y-1">
              <label htmlFor="inviteDuration" className="block text-sm font-medium">
                Invite Duration
              </label>
              <Select onValueChange={onInviteDurationChange} required defaultValue={'7'}>
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
                reset();
              }}
            >
              Discard
            </Button>
            <Button className="bg-blue-500 hover:bg-blue-600">
              <span>Send Invite</span>
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

