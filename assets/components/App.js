import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Layout from "./Layout";
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import NotFound404 from '../pages/NotFound404';

export default function App() {
  return (
      <div>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound404 />} />
          </Route>
        </Routes>
      </div>
  );
}
