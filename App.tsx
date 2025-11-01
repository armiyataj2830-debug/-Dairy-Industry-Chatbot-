
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import OverviewScreen from './components/OverviewScreen';
import ChatScreen from './components/ChatScreen';

const App: React.FC = () => {
    return (
        <div className="min-h-screen font-sans text-gray-800">
            <Routes>
                <Route path="/" element={<OverviewScreen />} />
                <Route path="/chat" element={<ChatScreen />} />
            </Routes>
        </div>
    );
};

export default App;
