// @ts-ignore
import {axiosPrivate} from "../api/axios"
import {useEffect} from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    // @ts-ignore
    const {auth} = useAuth();

    useEffect(() => {

        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config: { headers: { [x: string]: string; }; }) => {
                if (!config.headers["Authorization"]) {
                    config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            }, (error: any) => {Promise.reject(error)}
        );


        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response: any) => response,
            async (error: any) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                    return axiosPrivate[prevRequest]
                }
                return Promise.reject(error);
            }

        )
        return () => {
            axiosPrivate.interceptors.response.eject(responseIntercept);
            axiosPrivate.interceptors.response.eject(requestIntercept);
        }
    },[auth, refresh]);

    return axiosPrivate;
}

export default useAxiosPrivate;
