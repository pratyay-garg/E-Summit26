import React, { useEffect } from 'react'
import { useAuth } from '../../context/AuthUserContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const Page = () => {
  const {authUser ,loading , signInWithEmail ,signInwithGoogle ,signOutUser, SignUpWithEmail} = useAuth();
  const navigate =useNavigate();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(()=>{
    async function validate()
    {
      if(authUser){
        const token = await authUser.getIdToken(true);
        // console.log(token,"token");
        console.log("email",authUser?.email);
        try {
           const response = await axios.post(
            `${BACKEND_URL}/api/register`,
            {
              name: authUser?.displayName ?? "",
              email: authUser?.email ?? "",
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (response.data.success) {
            if (response.data.role == 'user')
              navigate("/store");
            if (response.data.role == 'admin')
              navigate("/admin");
          }
          return true;
        } catch (error) {
          console.error("Backend Register Error:", error);
          return false;
        }
      }
    }

    validate();
  },[authUser,navigate ,BACKEND_URL]);

  if (loading) return <>loading</>;


  return (
    <div>
      <h1>REGISTER</h1>
      <button onClick={()=>signInwithGoogle()}>Sign In with google</button>
    </div>
  )
}

export default Page
