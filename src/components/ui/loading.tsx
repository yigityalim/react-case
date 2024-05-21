export function Loading() {
    return (
        <div style={{ height: 400 }} className='option flex items-center gap-4 p-2'>
            <div className='h-8 w-8 animate-pulse rounded-full bg-gray-200' />
            <div className='flex flex-col gap-1'>
                <div className='h-4 w-24 animate-pulse rounded bg-gray-200' />
                <div className='h-4 w-16 animate-pulse rounded bg-gray-200' />
            </div>
        </div>
    )
}
