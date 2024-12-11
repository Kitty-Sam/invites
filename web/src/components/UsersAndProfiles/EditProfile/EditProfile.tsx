import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CircleX, Edit, FileType2, RefreshCwOff, UserPlus } from 'lucide-react'
import { IProfile } from '@/interfaces/profile.interface'
import React, { FC, useState } from 'react'
import { ModalsType, showModal } from '@/store/reducers/modalReducer'
import { useAppDispatch, useAppSelector } from '@/store/store'
import { getCurrentModalType } from '@/store/selectors'
import { EditTitle } from '@/components/UsersAndProfiles/EditTitle/EditTitle'
import { ShowTranscription } from '@/components/UsersAndProfiles/ShowTranscription/ShowTranscription'

export interface IProps {
  profile: IProfile
}

const interviews = [
  { name: 'Yuriy R.', date: 'November 29, 2024', transcription: ['hello'] },
  { name: 'Julia B.', date: 'December 6, 2024', transcription: ['hello'] },
  { name: 'John S.', date: 'December 19, 2024', transcription: ['hello'] },
  { name: 'Monica J.', date: 'December 29, 2024', transcription: ['hello'] },
]

export const EditProfile: FC<IProps> = ({ profile }) => {
  const [currentTitle, setCurrentTitle] = useState<string>('')
  const [currentTranscription, setCurrentTranscription] = useState<string[]>([])

  const dispatch = useAppDispatch()
  const modalType = useAppSelector(getCurrentModalType)

  return (
    <>
      <div className="mx-auto flex justify-end space-x-2 px-4">
        <Button variant="outline" className="flex items-center gap-2">
          <RefreshCwOff className="h-4 w-4" />
          Resync with Upwork
        </Button>
        <Button>Save</Button>
      </div>
      <div className="mx-auto flex gap-6 p-4">
        {/* Main Content */}
        <div className="flex-1 rounded-lg border bg-white px-6 py-6">
          {/* Header Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-semibold">{profile.name}</span>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => {
                  setCurrentTitle(profile.name)
                  dispatch(showModal(ModalsType.EDIT_UPWORK_PROFILE_TITLE))
                }}
              >
                <Edit className="h-4 w-4" />
              </Button>

              {modalType === ModalsType.EDIT_UPWORK_PROFILE_TITLE && (
                <EditTitle title={currentTitle} />
              )}
            </div>
            <p className="border-b pb-4 text-muted-foreground">
              Specializes in {profile.name}
            </p>
          </div>

          {/* Value Proposition */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 pt-6">
              <span className="text-xl font-semibold">Value proposition</span>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            <p className="border-b pb-4 text-black">
              Transforming complex ideas into seamless, user-friendly interfaces
              by leveraging modern web technologies. I specialize in crafting
              responsive, accessible, and visually appealing websites that drive
              engagement and enhance user experience. With a focus on clean code
              and performance optimization, I bring creativity and technical
              expertise to every project.
            </p>
          </div>

          {/* Offers Section */}
          <div className="space-y-4 border-b py-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-semibold">Offers</span>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                Frontend Developer
              </Button>
            </div>
          </div>

          {/* Portfolio Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pt-4">
              <span className="text-xl font-semibold">Portfolio</span>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="p-4">
                  <img
                    src="/send.png"
                    width={200}
                    height={100}
                    alt="Health monitoring dashboard"
                    className="mb-2 rounded-lg"
                  />
                  <p className="text-sm">
                    Fully responsive e-commerce platform with a clean UI/UX
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <img
                    src="/send.png"
                    width={200}
                    height={100}
                    alt="Health monitoring dashboard"
                    className="mb-2 rounded-lg"
                  />
                  <p className="text-sm">
                    Health monitoring dashboard with charts and data
                    visualization
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <img
                    src="/send.png"
                    width={200}
                    height={100}
                    alt="Health monitoring dashboard"
                    className="mb-2 rounded-lg"
                  />
                  <p className="text-sm">
                    Online education platform with interactive courses and
                    progress tracking
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Users Section */}
        <div className="w-80 space-y-6">
          <Card>
            <CardContent className="p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <span className="font-semibold">Users</span>
                  <p className="text-xs text-muted-foreground">Manage users</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <UserPlus className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-3">
                {profile.users.map((user) => (
                  <div
                    className="inline-flex items-center space-x-2 rounded-l bg-gray-100 px-3 py-1 text-sm text-black"
                    key={user}
                  >
                    <span>{user}</span>
                    <CircleX className="h-4 w-4" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Interviews Section */}
          <Card>
            <CardContent className="space-y-4 p-4">
              <div>
                <span className="font-semibold">Interviews</span>
                <p className="text-xs text-muted-foreground">
                  Here you can manage your interviews
                </p>
              </div>
              <div className="space-y-2">
                {interviews.map((interview) => (
                  <div
                    key={interview.name}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="text-sm font-semibold">{interview.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {interview.date}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                      onClick={() => {
                        setCurrentTranscription(interview.transcription)
                        dispatch(
                          showModal(ModalsType.SHOW_INTERVIEW_TRANSCRIPTION)
                        )
                      }}
                    >
                      <FileType2 className="h-4 w-4" />
                    </Button>
                    {modalType === ModalsType.SHOW_INTERVIEW_TRANSCRIPTION && (
                      <ShowTranscription transcription={currentTranscription} />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
