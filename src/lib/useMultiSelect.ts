import React from 'react'
import useSWR from 'swr'
import { useEventListener } from 'usehooks-ts'
import { fetcher } from '@/lib/utils'
import { API_URL } from '@/lib/constants'
import type { Response, Character } from '@/lib/types'

export function useMultiSelect() {
    const inputRef = React.useRef<React.ElementRef<'input'>>(null)
    const popupRef = React.useRef<React.ElementRef<'div'>>(null)
    const buttonRef = React.useRef<React.ElementRef<'div'>>(null)

    const [input, setInput] = React.useState<string>('')
    const [selectedCharacters, setSelectedCharacters] = React.useState<Character[]>([])
    const [isOpen, setIsOpen] = React.useState<boolean>(false)

    const { data, error } = useSWR<Response>(`${API_URL}?name=${input}`, fetcher)

    const onSelect = React.useCallback(
        (character: Character) => {
            if (selectedCharacters.some((selected) => selected.id === character.id)) return
            setSelectedCharacters((prev) => [...prev, character])
            setInput('')
        },
        [selectedCharacters]
    )

    const onRemove = React.useCallback((id: number) => {
        setSelectedCharacters((prev) => prev.filter((character) => character.id !== id))
    }, [])

    const handleOptionKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
        const options = popupRef.current?.querySelectorAll('.option')
        if (!options || options.length === 0) return

        const currentIndex = Array.from(options).findIndex((option) => option === e.currentTarget)
        if (e.key === 'ArrowDown') {
            e.preventDefault()
            if (currentIndex < options.length - 1) {
                options[currentIndex + 1].focus()
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            if (currentIndex > 0) {
                options[currentIndex - 1].focus()
            } else {
                inputRef.current?.focus()
            }
        } else if (e.key === 'Enter') {
            e.preventDefault()
            options[currentIndex].click()
        }
    }, [])

    const handleClickOutside = React.useCallback((event: MouseEvent) => {
        if (!popupRef.current || !buttonRef.current) return
        if (!popupRef.current.contains(event.target as Node) && !buttonRef.current.contains(event.target as Node)) {
            setIsOpen(false)
        }
    }, [])

    const handleKeyDown = React.useCallback((e: KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            if (popupRef.current) {
                const options = popupRef.current.querySelectorAll('.option')
                if (options.length > 0) {
                    options[0].focus()
                }
            }
        }
    }, [])

    useEventListener('keydown', handleKeyDown)
    useEventListener('mousedown', handleClickOutside)

    React.useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [])

    return {
        input,
        setInput,
        data,
        error,
        inputRef,
        popupRef,
        buttonRef,
        selectedCharacters,
        setSelectedCharacters,
        onSelect,
        onRemove,
        isOpen,
        setIsOpen,
        handleOptionKeyDown,
    }
}
