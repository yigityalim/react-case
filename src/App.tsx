import { MultiSelect } from '@/components/multi-select'
import { motion } from 'framer-motion'

export function App() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='container mx-auto flex min-h-full flex-col items-center justify-start gap-y-4 px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8 lg:pt-8'
        >
            <h1 className='mb-4 text-center text-2xl font-bold lg:text-3xl'>Select Case</h1>
            <MultiSelect />
        </motion.div>
    )
}
