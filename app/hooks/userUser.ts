

import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useUser =  (id:string) =>
  useQuery({
    queryKey: ["user"],
    queryFn: () =>  axios.get<User>(`/api/users?id${id}`).then((res) => res.data),
    staleTime: 60 * 1000, // 1 min,
    retry : 3
  });

  export default useUser;