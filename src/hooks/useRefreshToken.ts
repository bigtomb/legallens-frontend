// @ts-ignore
import axios from "../api/axios"
import useAuth from "./useAuth"

const useRefreshToken = () => {
    // @ts-ignore
    const {setAuth} = useAuth();

    const refresh = async () => {
        const response = await axios.get("auth/refresh/", {
            withCredentials: true
        });
        setAuth((prev: any) => {
            console.log(prev);
            console.log(response.data);
            return {...prev, accessToken: response.data.access};
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;