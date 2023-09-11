const Header = () => {
  return (
    <div className="mt-10 mb-7 flex flex-col items-center space-y-5">
      <h1 className="relative w-fit text-center">
        <span className="relative text-teal-800 font-bold text-6xl lg:text-7xl text-center z-10">
          tes ngetik.
        </span>
        <span className="animate-text bg-gradient-to-r from-teal-300 to-blue-300 absolute bottom-0 left-0 w-full h-5 -skew-y-3"></span>
      </h1>

      <h3 className="text-xl text-center font-semibold text-gray-500">
        seberapa cepet kamu ngetik dalam satu menit?
      </h3>
    </div>
  );
};

export default Header;
