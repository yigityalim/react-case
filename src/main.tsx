import ReactDOM from 'react-dom/client'
import './index.css'
import { App } from '@/App'
import { SWRConfig } from 'swr'

const root = document.getElementById('app')!

ReactDOM.createRoot(root).render(<App />)
