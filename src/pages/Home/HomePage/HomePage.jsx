import React from 'react';
import Banner from '../Banner/Banner ';
import LatestTickets from '../LatestTickets/LatestTickets';
import AdvertiseTicketsCard from '../AdvertiseTicketsCard/AdvertiseTicketsCard';
import PopularRoutes from '../PopularRoutes/PopularRoutes.jsx';
import WhyChooseUs from '../WhyChooseUs/WhyChooseUs';

const HomePage = () => {
    return (
        <div>
            <Banner></Banner>
            <AdvertiseTicketsCard></AdvertiseTicketsCard>
            <LatestTickets></LatestTickets>
            <PopularRoutes></PopularRoutes>
            <WhyChooseUs></WhyChooseUs>
        </div>
    );
};

export default HomePage;