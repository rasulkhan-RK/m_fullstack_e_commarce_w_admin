/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
import Title from "../components/Title.jsx";
import CartTotal from "../components/CartTotal.jsx";
import { assets } from "../assets/assets/assets.js";
import { useContext, useState } from "react";
import { ShopContext } from "../components/context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backendURL,
    token,
    cartItem,
    setCartItem,
    getCartAmount,
    delivery_fees,
    products,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Order Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            backendURL + "/api/order/verifyRazorpay",
            response,
            { headers: { token } }
          );
          if (data.success) {
            navigate("/orders");
            setCartItem({});
            toast.success(data.message);
          }
        } catch (error) {
          console.log(error);
          toast.error(error);
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const onSubmitHandle = async (e) => {
    e.preventDefault();

    try {
      let orderItems = [];

      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItem[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fees,
      };

      switch (method) {
        // Api calls for cash on delivery
        case "cod":
          const response = await axios.post(
            backendURL + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            setCartItem({});
            navigate("/orders");
            toast.success(response.data.message);
          } else {
            toast.error(response.data.message);
          }
          break;

        case "stripe":
          const responseStripe = await axios.post(
            backendURL + "/api/order/stripe",
            orderData,
            { headers: { token } }
          );
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }

          break;

        case "razorpay":
          const responseRazorpay = await axios.post(
            backendURL + "/api/order/razorpay",
            orderData,
            { headers: { token } }
          );
          if (responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order);
          }

          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandle}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vw] border-t border-gray-500"
    >
      {/* --------------- Left Side --------------- */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="First name"
            className="border bg-transparent border-gray-400 rounded-md py-1.5 px-3.5 w-full"
            onChange={onChangeHandler}
            value={formData.firstName}
            name="firstName"
            required
          />

          <input
            type="text"
            placeholder="Last name"
            className="border bg-transparent border-gray-400 rounded-md py-1.5 px-3.5 w-full"
            onChange={onChangeHandler}
            value={formData.lastName}
            name="lastName"
            required
          />
        </div>
        <input
          type="email"
          placeholder="Email address"
          className="border bg-transparent border-gray-400 rounded-md py-1.5 px-3.5 w-full"
          onChange={onChangeHandler}
          value={formData.email}
          name="email"
          required
        />
        <input
          type="text"
          placeholder="Street"
          className="border bg-transparent border-gray-400 rounded-md py-1.5 px-3.5 w-full"
          onChange={onChangeHandler}
          value={formData.street}
          name="street"
          required
        />

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="City"
            className="border bg-transparent border-gray-400 rounded-md py-1.5 px-3.5 w-full"
            onChange={onChangeHandler}
            value={formData.city}
            name="city"
            required
          />

          <input
            type="text"
            placeholder="State"
            className="border bg-transparent border-gray-400 rounded-md py-1.5 px-3.5 w-full"
            onChange={onChangeHandler}
            value={formData.state}
            name="state"
            required
          />
        </div>

        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Zipcode"
            className="border bg-transparent border-gray-400 rounded-md py-1.5 px-3.5 w-full"
            onChange={onChangeHandler}
            value={formData.zipCode}
            name="zipCode"
            required
          />

          <input
            type="text"
            placeholder="Country"
            className="border bg-transparent border-gray-400 rounded-md py-1.5 px-3.5 w-full"
            onChange={onChangeHandler}
            value={formData.country}
            name="country"
            required
          />
        </div>

        <input
          type="number"
          placeholder="Phone No."
          className="border bg-transparent border-gray-400 rounded-md py-1.5 px-3.5 w-full"
          onChange={onChangeHandler}
          value={formData.phone}
          name="phone"
          required
        />
      </div>

      {/* --------------- RIGHT-side --------------- */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>

        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          {/* --------------- Payment Method Selection --------------- */}
          <div className="flex gap-4 flex-col lg:flex-row ">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-500" : ""
                }`}
              ></p>
              <img
                className="h-5 mx-4"
                src={assets.stripe_logo}
                alt="stripe_logo"
              />
            </div>

            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" ? "bg-green-500" : ""
                }`}
              ></p>
              <img
                className="h-5 mx-4"
                src={assets.razorpay_logo}
                alt="stripe_logo"
              />
            </div>

            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-500" : ""
                }`}
              ></p>
              <p className="text-sm font-medium mx-4">Cash On Delivery</p>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="border border-gray-500 bg-gray-800 hover:bg-white hover:text-black transition-all duration-500 text-white px-16 py-3 text-sm active:bg-gray-500 rounded-md"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
