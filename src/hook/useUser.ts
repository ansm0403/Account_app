import { User } from "@/model/user";
import { useSession } from "next-auth/react";

function useUser(){
    const {data} = useSession();

    return data == null ? null : (data.user as User);
}

export default useUser;