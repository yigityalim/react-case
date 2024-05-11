import { OptionComponent } from '@/components/option'

export type Data = {
    info: Info
    results: Character[]
}

type Info = {
    count: number
    pages: number
    next?: string
    prev?: string
}

export interface Character {
    id: number
    name: string
    status: string
    species: string
    type: string
    gender: string
    origin: Origin
    location: Location
    image: string
    episode: string[]
    url: string
    created: string
}

type Origin = {
    name: string
    url: string
}

type Location = {
    name: string
    url: string
}

/**
 * Interface representing a MultiSelect component.
 */
export interface MultiSelect {
    /**
     * The page number of the API.
     */
    page: number;

    /**
     * Set the page number of the API.
     * @param page - The page number of the API.
     * @example
     * setPage(1);
     */
    setPage: React.Dispatch<React.SetStateAction<number>>;

    /**
     * The selected characters.
     */
    selectedCharacters: Character[];

    /**
     * Set the selected characters.
     * @param characters - The characters to set.
     * @example
     * setSelectedCharacters([{ id: 1, name: 'Rick', ... }, { ... }]);
     */
    setSelectedCharacters: React.Dispatch<React.SetStateAction<Character[]>>;

    /**
     * The input value.
     */
    input: string;

    /**
     * Set the input value.
     * @param str - The input value.
     * @example
     * setInput('Rick');
     */
    setInput: React.Dispatch<React.SetStateAction<string>>;

    /**
     * The state of the popup.
     */
    isOpen: boolean;

    /**
     * Set the state of the popup.
     * @param isOpen - The state of the popup.
     * @example
     * setIsOpen(true);
     */
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;

    /**
     * The callback to select a character.
     * @param character - The character to select.
     * @example
     * onSelect({ id: 1, name: 'Rick', ... });
     */
    onSelect: (character: Character) => void;

    /**
     * The callback to remove a character.
     * @param id - The ID of the character to remove.
     */
    onRemove: (id: number) => void;

    /**
     * The index of the selected option.
     */
    selectedIndex: number;

    /**
     * Set the index of the selected option.
     * @param index - The index of the selected option.
     * @example
     * setSelectedIndex(1);
     */
    setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;

    /**
     * The refs of the Option Components (Option).
     */
    optionRefs: React.MutableRefObject<OptionComponent[]>;

    /**
     * The ref of the button (div).
     */
    buttonRef: React.RefObject<React.ElementRef<'div'>>;

    /**
     * The ref of the popup (div).
     */
    popupRef: React.RefObject<React.ElementRef<'div'>>;

    /**
     * The loading state of the data.
     * @example
     * if (isLoading) return <p>Loading...</p>;
     */
    isLoading: boolean;

    /**
     * The data from the API.
     * @type {Data} - The response from the API.
     */
    data: Data | undefined;

    /**
     * The error message.
     * @example
     * if (error) return <p>Error: {error.message}</p>;
     */
    error: Error | undefined;

    /**
     * The event listener to handle the click outside of the popup.
     * @param event - The MouseEvent.
     * @example
     * handleClickOutside(event);
     */
    handleClickOutside: (event: MouseEvent) => void;

    /**
     * The ref of the end of the list.
     */
    isEndRef: React.RefObject<HTMLDivElement>;
}


export type Flatten<T> = T extends (infer U)[] ? U : T
