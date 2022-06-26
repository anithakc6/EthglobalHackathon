import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from '../components/Landing/Home';
import CreateProfile from '../components/Profile/CreateProfile';
import Forum from '../components/Forum/Forum';
import CreateDao from '../components/DAO/CreateDao';
import New from '../components/Profile/New';

function PrivateRoute({ children }) {
  return ( localStorage.getItem('access_token') !== null) ? children : <Navigate to="/" />;
}

export default (childProps) => {
  return (
    <Routes>
      
      <Route path="/" element={
        <Home {...childProps} />
      } />
      <Route path="/hire" element={
        <CreateProfile {...childProps} />
      } />
      <Route path="/forum" element={
        <Forum {...childProps} />
      } />
      <Route path="/create_dao" element={
        <Forum {...childProps} />
      } />
      <Route path="/create_profile" element={
        <New {...childProps} />
      } />
      {/* <Route path="/new_profile" element={
        <PrivateRoute>
          <New {...childProps} />
        </PrivateRoute>
      } />
      <Route path="/home" element={
        <PrivateRoute>
          <Home {...childProps} />
        </PrivateRoute>
      } />

      <Route path="/profile/:handle" element={
        <PrivateRoute>
          <ViewProfile {...childProps} />
        </PrivateRoute>
      } />

      <Route path="/me" element={
        <PrivateRoute>
          <MyProfile {...childProps} />
        </PrivateRoute>
      } />


      <Route path="/stream" element={
        <PrivateRoute>
          <Meet {...childProps} />
        </PrivateRoute>
      } /> */}
     
    </Routes>
  )
}