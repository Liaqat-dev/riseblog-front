import {createRoot} from 'react-dom/client'
import {BrowserRouter} from "react-router";
import './index.css'
import App from './App.tsx'
import Modal from 'react-modal';
import {UserProvider} from "../context/UserContext/UserContext.tsx";
import {ArticleProvider} from "@context/articlesContext/articleContext.tsx";

Modal.setAppElement('#root');
createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <ArticleProvider>
            <UserProvider>
                <App/>
            </UserProvider>
        </ArticleProvider>
    </BrowserRouter>
    ,
)
