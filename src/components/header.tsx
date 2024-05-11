import { useMultiSelect } from '@/context/multi-select/useMultiSelect'
import { cn } from '@/lib/utils'
import React from 'react'
import _ from 'lodash'

export function Header() {
    const { buttonRef, selectedCharacters, input, setInput, isOpen, setIsOpen, onRemove } = useMultiSelect()

    const calculateSelectedCharactersHeight = React.useMemo<number>(() => {
        if (selectedCharacters.length === 1) return 42 // 40px + 2px border
        return selectedCharacters.length <= 2 ? selectedCharacters.length * 44 : 88
    }, [selectedCharacters.length])

    const onChange = React.useCallback<(e: React.ChangeEvent<HTMLInputElement>) => void>(
        (e) => {
            setInput(e.target.value)
        },
        [setInput]
    )

    return (
        <div
            tabIndex={0}
            ref={buttonRef}
            className='relative flex w-full flex-row items-end justify-between gap-2 rounded-md border border-gray-300 px-2 py-1 transition-all duration-300 ease-in-out '
        >
            {selectedCharacters.length > 0 && (
                <div
                    style={{
                        height: calculateSelectedCharactersHeight,
                    }}
                    className='no-scrollbar relative flex w-fit flex-col items-center justify-start gap-2 overflow-y-auto rounded-lg'
                >
                    {selectedCharacters.map((character) => (
                        <button
                            key={character.name}
                            onClick={() => onRemove(character.id)}
                            tabIndex={0}
                            className='flex shrink-0 cursor-pointer select-none items-center justify-between gap-2 rounded-lg bg-zinc-200 px-2 py-1'
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === 'Backspace') {
                                    onRemove(character.id)
                                }
                            }}
                        >
                            <img src={character.image} alt={character.name} className='size-8 rounded-full' />
                            <p className={cn('hidden truncate text-sm font-semibold text-gray-800 sm:block')}>
                                {character.name}
                            </p>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='24'
                                height='24'
                                viewBox='0 0 24 24'
                                fill='none'
                                stroke='currentColor'
                                strokeWidth='2'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                className='hidden size-4 shrink-0 sm:block'
                            >
                                <circle cx='12' cy='12' r='10' />
                                <path d='m15 9-6 6' />
                                <path d='m9 9 6 6' />
                            </svg>
                        </button>
                    ))}
                </div>
            )}

            <div className='relative flex-1 shrink-0'>
                <input
                    tabIndex={0}
                    type='text'
                    className={cn(
                        'peer w-full rounded-lg border border-gray-300 bg-transparent p-2 focus:border focus:border-blue-500 focus:outline-none'
                    )}
                    placeholder='Search for a character...'
                    value={input}
                    onClick={() => setIsOpen(true)}
                    onChange={(e) => {
                        onChange(e)
                        setIsOpen(true)
                    }}
                />
                {input && (
                    <svg
                        tabIndex={0}
                        className='absolute right-2 top-2 size-6 cursor-pointer text-gray-500 peer-focus:stroke-blue-500 peer-focus:outline-none'
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        onClick={() => setInput('')}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                setInput('')
                            }
                        }}
                    >
                        <circle cx='12' cy='12' r='10' />
                        <path d='m15 9-6 6' />
                        <path d='m9 9 6 6' />
                    </svg>
                )}
            </div>
            <button
                tabIndex={0}
                onClick={(e) => {
                    e.stopPropagation()
                    setIsOpen((prev) => !prev)
                }}
                className='flex h-[41px] shrink-0 cursor-pointer items-center justify-center'
            >
                <svg
                    className={cn(
                        'size-6 transform cursor-pointer text-gray-500 transition-transform duration-300 ease-in-out focus:border-none focus:outline-none',
                        isOpen ? 'rotate-180' : ''
                    )}
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                >
                    <path d='m6 9 6 6 6-6' />
                </svg>
            </button>
        </div>
    )
}
