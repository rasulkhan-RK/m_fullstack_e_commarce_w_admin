import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../components/context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, cartItem, currency, updateQunatity, navigate } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItem[items][item],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItem, products]);

  return (
    <div className="border-t border-gray-500 pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      <div>
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          );

          return (
            <div
              key={index}
              className=" py-4 border-t border-gray-500 border-b grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img
                  className="w-16 sm:w-20"
                  src={productData.image[0]}
                  alt="product_image"
                />
                <div>
                  <p className="text-xs lg:text-lg font-medium">
                    {productData.name}
                  </p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>
                      {currency}
                      {productData.price}
                    </p>
                    <p className="px-2 sm:px-3 sm:py-1 border border-gray-400 rounded-md ">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>
              <input
                className="border border-gray-500 max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 bg-transparent rounded-md "
                type="number"
                min={1}
                defaultValue={item.quantity}
                onChange={(e) =>
                  e.target.value === "" || e.target.value === "0"
                    ? null
                    : updateQunatity(
                        item._id,
                        item.size,
                        Number(e.target.value)
                      )
                }
              />
              <img
                className="w-4 mr-4 sm:w-5 cursor-pointer hover:border-b border-red-500"
                src={assets.bin_icon}
                onClick={() => updateQunatity(item._id, item.size, 0)}
                alt="bin_icon"
              />
            </div>
          );
        })}
      </div>

      <div className="flex justify-end my-20 ">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate("/place-order")}
              className=" border border-gray-500 bg-gray-800 hover:bg-white hover:text-black transition-all duration-500 text-white text-sm my-8 px-8 py-3 active:bg-gray-500 rounded-md"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
