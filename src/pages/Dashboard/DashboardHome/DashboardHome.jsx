import React from 'react';
import useRole from '../../../hooks/useRole';
import Loading from '../../Loading/Loading';

import PaymentHistory from '../PaymentHistory/PaymentHistory';
import RevenueOverview from './RevenueOverview';
import MyProfile from '../MyProfile/MyProfile';
import MyBookedTickets from '../MyBookedTickets/MyBookedTickets';

const DashboardHome = () => {
 const { role, roleLoading } = useRole();

 if (roleLoading) return <Loading />;

// //  if (role === 'admin') return <AdminDashboardHome />;
 if (role === 'vendor') return <RevenueOverview/>;

 return <MyBookedTickets></MyBookedTickets>;
};

export default DashboardHome;