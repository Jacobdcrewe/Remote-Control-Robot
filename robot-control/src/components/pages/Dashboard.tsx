import React, { useContext } from "react";
import { UserContext } from "../ContentRouter.tsx";
import img from "../../assets/images/sample.png";
import { LoginPageButton } from "../login/LoginPageButton.tsx";

export function Dashboard() {
  const { login, setLogin } = useContext(UserContext);

  return (
    <div className="w-full h-full min-w-[330px] overscroll-x-contain overscroll-y-none">
      <div className="w-full h-full flex flex-wrap gap-4 justify-center">
        <img
          src={img}
          className="rounded-xl overflow-hidden [4/3] shadow-outline object-cover"
        />

        <div className="flex-grow p-4 min-w-32 min-h-16">
          <div className="w-full h-full relative">
            <div className="absolute flex bottom-0 mt-auto w-full items-center justify-center">
              <LoginPageButton
                prompt="Logout"
                bgColor="bg-neutral-300"
                textColor="text-black"
                onClick={() => {
                  setLogin("");
                  localStorage.removeItem("userLogin");
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
