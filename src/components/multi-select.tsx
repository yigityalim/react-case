import React from 'react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { CircleX as Close, ChevronDown } from 'lucide-react'
import type { Character } from '@/lib/types'
import { useMultiSelect } from '@/lib/useMultiSelect'

interface OptionProps {
    tabIndex: number
    character: Character
    highlight: string
    onClick: () => void
}

export function Option({ tabIndex, character, highlight, onClick }: OptionProps) {
    const nameParts = React.useMemo(
        () => character.name.split(new RegExp(`(${highlight})`, 'ig')),
        [character.name, highlight]
    )

    return (
        <motion.div
            tabIndex={tabIndex}
            className='option flex cursor-pointer items-center gap-4 p-2 hover:bg-gray-100'
            onClick={onClick}
            //whileHover={{ scale: 1.02 }}
        >
            <img src={character.image} alt={character.name} className='size-12 rounded-full' />
            <div className='flex flex-col items-start justify-center gap-1 overflow-hidden text-ellipsis whitespace-nowrap'>
                <p className='text-lg font-semibold'>
                    {nameParts.map((part, index) => (
                        <span
                            key={index}
                            className={part.toLowerCase() === highlight.toLowerCase() ? 'font-bold text-red-400' : ''}
                        >
                            {part}
                        </span>
                    ))}
                </p>
                <p className='text-sm'>Bölüm sayısı: {character.episode.length}</p>
            </div>
        </motion.div>
    )
}

export function MultiSelect() {
    const {
        buttonRef,
        handleOptionKeyDown,
        input,
        inputRef,
        isOpen,
        onRemove,
        onSelect,
        popupRef,
        selectedCharacters,
        setSelectedCharacters,
        setInput,
        setIsOpen,
        data,
    } = useMultiSelect()

    return (
        <div className='relative w-full max-w-2xl'>
            <div
                ref={buttonRef}
                className='relative flex w-full cursor-text flex-row items-center justify-between gap-2 rounded-md border border-gray-300 px-2 py-1 transition-all duration-300 ease-in-out focus-within:border-blue-500'
            >
                {selectedCharacters.length > 0 && (
                    <div className='no-scrollbar flex w-fit flex-row items-center justify-start gap-x-2 overflow-x-auto rounded-lg'>
                        {selectedCharacters.map((character) => (
                            <div
                                onClick={() => onRemove(character.id)}
                                key={character.id}
                                className='flex w-fit shrink-0 cursor-pointer select-none items-center gap-2 rounded-lg bg-zinc-200 px-2 py-1'
                            >
                                <img src={character.image} alt={character.name} className='size-8 rounded-full' />
                                <p>{character.name}</p>
                                <Close size={16} />
                            </div>
                        ))}
                    </div>
                )}
                <input
                    ref={inputRef}
                    type='text'
                    className={cn('shrink-0 border-b border-gray-300 bg-transparent p-2 focus:outline-none', 'flex-1')}
                    placeholder='Karakter ara...'
                    value={input}
                    onChange={(e) => {
                        setInput(e.target.value)
                        setIsOpen(true)
                    }}
                />
                <ChevronDown
                    size={24}
                    className={cn(
                        'shrink-0 transform cursor-pointer text-gray-500 transition-transform duration-300 ease-in-out',
                        isOpen ? 'rotate-180' : ''
                    )}
                    onClick={(e) => {
                        setIsOpen((prev) => !prev)
                        e.stopPropagation()
                    }}
                />
            </div>
            <AnimatePresence>
                {isOpen && data && (
                    <motion.div
                        ref={popupRef}
                        className='absolute z-10 mt-2 max-h-60 w-full overflow-y-auto rounded-md border border-gray-300 bg-white shadow-md'
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        onKeyDown={handleOptionKeyDown}
                    >
                        {selectedCharacters.length === data.results.length ? (
                            <div className='option flex items-center gap-4 p-2'>
                                Sanırım hepsini seçtiniz.{' '}
                                <button
                                    className='cursor-pointer text-blue-500 underline'
                                    onClick={() => setSelectedCharacters([])}
                                >
                                    Temizle
                                </button>
                            </div>
                        ) : (
                            data.results &&
                            data.results
                                .filter(
                                    (character) => !selectedCharacters.some((selected) => selected.id === character.id)
                                )
                                .map((character, index) => (
                                    <Option
                                        tabIndex={index}
                                        key={character.id}
                                        character={character}
                                        highlight={input}
                                        onClick={() => onSelect(character)}
                                    />
                                ))
                        )}
                        {data.error && data.error && (
                            <div className='option flex cursor-pointer items-center gap-4 p-2 hover:bg-gray-100'>
                                Karakter Bulunamadı.
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
