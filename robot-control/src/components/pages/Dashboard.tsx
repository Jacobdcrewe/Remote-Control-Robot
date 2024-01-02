import React, { useContext } from "react";
import { UserContext } from "../ContentRouter.tsx";
import img from "../../assets/images/sample.png";

export function Dashboard() {
  const { login } = useContext(UserContext);

  return (
    <div className="w-full h-full min-w-[330px] overscroll-x-contain">
      <div className="w-full h-full flex flex-row gap-4">
        <div className="rounded-xl overflow-hidden aspect-[4/3] bg-white h-full">
          <img src={img} className="w-full h-full" />
        </div>
        <div className="rounded-xl p-4 bg-white overflow-hidden shadow-outline md:col-span-2">
          FILLER
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
