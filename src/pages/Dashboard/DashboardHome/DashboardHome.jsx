import React from 'react';
import useRole from '../../../hooks/useRole';
import Loading from '../../Loading/Loading';

import PaymentHistory from '../PaymentHistory/PaymentHistory';
import RevenueOverview from './RevenueOverview';

import MyBookedTickets from '../MyBookedTickets/MyBookedTickets';
import AdminDashboardHome from './AdminDashboardHome';

const DashboardHome = () => {
 const { role, roleLoading } = useRole();

 if (roleLoading) return <Loading />;

 if (role === 'admin') return <AdminDashboardHome />;
 if (role === 'vendor') return <RevenueOverview/>;

 return <MyBookedTickets></MyBookedTickets>;
};

export default DashboardHome;