import React, { useContext, useState } from "react";
import { UserContext } from "../ContentRouter.tsx";
import { LoginPageButton } from "../login/LoginPageButton.tsx";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { POST } from "../../composables/api.ts";
import urls from "../../composables/urls.json";

export function Dashboard() {
  const { login, setLogin } = useContext(UserContext);
  const [pictureLeft, setPictureLeft] = useState(true);
  console.log(pictureLeft);

  const handleLeft = async () => {
    console.log("left");
    console.log(
      await POST(urls.local + "/api/robot/action", { action: "LEFT" })
    );
  };

  const handleRight = async () => {
    console.log("right");
    console.log(
      await POST(urls.local + "/api/robot/action", { action: "RIGHT" })
    );
  };

  const handleForward = async () => {
    console.log("forward");
    console.log(
      await POST(urls.local + "/api/robot/action", { action: "FORWARD" })
    );
  };

  const handleBackward = async () => {
    console.log("backward");
    console.log(
      await POST(urls.local + "/api/robot/action", { action: "BACKWARD" })
    );
  };

  const handleStop = async () => {
    console.log("stop");
    console.log(
      await POST(urls.local + ":8000/api/robot/action", { action: "STOP" })
    );
  };

  return (
    <div className="w-full h-full min-w-[700px] overscroll-x-contain">
      <div className="w-full h-full flex flex-wrap gap-4 justify-center">
        <embed
          src={urls.local +":9000"}
          className={`${
            pictureLeft ? "order-1" : "order-2"
          } rounded-xl overflow-hidden shadow-outline object-cover w-full lg:w-3/5 aspect-[16/9]`}
        /> 

        <div
          className={`${
            pictureLeft ? "order-2" : "order-1"
          } flex-grow p-4 min-w-32 min-h-16 `}
        >
          <div className="w-full h-full relative flex flex-row xl:flex-col ">
            <div className="flex aspect-square mx-auto xl:w-4/5 2xl:w-3/5 grid grid-cols-3 gap-4 grid-rows-3">
              <button
                onMouseDown={handleForward}
                onMouseUp={handleStop}
                className="flex items-center justify-center col-start-2 bg-neutral-400 rounded-xl shadow-outline opacity-50 m-px hover:m-0 hover:cursor-pointer hover:opacity-85 transition-all ease-in-out duration-150"
              >
                <ArrowUpIcon className="w-1/2 h-1/2 m-auto text-neutral-100" />
              </button>
              <button
                onMouseDown={handleLeft}
                onMouseUp={handleStop}
                className="flex items-center justify-center row-start-2 col-start-1  bg-neutral-400 rounded-xl shadow-outline opacity-50 m-px hover:m-0 hover:cursor-pointer hover:opacity-85 transition-all ease-in-out duration-150"
              >
                <ArrowLeftIcon className="w-1/2 h-1/2 m-auto text-neutral-100" />
              </button>
              <button
                onMouseDown={handleRight}
                onMouseUp={handleStop}
                className="flex items-center justify-center row-start-2 col-start-3  bg-neutral-400 rounded-xl shadow-outline opacity-50 m-px hover:m-0 hover:cursor-pointer hover:opacity-85 transition-all ease-in-out duration-150"
              >
                <ArrowRightIcon className="w-1/2 h-1/2 m-auto text-neutral-100" />
              </button>
              <button
                onMouseDown={handleBackward}
                onMouseUp={handleStop}
                className="flex items-center justify-center row-start-3 col-start-2  bg-neutral-400 rounded-xl shadow-outline opacity-50 m-px hover:m-0 hover:cursor-pointer hover:opacity-85 transition-all ease-in-out duration-150"
              >
                <ArrowDownIcon className="w-1/2 h-1/2 m-auto text-neutral-100" />
              </button>
            </div>
            <div className="m-auto xl:mt-auto xl:mb-0 w-full">
              <div className="inline-flex gap-4 text-neutral-100 w-full justify-center p-4 text-nowrap">
                Right Handed
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    onClick={() => setPictureLeft(!pictureLeft)}
                  />
                  <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
                Left Handed
              </div>
              <div className="flex w-full items-center justify-center">
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
    </div>
  );
}

export default Dashboard;
