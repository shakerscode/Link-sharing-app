import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="h-[100vh] w-full flex justify-center items-center">
      <div className=" w-full flex flex-col gap-3 justify-center items-center ">
        <img
          src="https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg"
          alt="not found"
        />
        <p className="text-sm text-grayBorderBg">No page exists at this URL</p>
        <Link to={"/"}>
          <button className="px-8 py-2 shadow-md rounded-lg text-sm hover:bg-primary border-[1px] border-solid border-grayBorder200">
            Go back
          </button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
