/* eslint-disable react/prop-types */

import { useState } from "react";
import { assets } from "../assets/assets/assets.js";
import axios from "axios";
import { backendUrl } from "../App.jsx";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestSeller, setBestSeller] = useState(false);
  const [sizes, setSize] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("bestseller", bestSeller);
      if (name) formData.append("name", name);
      if (description) formData.append("description", description);
      if (price) formData.append("price", price);
      if (category) formData.append("category", category);
      if (subCategory) formData.append("subCategory", subCategory);

      if (sizes !== undefined || sizes !== null) {
        formData.append("sizes", JSON.stringify(sizes));
      } else {
        console.log("sizes is undefined or null");
      }

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      className="flex flex-col w-full items-start gap-3"
      onSubmit={onSubmitHandler}
    >
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20 h-20  border border-gray-300 "
              src={!image1 ? assets.upload : URL.createObjectURL(image1)}
              alt="upload_img"
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>

          <label htmlFor="image2">
            <img
              className="w-20 h-20  border border-gray-300 "
              src={!image2 ? assets.upload : URL.createObjectURL(image2)}
              alt="upload_img"
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>

          <label htmlFor="image3">
            <img
              className="w-20 h-20  border border-gray-300 "
              src={!image3 ? assets.upload : URL.createObjectURL(image3)}
              alt="upload_img"
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>

          <label htmlFor="image4">
            <img
              className="w-20 h-20  border border-gray-300 "
              src={!image4 ? assets.upload : URL.createObjectURL(image4)}
              alt="upload_img"
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product name</p>
        <input
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product description</p>
        <textarea
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Write content here"
          required
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product category</p>
          <select
            className="w-full px-3 py-2"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Subcategory</p>
          <select
            className="w-full px-3 py-2"
            onChange={(e) => setSubCategory(e.target.value)}
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Product Price</p>
          <input
            type="Number"
            placeholder="99"
            required
            className="w-full px-3 py-2 sm:w-[120px]"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </div>
      </div>

      <div>
        <p className="mb-2">Product sizess</p>
        <div className="flex gap-3">
          <div
            onClick={() =>
              setSize((prev) =>
                prev.includes("S")
                  ? prev.filter((i) => i !== "S")
                  : [...prev, "S"]
              )
            }
          >
            <p
              className={` ${
                sizes.includes("S") ? "bg-green-300" : "bg-slate-200"
              }  px-3 py-1 cursor-pointer`}
            >
              S
            </p>
          </div>

          <div
            onClick={() =>
              setSize((prev) =>
                prev.includes("M")
                  ? prev.filter((i) => i !== "M")
                  : [...prev, "M"]
              )
            }
          >
            <p
              className={` ${
                sizes.includes("M") ? "bg-green-300" : "bg-slate-200"
              }  px-3 py-1 cursor-pointer`}
            >
              M
            </p>
          </div>

          <div
            onClick={() =>
              setSize((prev) =>
                prev.includes("L")
                  ? prev.filter((i) => i !== "L")
                  : [...prev, "L"]
              )
            }
          >
            <p
              className={` ${
                sizes.includes("L") ? "bg-green-300" : "bg-slate-200"
              }  px-3 py-1 cursor-pointer`}
            >
              L
            </p>
          </div>

          <div
            onClick={() =>
              setSize((prev) =>
                prev.includes("XL")
                  ? prev.filter((i) => i !== "XL")
                  : [...prev, "XL"]
              )
            }
          >
            <p
              className={` ${
                sizes.includes("XL") ? "bg-green-300" : "bg-slate-200"
              }  px-3 py-1 cursor-pointer`}
            >
              XL
            </p>
          </div>

          <div
            onClick={() =>
              setSize((prev) =>
                prev.includes("2XL")
                  ? prev.filter((i) => i !== "2XL")
                  : [...prev, "2XL"]
              )
            }
          >
            <p
              className={` ${
                sizes.includes("2XL") ? "bg-green-300" : "bg-slate-200"
              }  px-3 py-1 cursor-pointer`}
            >
              2XL
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input
          type="checkbox"
          id="bestseller"
          onChange={() => setBestSeller((prev) => !prev)}
          checked={bestSeller}
        />
        <label htmlFor="bestseller" className="cursor-pointer">
          Add to bestseller
        </label>
      </div>

      <button
        type="submit"
        className="w-28 py-3 mt-4 bg-black text-white cursor-pointer rounded-md hover:bg-transparent duration-300 hover:text-black border hover: border-gray-400"
      >
        ADD
      </button>
    </form>
  );
};

export default Add;
