import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { refreshState } from '../../../atoms/Auth/AuthAtoms';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const AuthRouteReactQuery = ({path, element}) => {
    const [refresh , setRefresh] = useRecoilState(refreshState);

    const {data, isLoading} = useQuery(
        ["authenticated"],
        async () => {
            const accessToken = localStorage.getItem("accessToken");
            const response = await axios.get("http://localhost:8080/auth/authenticated", { params: { accessToken} });
            return response;                    
        },
        {
            enabled: refresh
        }
    );

    useEffect(() => {
        if (!refresh) {
          setRefresh(true);
        }
      }, [refresh]);

      if (isLoading) {
        return <div>로딩중....</div>;
      }
    
      if (!isLoading) {
        if (data.data) {
            return element;
        }
        return <Navigate to="/login" />
      }    
};

export default AuthRouteReactQuery;