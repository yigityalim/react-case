import { Header } from '@/components/header'
import { List } from '@/components/list'
import { MultiSelectProvider } from '@/context/multi-select/provider'

export function MultiSelect() {
    return (
        <MultiSelectProvider>
            <div className='relative w-full max-w-2xl'>
                <Header />
                <List />
            </div>
        </MultiSelectProvider>
    )
}
