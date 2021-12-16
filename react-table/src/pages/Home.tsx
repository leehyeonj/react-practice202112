import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = function () {
  const navigate = useNavigate();
  return (
    <>
      <div> it is home</div>
      <div>
        <button
          onClick={() => {
            navigate('/login');
          }}
        >
          go to login
        </button>
      </div>
    </>

  );
};

export default Home;
