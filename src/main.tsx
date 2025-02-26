import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// @ts-ignore
import {AuthProvider} from "./context/AuthProvider"
import {BrowserRouter, Route, Routes} from "react-router";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/*" element={<App/>}/>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    </StrictMode>
,
)
