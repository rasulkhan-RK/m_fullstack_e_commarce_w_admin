import { assets } from "../assets/assets/assets";

const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-12 sm:gap-2 py-20 text-xs sm:text-sm md:text-base  justify-around text-center">
      <div>
        <img
          src={assets.exchange_icon}
          className="w-12 m-auto mb-5"
          alt="exchange_icon"
        />
        <p className="font-semibold">Easy Exchange Policy</p>
        <p className="text-gray-500">We offer hassle free exchange policy</p>
      </div>

      <div>
        <img
          src={assets.quality_icon}
          className="w-12 m-auto mb-5"
          alt="exchange_icon"
        />
        <p className="font-semibold">7 Day Return Policy</p>
        <p className="text-gray-500">We offer 7 Day free return policy</p>
      </div>

      <div>
        <img
          src={assets.support_img}
          className="w-12 m-auto mb-5"
          alt="exchange_icon"
        />
        <p className="font-semibold">Best Customer Support</p>
        <p className="text-gray-500">We provide 24/7 customer support</p>
      </div>
    </div>
  );
};

export default OurPolicy;
