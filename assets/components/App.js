import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Layout from "./Layout";
import Home from '../pages/Home';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import NotFound404 from '../pages/NotFound404';
import PrivateRoute from "../utils/PrivateRoute";

export default function App() {
  return (
      <div>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
            />
            <Route path="login" element={<Login />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound404 />} />
          </Route>
        </Routes>
      </div>
  );
}
