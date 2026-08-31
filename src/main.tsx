import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'

import './styles/theme.css'
import './styles/app.css'

const container = document.getElementById('root')
if (!container) throw new Error('Missing #root element in index.html')

createRoot(container).render(
  <StrictMode>
    {/*
      BrowserRouter gives clean URLs like /projects/ecommerce-platform.
      It deliberately does NOT use hash routing, because that would fight
      with the #anchor jump links in the top bar.

      One consequence: your host must send every path to index.html.
      See README.md — the config files for Netlify, Vercel and GitHub Pages
      are already in this project.
    */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
