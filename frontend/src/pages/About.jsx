import { assets } from "../assets/assets/assets.js";
import Title from "../components/Title.jsx";
import NewsLaterBox from "../components/NewsLaterBox.jsx";
const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t border-gray-500">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img className="w-full max-w-[450px]" src={assets.about_img} alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 ">
          <p>
            Our collections are designed with versatility in mind, offering
            timeless pieces that easily transition from day to night, work to
            weekend. We focus on using sustainable materials and ethical
            production practices, so you can look good while making a positive
            impact on the world around you.
          </p>
          <p>
            From classic essentials to bold statement pieces, we offer clothing
            that celebrates individuality and suits every lifestyle. Whether
            youre dressing up for a special occasion or keeping it casual, [Your
            Brand Name] has something to help you feel your best.
          </p>
          <b className="text-gray-400">OUR MISSION</b>
          <p>
            Our mission at Weave is simple: to provide fashion that blends
            style, comfort, and sustainability. We create clothing that allows
            you to express your personality and live confidently in every
            moment. By prioritizing eco-friendly materials and ethical
            production methods, we strive to make a positive impact on both our
            customers and the planet. Our goal is to help you feel your best in
            every piece, with fashion that lasts.
          </p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border border-gray-500 rounded-md px-10 md:px-16 py-8 sm:py-20 flex-col flex gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-400">
            Quality is at the core of everything we do. From the first sketch to
            the final stitch, each item from weave.
          </p>
        </div>

        <div className="border border-gray-500 rounded-md px-10 md:px-16 py-8 sm:py-20 flex-col flex gap-5">
          <b>Convenience:</b>
          <p className="text-gray-400">
            Premium materials and partner with skilled artisans to produce
            clothing that offers both lasting beauty.
          </p>
        </div>

        <div className="border border-gray-500 rounded-md px-10 md:px-16 py-8 sm:py-20 flex-col flex gap-5">
          <b>Exceptional Custmore Service:</b>
          <p className="text-gray-400">
            Superior comfort. Our commitment to craftsmanship means that every
            piece is designed to stand the test of time—both in style and
            durability.
          </p>
        </div>
      </div>

      <NewsLaterBox />
    </div>
  );
};

export default About;
