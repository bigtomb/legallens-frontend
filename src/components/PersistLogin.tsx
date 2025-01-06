import {Outlet} from "react-router-dom";
import {useEffect, useState} from "react";
import useRefreshToken from "@/hooks/useRefreshToken.ts";
import useAuth from "@/hooks/useAuth.ts";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    // @ts-ignore
    const {auth, persist} = useAuth();

    // @ts-ignore
    useEffect(() => {
        let isMounted = true;
        const verifyRefreshToken = async () => {
            try {
                await refresh();

            }
            catch (err: any){
            }
            finally{
                isMounted && setIsLoading(false);
            }
        }

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

        return () => isMounted = false
    },[])


    return (
        <>
            {!persist
                ? <Outlet/>
                : isLoading
                    ? <p>Loading...</p>
                    : <Outlet/>}

        </>
    )
}

export default PersistLogin;