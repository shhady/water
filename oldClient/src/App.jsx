import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TableConfiguration } from './components/TableConfiguration';
import { CreateRow, Statistics } from './pages';
import { MyProvider } from './services/MyProvider';
import SharedLayout from './components/layout/SharedLayout';
import Navbar from './components/navbar/Navbar';
import Hamburger from './components/hamburger/Hamburger';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <MyProvider>
      <BrowserRouter>
        <div className="App">
          <Navbar handleSidebarToggle={handleSidebarToggle} />
          <div className={`content ${isSidebarOpen ? 'open' : ''}`}>
            <Hamburger
              isSidebarOpen={isSidebarOpen}
              handleSidebarToggle={handleSidebarToggle}
            />
            <div className="sidebar">
              {/* Sidebar content */}
            </div>
            <div className="routes">
              <Routes>
                <Route path="/" element={<SharedLayout />}>
                  <Route path="/" element={<TableConfiguration />} />
                  <Route path="/statistics" element={<Statistics />} />
                </Route>
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </MyProvider>
  );
}

export default App;
