import { Navigate } from 'react-router-dom';


export const PublicRoute = ({ isAuthenticated, Component }) => {

    
    return <>
                { (isAuthenticated)
                ?  <Navigate to="/" />
                :  <Component  /> }
            </>

}
