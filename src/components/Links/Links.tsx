import React from "react";

function Links() {
  return (
    <div className="flex items-start gap-5 py-5">
      <div className="w-1/3 h-[550px] bg-white rounded-2xl p-6">
      </div>
      <div className="w-2/3 h-full bg-white rounded-2xl p-8">
        <div className="my-3">
          <h2 className="text-3xl font-bold text-zinc-900">
            Customize your links
          </h2>
          <p className="text-sm text-neutral-400 mt-2">
            Add/edit/remove links below and then share all your profiles with
            the world!
          </p>
        </div>
        <button
        className={
          "border border-violet-500 text-violet-500 w-full mt-8 px-5 hover:bg-violet-500 hover:text-white transition duration-300 py-2 rounded-lg font-semibold flex items-center justify-center gap-1.5 text-sm"
        }
      >
      +  Add new link
      </button>
      </div>
    </div>
  );
}

export default Links;
