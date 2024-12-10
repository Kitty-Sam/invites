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

export interface IProps {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

const formSchema = z.object({})

type FormData = z.infer<typeof formSchema>

const NewProfile: FC<IProps> = ({ isOpen, setIsOpen }) => {
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
          <span>Add Profile</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Add Profile</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Here you can add Upwork profiles
          </p>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default NewProfile
