import React from 'react';
// import useAuth from '../hooks/useAuth';
import useRole from '../../hooks/useRole';
import useAuth from '../../hooks/useAuth';
// import Loading from '../../pages/Loading/Loading';
import Forbidden from '../../components/Forbidden/Forbidden';
import Loading from '../../pages/Loading/Loading';


const VendorRoute = ({ children }) => {
    const { loading } = useAuth();
    const { role, roleLoading } = useRole()

    if (loading || roleLoading) {
        return <Loading></Loading>
    }

    if (role !== 'vendor') {
        return <Forbidden></Forbidden>
    }

    return children;
};

export default VendorRoute;