import { cn } from '@/lib/utils.ts'

export function NoData() {
    return <div style={{ height: 400 }} className='bg-gray-100 absolute z-10 mt-2 flex overflow-y-auto flex-col w-full h-full cursor-pointer items-center justify-start gap-4 p-2 hover:bg-gray-100'>
        {Array.from({ length: 7 }).map((_, i) => (
            <div
                key={i}
                className='option flex cursor-pointer items-center gap-4 border-b border-gray-200 p-2 bg-gray-100 focus:bg-gray-100 w-full'
            >
                <div className='w-14 block h-12 rounded-full bg-gray-400' />
                <div
                    className='flex w-full flex-col items-start justify-center gap-1 overflow-hidden text-ellipsis whitespace-nowrap'>
                    <div className='flex w-full flex-row items-center justify-start gap-x-2'>
                        <p className='truncate text-lg w-48 h-6 animate-pulse rounded bg-gray-200' />
                        <div className='ml-auto flex items-center justify-center gap-x-2'>
                            <span
                                className={cn('w-12 block h-4 px-1.5 py-0.5 rounded-md text-xs bg-gray-200 animate-pulse')}

                            />
                            <span className="w-12 block h-4 rounded-md bg-gray-200 px-1.5 py-0.5 text-sm text-gray-500 animate-pulse" />
                            <span
                                className={cn('w-12 block h-4 rounded-md bg-gray-200  px-1.5 py-0.5 text-sm text-gray-500 animate-pulse')}
                            />
                        </div>
                    </div>
                    <span className='w-24 h-6 rounded bg-gray-200 animate-pulse' />
                </div>
            </div>
        ))}
        <div className='flex w-full items-center justify-between gap-4'>
            <button
                className='w-1/2 block h-8 rounded-md bg-gray-200 animate-pulse'
            >
                Previous
            </button>
            <button
                className='w-1/2 block h-8 rounded-md bg-gray-200 animate-pulse'
            >
                Next
            </button>
        </div>
    </div>
}
