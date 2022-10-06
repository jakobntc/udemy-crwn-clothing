import React from "react";
import { Outlet } from "react-router";

import Menu from "../../components/menu/menu.component";


const Home = () => {
  return (
    <div>
      <Outlet />
      <Menu />
    </div>
  );
};


export default Home