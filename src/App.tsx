import { MultiSelect } from '@/components/multi-select'
import { motion } from 'framer-motion'
import { CASE_URL } from '@/lib/constants'

export function App() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='container mx-auto flex min-h-full flex-col items-center justify-start gap-y-4 px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8 lg:pt-8'
        >
            <a
                href={CASE_URL}
                target='_blank'
                rel='noopener noreferrer'
                className='mb-4 text-center text-4xl font-bold lg:text-3xl'
            >
                Select Case
            </a>
            <div className='w-full max-w-2xl'>
                <h1 className='text-center text-3xl font-bold'>Multi Select</h1>
                <p className='text-center text-gray-600'>
                    Use <span className='font-bold'>Tab</span> to navigate between options,{' '}
                    <span className='font-bold'>Enter</span> to select, <span className='font-bold'>Esc</span> to close
                    the popup
                </p>
                <p className='text-center text-gray-600'>
                    <span className='font-bold'>Click</span> outside of the popup to close it
                </p>
            </div>

            <MultiSelect />

            <footer className='text-center text-lg text-gray-600'>
                <p>
                    Made with ❤️ by{' '}
                    <a
                        href='https://mehmetyigityalim.com'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='inline-block bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 bg-clip-text text-transparent'
                    >
                        Mehmet Yiğit Yalım
                    </a>
                </p>
                <a
                    href='https://www.linkedin.com/in/mehmetyigityalim'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='via-[#0966C2]-500 inline-block bg-gradient-to-r from-blue-600 to-indigo-900 bg-clip-text text-transparent'
                >
                    LinkedIn
                </a>
            </footer>
        </motion.div>
    )
}
