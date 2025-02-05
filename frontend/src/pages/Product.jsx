/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../components/context/ShopContext";
import { assets } from "../assets/assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productsData, setProductsData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const fetchProductsData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductsData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductsData();
  }, [productId]);

  return productsData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in-out  duration-500 opacity-100">
      {/*------------- Product Data ------------- */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/*------------- Product image ------------- */}
        <div className="flex-1 flex-col-reverse flex gap-3 sm:flex-row ">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-normal w-full sm:w-[18.7%]">
            {productsData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                onMouseEnter={() => setImage(item)}
                src={item}
                key={index}
                alt="product_image"
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              />
            ))}
          </div>

          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="image" />
          </div>
        </div>
        {/*------------- Product Info ------------- */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productsData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="star_icon" className="w-3 5" />
            <img src={assets.star_icon} alt="star_icon" className="w-3 5" />
            <img src={assets.star_icon} alt="star_icon" className="w-3 5" />
            <img src={assets.star_icon} alt="star_icon" className="w-3 5" />
            <img
              src={assets.star_dull_icon}
              alt="star_dull_icon"
              className="w-3 5"
            />
            <p className="pl-2">(172)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency} {productsData.price}
          </p>
          <p className="mt-5 sm:w-4/5">{productsData.description}</p>
          <div className="flex-col flex gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productsData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={` rounded-md border py-2 px-4 bg-gray-100 text-black ${
                    item === size ? "border-orange-600" : ""
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            className="border border-gray-500 bg-gray-800 hover:bg-white hover:text-black transition-all duration-500 text-white px-8 py-3 text-sm active:bg-gray-500 rounded-md"
            onClick={() => addToCart(productsData._id, size)}
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5 border border-gray-500" />
          <div className="text-sm mt-5 flex flex-col gap-1">
            <p>100% Original product</p>
            <p>Cash on Delevery availble on this product</p>
            <p>Easy return & exchange policy within 7 days</p>
          </div>
        </div>
      </div>
      {/* ------- Description & Review section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border border-gray-500 px-5 py-3 text-sm">
            Description
          </b>
          <p className="border border-gray-500 px-5 py-3 text-sm">
            Reviews (172)
          </p>
        </div>
        <div className="flex flex-col gap-4 border border-gray-500 px-6 py-6 text-sm">
          <p>
            Discover the fan favorites that everyone is talking about. Our best
            sellers represent the perfect combination of quality, craftsmanship,
            and design, making them must-haves in any wardrobe,Unlock exclusive
            perks when you join our community! Subscribe today and receive 20%
            off your first order, plus early access to sales, new collections,
            and special offers,Immerse yourself in our newest collection, where
            every piece is designed to blend style, comfort, and timeless
            elegance. Crafted with attention to detail, these are essentials
            youll love to wear season after season.
          </p>
          <p>
            Your satisfaction is our priority. Whether you have questions about
            products, need styling advice, or assistance with an order, our
            customer service team is here to help—reach out anytime, At Waves,
            we believe in creating high-quality, timeless pieces that empower
            individuals to express their unique style. Our commitment to
            sustainability and craftsmanship ensures that every item is made to
            last
          </p>
        </div>
      </div>
      {/* Display related products */}
      <RelatedProducts
        category={productsData.category}
        subCategory={productsData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
