import axios from "axios";
import React from 'react';
const axiosInstance = axios.create({
    baseURL: 'https://online-ticket-booking-platform-serv.vercel.app'
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;
