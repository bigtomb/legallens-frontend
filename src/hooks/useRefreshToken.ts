// @ts-ignore
import axios from "../api/axios"
import useAuth from "./useAuth"
import {jwtDecode} from "jwt-decode";

interface DecodedAccessToken {
    first_name: string;
    last_name: string;
    role: string;
    company: string;
    title: string;
    email: string;
}


const useRefreshToken = () => {

    // @ts-ignore
    const {setAuth} = useAuth();

    const refresh = async () => {
        const response = await axios.get("auth/refresh/", {
            withCredentials: true
        });
        const decodedAccessToken = jwtDecode<DecodedAccessToken>(response?.data?.access);
        const first_name = decodedAccessToken.first_name;
        const last_name = decodedAccessToken.last_name;
        const role = decodedAccessToken.role;
        const company = decodedAccessToken.company;
        const title = decodedAccessToken.title;
        const email = decodedAccessToken.email;
        setAuth((prev: any) => {
            return {...prev, accessToken: response.data.access, email,first_name,last_name, role, company, title,};
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;