import { Navigate } from 'react-router-dom';


export const PrivateRoute = ({ isAuthenticated, Component }) => {

    
    return <>
                { (isAuthenticated)
                ? <Component /> 
                : <Navigate to="/login" /> }
            </>

}
