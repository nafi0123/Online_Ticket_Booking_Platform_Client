import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "../../../hooks/useAxiosSecure";


const AdvertiseTickets = () => {
  const axiosSecure = useAxiosSecure();
  const { data: advertiseTickets = [], isLoading } = useQuery({
    queryKey: ["advertise-tickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-tickets/advertise-tickets");
      return res.data;
    },
  });
// {advertiseTickets.length}
  return <div>{advertiseTickets.length}</div>;
};

export default AdvertiseTickets;
