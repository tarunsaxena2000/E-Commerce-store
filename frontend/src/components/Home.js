import React from 'react';
import { useNavigate } from 'react-router-dom';
import HomeN from './HomeN'

  
export const Home = () => {
const hist = useNavigate();

function redirect()
{
hist("login")
}     

  return (
    <>
   {
       sessionStorage.getItem("Stat")==="200" ?
       (<HomeN></HomeN>):<><div style={{color:"black"}}>{
        redirect()
       }</div>
   
 
</>
}
  
  </>
  );
};
