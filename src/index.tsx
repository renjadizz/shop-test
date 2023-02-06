import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Base from './pages/Base';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {Home} from "./pages/Home";
import {store} from "./store/store";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route element={<Base/>}>
                    <Route path="/" element={<Home/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    </Provider>
)

reportWebVitals()
