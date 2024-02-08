import { useRouter } from 'next/router';
import { useSelector } from "react-redux";

const isAuth = ({children}) => {
    const router = useRouter()
    const user = useSelector(state => state.auth.user)
    if(!user){
        return router.push('/signin')
    }else{
        return children
    }
};

export default isAuth;