import React from 'react'
import { Loading, NoData, Error, AllSelected } from '@/components/ui'

import { Option } from '@/components/option'
import { useMultiSelect } from '@/context/multi-select/useMultiSelect'

export function List() {
    const {
        data,
        error,
        selectedCharacters,
        input,
        selectedIndex,
        setSelectedCharacters,
        onSelect,
        popupRef,
        isLoading,
        optionRefs,
        setSelectedIndex,
        isOpen,
        setPage,
    } = useMultiSelect()

    const res = React.useMemo(() => {
        if (!data || !data.results || error) return []
        return data.results.filter((character) => !selectedCharacters.some((selected) => selected.id === character.id))
    }, [data, error, selectedCharacters])

    const scrollIntoView = (index: number) => {
        optionRefs.current[index].scrollIntoView({ block: 'nearest' })
    }

    if (!data) return <NoData />

    if (error) return <Error />

    if (selectedCharacters.length === data.results.length)
        return <AllSelected setSelectedCharacters={setSelectedCharacters} />

    if (isLoading) return <Loading />

    return (
        <>
            {isOpen && (
                <div
                    ref={popupRef}
                    style={{ height: 400 }}
                    tabIndex={0}
                    className='no-scrollbar absolute z-10 mt-2 w-full overflow-y-auto rounded-md border border-gray-300 bg-white shadow-md focus:border focus:border-red-500'
                    onKeyDown={(e) => {
                        e.stopPropagation()
                        switch (e.key) {
                            case 'ArrowUp': {
                                const prevIndex = Math.max(selectedIndex - 1, 0)
                                setSelectedIndex(prevIndex)
                                optionRefs.current[prevIndex].focus()
                                scrollIntoView(prevIndex)
                                break
                            }
                            case 'ArrowDown': {
                                const nextIndex = Math.min(selectedIndex + 1, data.results.length - 1)
                                setSelectedIndex(nextIndex)
                                optionRefs.current[nextIndex].focus()
                                scrollIntoView(nextIndex)
                                break
                            }
                            case 'Tab': {
                                setSelectedIndex((prev) => Math.min(prev + 1, data.results.length - 1))
                                break
                            }
                        }
                    }}
                >
                    {res
                        .sort((a, b) => b.episode.length - a.episode.length)
                        //.filter((character) => character.name.toLowerCase().includes(input.toLowerCase()))
                        .map((character) => (
                            <Option
                                key={character.id}
                                character={character}
                                highlight={input}
                                onSelectCharacter={onSelect}
                                ref={(el) => el && optionRefs.current.push(el)}
                                nextRef={optionRefs.current[selectedIndex + 1]}
                            />
                        ))}
                    <div className='flex w-full items-center justify-between gap-x-2 p-2 *:transition *:flex *:duration-300 *:ease-in-out *:w-full *:items-center *:justify-center *:rounded-md *:bg-gray-100 *:py-2 *:text-sm *:font-semibold *:text-gray-800 *:hover:bg-gray-200'>
                        {data.info.prev && (
                            <button onClick={() => setPage((prev) => prev - 1)}>
                                Previous
                            </button>
                        )}
                        {data.info.next && (
                            <button onClick={() => setPage((prev) => prev + 1)}>
                                Next
                            </button>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}
