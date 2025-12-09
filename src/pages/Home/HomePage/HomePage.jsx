import React from 'react';
import Banner from '../Banner/Banner ';
import LatestTickets from '../LatestTickets/LatestTickets';
import AdvertiseTicketsCard from '../AdvertiseTicketsCard/AdvertiseTicketsCard';

const HomePage = () => {
    return (
        <div>
            <Banner></Banner>
            <AdvertiseTicketsCard></AdvertiseTicketsCard>
            <LatestTickets></LatestTickets>
            
        </div>
    );
};

export default HomePage;