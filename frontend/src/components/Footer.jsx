import { assets } from "../assets/assets/assets";

const Footer = () => {
  return (
    <>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.wave} alt="logo" className="mb-5 w-44 " />
          <p className="w-full md:2/3 text-gray-500">
            Stay connected with us for the latest updates, exclusive offers, and
            new arrivals Join our community and never miss an update! Subscribe
            for exclusive offers, new arrivals, and more. Thank you for
            visiting! Stay in touch for the latest trends, promotions, and more
            straight to your inbox. Connect with us on social media and be the
            first to know about our newest collections, special deals, and more.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-500">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-500">
            <li>+91 856-325-325</li>
            <li>contact@weave@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr className="border border-gray-500" />
        <p className="py-5 text-sm text-center">
          Copyright 2025@ wave.com - All Right Reserved.
        </p>
      </div>
    </>
  );
};

export default Footer;
