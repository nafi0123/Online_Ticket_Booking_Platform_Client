import React from 'react';
import useRole from '../../../hooks/useRole';
import Loading from '../../Loading/Loading';
// import AdminDashboardHome from './AdminDashboardHome';
// import RiderDashboardHome from './RiderDashboardHome';
import PaymentHistory from '../PaymentHistory/PaymentHistory';

const DashboardHome = () => {
 const { role, roleLoading } = useRole();

 if (roleLoading) return <Loading />;

//  if (role === 'admin') return <AdminDashboardHome />;
//  if (role === 'rider') return <RiderDashboardHome />;

 return <PaymentHistory />;
};

export default DashboardHome;