import { useContext } from "react";
import { MultiSelectContext } from "./context";
import type { MultiSelect } from '@/lib/types'

export const useMultiSelect = (): MultiSelect => {
  const context = useContext(MultiSelectContext)
  if (!context) {
      throw new Error('useMultiSelect must be used within a MultiSelectProvider')
  }
  return context
}