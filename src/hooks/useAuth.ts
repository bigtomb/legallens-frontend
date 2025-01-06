import { useContext } from "react";
// @ts-ignore
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;