import axios from "axios";
import { useEffect } from "react";
import { useLocation,
     useNavigate 
    } from "react-router-dom";

const KakaoLogin =  () => {
    const location =useLocation();
    const navigate=useNavigate();
    
    const kakaoLoginAction= async()=> {
        const KAKAO_CODE = location.search.split('=')[1];
        console.log(KAKAO_CODE)
        //const URI = process.env.REACT_APP_BASE_URI;
        const res= await axios.get(`http://3.34.194.84:8080/login/oauth2/code/kakao?code=${KAKAO_CODE}`);
        console.log(res);       
        // localStorage.setItem("Authorizatison", res.headers.authorization);
        navigate("/");
    }


    useEffect(()=> {
        kakaoLoginAction();
           // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    }
    
export default KakaoLogin;