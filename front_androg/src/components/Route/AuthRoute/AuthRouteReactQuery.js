import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { refreshState } from '../../../atoms/Auth/AuthAtoms';
import { useQueries, useQuery } from 'react-query';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const AuthRouteReactQuery = ({path, element}) => {
    const [refresh , setRefresh] = useRecoilState(refreshState);

    const { data, isLoading } = useQuery(["authenticated"], async () => {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get("http://localhost:8080/auth/authenticated", {params: {accessToken}});
      return response;
  }, {
    onSuccess: () =>{
      setRefresh(false);
    },
      enabled: refresh
  });

  const principal = useQuery(["principal"], async () => {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.get("http://localhost:8080/auth/principal", {params: {accessToken}})
      return response;
  },{
      enabled: !!localStorage.getItem("accessToken")
  });
    

    useEffect(() => {
        if (!refresh) {
          setRefresh(true);
        }
      }, []);

      if (isLoading) {
        return <div>로딩중....</div>;
      }

      if(principal.data !== undefined) {
        const roles = principal.data.data.authorities.split(",");

        if(path.startsWith("/admin") && !roles.includes("ROLE_ADMIN")) {
          return <Navigate to='/' />;
        }
      }
    
      if (!isLoading) {
        if(!data.data) {
         return <Navigate to="/login" />
        } 
        return element;
        
      }    
};

export default AuthRouteReactQuery;