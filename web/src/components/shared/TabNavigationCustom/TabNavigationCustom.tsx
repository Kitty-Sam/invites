import React, { FC } from 'react'

interface IProps {
  activeTab: string
  onTabChange: (tab: string) => void
  tabs: string[]
}

export const TabNavigationCustom: FC<IProps> = ({
  activeTab,
  onTabChange,
  tabs,
}) => {
  return (
    <div className="mb-4 inline-flex items-center gap-1 rounded-lg bg-gray-100 p-1">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
            activeTab === tab
              ? 'bg-white font-medium text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}
