import React from 'react'
import { cn } from '@/lib/utils'
import type { Character } from '@/lib/types'

export interface OptionProps extends React.ComponentProps<'div'> {
    character: Character
    onSelectCharacter?: (character: Character) => void
    highlight: string
    nextRef: React.ComponentRef<'div'>
}

export const Option = React.forwardRef<HTMLDivElement, OptionProps>(
    ({ character, highlight, onSelectCharacter, nextRef, ...props }, ref) => {
        const nameParts = React.useMemo(
            () => character.name.split(new RegExp(`(${highlight})`, 'ig')),
            [character.name, highlight]
        )

        const handleKeyDown = React.useCallback<React.KeyboardEventHandler>(
            (e: React.KeyboardEvent<HTMLDivElement>) => {
                if (e.key === 'Enter') {
                    onSelectCharacter?.(character)
                    nextRef?.focus()
                }
            },
            [character, onSelectCharacter, nextRef]
        )

        const onSelect = React.useCallback(() => {
            onSelectCharacter?.(character)
        }, [character, onSelectCharacter])

        return (
            <div
                {...props}
                tabIndex={0}
                className={cn(
                    'option flex cursor-pointer items-center gap-4 border-b border-gray-200 p-2 hover:bg-gray-100 focus:bg-gray-100'
                )}
                onClick={onSelect}
                onKeyDown={handleKeyDown}
                ref={ref}
            >
                <img src={character.image} alt={character.name} className='size-12 rounded-full' />
                <div className='flex w-full flex-col items-start justify-center gap-1 overflow-hidden text-ellipsis whitespace-nowrap'>
                    <div className='flex w-full flex-row items-center justify-start gap-x-2'>
                        <p className='truncate text-lg'>
                            {nameParts.map((part) => (
                                <span
                                    key={crypto.randomUUID()}
                                    className={
                                        part.toLowerCase() === highlight.toLowerCase() ? 'font-bold text-black' : 'text-zinc-700 font-normal'
                                    }
                                >
                                    {part}
                                </span>
                            ))}
                        </p>
                        <div className='ml-auto space-x-2'>
                            {character.gender !== 'unknown' && (
                                <span
                                    className={cn('px-1.5 py-0.5 rounded-md text-xs', {
                                        'bg-blue-500 text-blue-100': character.gender === 'Male',
                                        'bg-pink-500 text-pink-100': character.gender === 'Female',
                                        'bg-gray-500 text-white': character.gender === 'Genderless',
                                    })}

                                >
                                    {character.gender}
                                </span>
                            )}
                            <span className="rounded-md bg-gray-200 px-1.5 py-0.5 text-sm text-gray-500">
                                {character.species}
                            </span>
                            <span
                                className={cn('rounded-md bg-gray-200  px-1.5 py-0.5 text-sm', {
                                    'bg-green-200 text-green-900': character.status === 'Alive',
                                    'bg-red-200 text-red-700': character.status === 'Dead',
                                    'bg-yellow-200 text-gray-800': character.status === 'unknown',
                                })}
                            >
                                {character.status}
                            </span>
                        </div>
                    </div>
                    <p className="text-sm">Episode: {character.episode.length}</p>
                </div>
            </div>
        )
    }
)

export type OptionComponent = React.ElementRef<typeof Option>
export type OptionComponentProps = React.ComponentProps<typeof Option>
