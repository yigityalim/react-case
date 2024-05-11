import { createContext } from 'react'
import { MultiSelect } from '@/lib/types'

export const MultiSelectContext = createContext<MultiSelect | undefined>(undefined)
export type MultiSelectContextType = typeof MultiSelectContext
