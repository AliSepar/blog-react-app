import React from "react";

function LoadingUi() {
  return (
    <div class="flex h-screen items-center justify-center">
      <div class="relative h-1 w-32 rounded-full bg-black/20">
        <div class="absolute top-0 left-0 h-full w-0 animate-[loader_1s_ease-in-out_infinite] rounded-full bg-blue-600"></div>
      </div>
    </div>

    // <div
    //   className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
    //   role="status"
    // >
    //   <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
    //     Loading...
    //   </span>
    // </div>
  );
}

export default LoadingUi;
