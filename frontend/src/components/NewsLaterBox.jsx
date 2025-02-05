const NewsLaterBox = () => {
  const onSubmitHandle = (e) => {
    e.preventDefault();
  };

  return (
    <div className="text-center">
      <p className="text-2xl font-medium ">Subscribe now & get 20% off</p>
      <p className="mt-3 text-gray-500">
        Subscribe now and enjoy 20% off your first purchase – don&apos;t miss
        out on exclusive savings!
      </p>
      <form
        onSubmit={onSubmitHandle}
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border border-gray-500 pl-3"
      >
        <input
          className="w-full bg-transparent sm:flex-1 outline-none"
          required
          type="email"
          placeholder="Enter your email"
        />
        <button
          type="submit"
          className="  bg-gray-700 hover:bg-white hover:text-black transition-all duration-500 active:bg-gra-500 text-white text-xs px-10 py-4"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsLaterBox;
