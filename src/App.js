/* eslint-disable */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { LanguageProvider } from './utils/LanguageContext';

import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();

import Header from 'components/Header';
import List from 'pages/list/List'
import Detail from "pages/detail/Detail";

function App() {
    return (
        <LanguageProvider>
            {/* <BrowserRouter> */}
            <BrowserRouter basename="oncomed">
                <QueryClientProvider client={queryClient}>
                    <div className="oncomedWrap">
                        <Header />
                        <Routes>
                            <Route path="/" element={<List />} />
                            <Route path="/movie/:movieId" element={<Detail />} />
                        </Routes>
                    </div>
                </QueryClientProvider>
            </BrowserRouter>
        </LanguageProvider>
    );
}

export default App;
