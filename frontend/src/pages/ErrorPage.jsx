import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="text-center mt-52 mb-20">
      <h1 className="text-5xl ">404 PageNotFound</h1>
      <Link
        to="/"
        className=" absolute left-0 right-0 w-48 m-auto mt-10  border border-gray-500 bg-gray-800 hover:bg-white hover:text-black transition-all duration-500 text-white rounded-md font-light px-8 py-2 "
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
