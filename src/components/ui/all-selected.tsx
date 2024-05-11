import type { Character } from '@/lib/types'

export function AllSelected({
    setSelectedCharacters,
}: {
    setSelectedCharacters: React.Dispatch<React.SetStateAction<Character[]>>
}) {
    return (
        <div className='option flex items-center gap-4 p-2'>
            Sanırım hepsini seçtiniz.{' '}
            <button className='cursor-pointer text-blue-500 underline' onClick={() => setSelectedCharacters([])}>
                Temizle
            </button>
        </div>
    )
}
