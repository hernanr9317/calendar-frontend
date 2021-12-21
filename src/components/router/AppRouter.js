import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LoginScreen } from './../auth/LoginScreen';
import { CalendarScreen } from './../calendar/CalendarScreen';
import { startChecking } from './../../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {

    const dispatch = useDispatch();
    const { checking, uid } = useSelector( state => state.auth );

    useEffect(() => {
        
        dispatch( startChecking() );

    }, [dispatch])

    if ( checking ) {
        return (<h5>Espere...</h5>)
    }

    return (

        <BrowserRouter>
            <Routes>

                <Route
                    exact 
                    path="/login/*" 
                    element={ <PublicRoute isAuthenticated={!!uid} Component={LoginScreen}/> }
                />

                <Route
                    exact 
                    path="/*" 
                    element={ <PrivateRoute isAuthenticated={!!uid} Component={ CalendarScreen }/> }
                />


                <Route path="*" element={<Navigate replace to="/"/>} />


            </Routes>
      </BrowserRouter>
      
    )
}
