import notfound from "../images/notfound.png";

const NotFound = () => {
  return (
    <div
      className={` flex flex-col gap-7 justify-center items-center w-full h-screen`}
    >
      <img
        src={notfound}
        alt="illustration not found"
        className="w-1/2  object-contain"
      />
      <h2 className="text-lg text-green-700 font-bold tracking-wider">
        Halaman tidak ditemukan.
      </h2>
    </div>
  );
};

export default NotFound;
