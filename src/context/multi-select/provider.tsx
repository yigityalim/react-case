import React from 'react'
import useSwr from 'swr'
import { OptionComponent } from '@/components/option'
import { API_URL } from '@/lib/constants'
import { fetcher } from '@/lib/utils'
import { MultiSelectContext } from '@/context/multi-select/context'
import { useEventListener } from 'usehooks-ts'
import type { Character, MultiSelect, Data } from '@/lib/types'

export function MultiSelectProvider({ children }: React.PropsWithChildren): React.ReactElement {
    const [page, setPage] = React.useState<number>(1)
    const [selectedIndex, setSelectedIndex] = React.useState<number>(-1)
    const [input, setInput] = React.useState<string>('')
    const [selectedCharacters, setSelectedCharacters] = React.useState<Character[]>([])
    const [isOpen, setIsOpen] = React.useState<boolean>(false)

    const popupRef = React.useRef<React.ElementRef<'div'>>(null)
    const buttonRef = React.useRef<React.ElementRef<'div'>>(null)
    const optionRefs = React.useRef<OptionComponent[]>([])

    const { data, isLoading, error } = useSwr<Data>(`${API_URL}?page=${page}&name=${input}`,fetcher)

    const onSelect = React.useCallback(
        (character: Character) => {
            if (selectedCharacters.some((selected) => selected.id === character.id)) return
            setSelectedCharacters((prev) => [...prev, character])
            setIsOpen(false)
            if (!data?.results) return 
            setSelectedIndex((prev) => Math.min(prev + 1, data?.results?.length - 1))
        },
        [selectedCharacters, data]
    )

    const onRemove = React.useCallback((id: number) => {
        setSelectedCharacters((prev) => prev.filter((character) => character.id !== id))
    }, [])

    /**
     * Handle the click outside of the popup
     * @param event - The MouseEvent
     */
    const handleClickOutside = React.useCallback((event: MouseEvent) => {
        if (!popupRef.current || !buttonRef.current) return
        if (!popupRef.current.contains(event.target as Node) && !buttonRef.current.contains(event.target as Node)) {
            setIsOpen(false)
        }
    }, [])

    const isEndRef = React.useRef<HTMLDivElement>(null)

    /**
     * Add the event listener to handle the click outside of the popup
     * @see {@link https://usehooks-ts.com/react-hook/use-event-listener}
     * @example
     */
    useEventListener('mousedown', handleClickOutside)
    useEventListener('keydown', e => {
        if (e.key === 'Escape') {
            setIsOpen(false)
        }
    })

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    console.log('Intersecting')

                    setPage((prev) => prev + 1)
                }
            },
            { threshold: 1 }
        )
        const currentRef = isEndRef.current

        if (currentRef) {
            observer.observe(currentRef)
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef)
            }
        }
    }, [isEndRef])

    const value = React.useMemo<MultiSelect>(
        () => ({
            page,
            setPage,
            selectedCharacters,
            setSelectedCharacters,
            input,
            setInput,
            isOpen,
            setIsOpen,
            onSelect,
            onRemove,
            selectedIndex,
            setSelectedIndex,
            optionRefs,
            buttonRef,
            popupRef,
            isLoading,
            data,
            error,
            handleClickOutside,
            isEndRef,
        }),
        [
            page,
            setPage,
            selectedCharacters,
            setSelectedCharacters,
            input,
            setInput,
            isOpen,
            setIsOpen,
            onSelect,
            onRemove,
            selectedIndex,
            setSelectedIndex,
            optionRefs,
            buttonRef,
            popupRef,
            isLoading,
            data,
            error,
            handleClickOutside,
            isEndRef,
        ]
    )

    return <MultiSelectContext.Provider value={value}>{children}</MultiSelectContext.Provider>
}
