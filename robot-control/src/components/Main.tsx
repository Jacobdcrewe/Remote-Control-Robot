import React from "react";
import ContentRouter from "./ContentRouter.tsx";

export function Main() {
  return (
    <div className="w-screen h-screen bg-black overflow-hidden flex text-neutral-950 ">
      <div className="flex flex-grow items-center justify-center bg-gradient-to-t from-black to-indigo-950  overflow-x-hidden overflow-y-auto p-4">
        <ContentRouter />
      </div>
    </div>
  );
}

export default Main;
