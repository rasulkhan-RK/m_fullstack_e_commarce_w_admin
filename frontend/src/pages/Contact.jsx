import { assets } from "../assets/assets/assets";
import NewsLaterBox from "../components/NewsLaterBox";
import Title from "../components/Title";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t border-gray-500 ">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      <div className=" my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          src={assets.contact_img}
          alt="contact_image"
          className="w-full md:max-w-[480px]"
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl">Our Store</p>
          <p className="text-gray-500">
            Willsome street <br />
            Banglore, India
          </p>
          <p className="text-gray-500">
            Tel: +91 836 525 525 <br />
            Email: contactwaves@gmail.com
          </p>
          <p className="font-semibold text-xl text-gray-600">
            Careers at Forever
          </p>
          <p className="text-gray-500">
            Learn more about teams and job openings.
          </p>
          <button className="border border-gray-500 hover:bg-white hover:text-black rounded-md px-8 py-4 text-sm transition-all duration-500 active:bg-gray-500">
            Explore Jobs
          </button>
        </div>
      </div>

      <NewsLaterBox />
    </div>
  );
};

export default Contact;
