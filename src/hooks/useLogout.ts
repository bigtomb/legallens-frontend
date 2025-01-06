// @ts-ignore
import axios from "../api/axios";
import useAuth from "./useAuth.ts";

const useLogout = () => {
    // @ts-ignore
    const {setAuth} = useAuth();

    return async () => {
        setAuth({});
        try {
            await axios("/auth/logout", {
                withCredentials: true,
            });
        } catch (err) {
            console.log(err);
        }
    };
}
export default useLogout;