import React, { FC } from 'react'
import * as z from 'zod'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { SubmitHandler, useForm } from '@redwoodjs/forms'
import { InputCustom } from '@/components/shared/InputCustom/InputCustom'

export interface IProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

const formSchema = z.object({
  goLoginId: z.string().min(2, {
    message: 'goLogin should be at least 2 characters.',
  }),
})

type FormData = z.infer<typeof formSchema>

const NewUser: FC<IProps> = ({ isOpen, setIsOpen }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log('data', data)
    setIsOpen(false)
    reset()
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 hover:bg-blue-600">
          <img src="/plus.png" alt="Add New User" className="h-5 w-5" />
          <span>Add User</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Add User</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Here you can add Upwork users
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
                id="goLoginId"
                type="text"
                label="Gologin ID"
                required
                {...register('goLoginId', {
                  required: 'Gologin ID is required',
                })}
              />
              {errors.goLoginId && (
                <span className="text-sm text-red-500">
                  {errors.goLoginId.message}
                </span>
              )}
            </div>
          </div>
          <Button className="bg-blue-500 hover:bg-blue-600">
            <span>Save</span>
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default NewUser
