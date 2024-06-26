import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export async function fetcher<T>(...args: Parameters<typeof fetch>) {
    const response = await fetch(...args)

    if (!response.ok) {
        return response.json().then((data) => Promise.reject(data))
    }
    return await response.json() as Promise<T>
}