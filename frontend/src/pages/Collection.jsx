/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { assets } from "../assets/assets/assets";
import Title from "../components/Title";
import { useContext } from "react";
import { ShopContext } from "../components/context/ShopContext";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const [showFilter, setShowFilter] = useState(true);
  const [filterProducts, setFilterProducts] = useState([]);
  const { products, search, showSearch } = useContext(ShopContext);
  const [categorie, setCatgorie] = useState([]);
  const [subCategorie, setSubCategorie] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  const toggleCategorie = (e) => {
    if (categorie.includes(e.target.value)) {
      setCatgorie((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCatgorie((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategorie = (e) => {
    if (subCategorie.includes(e.target.value)) {
      setSubCategorie((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategorie((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productCopy = products.slice();

    if (search && showSearch) {
      productCopy = productCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (categorie.length > 0) {
      productCopy = productCopy.filter((item) =>
        categorie.includes(item.category)
      );
    }
    if (subCategorie.length > 0) {
      productCopy = productCopy.filter((item) =>
        subCategorie.includes(item.subCategory)
      );
    }
    setFilterProducts(productCopy);
  };

  const sortProducts = () => {
    let fpCopy = filterProducts.slice();
    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [categorie, subCategorie, search, showSearch, products]);

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t border-gray-500">
      {/* Filter Options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS{" "}
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt="dropdown_icon"
          />
        </p>
        {/* Catagory Filter */}
        <div
          className={`border border-gray-400 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block `}
        >
          <p className="text-sm font-medium mb-3">CATEGORIE</p>
          <div className="flex flex-col gap-2 text-sm font-light">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Men"}
                onChange={toggleCategorie}
              />
              Men
            </p>

            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Women"}
                onChange={toggleCategorie}
              />
              Women
            </p>

            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Kids"}
                onChange={toggleCategorie}
              />
              Kids
            </p>
          </div>
        </div>
        {/* SubCategorie Filter */}

        <div
          className={`border border-gray-400 pl-5 py-3  my-5 ${
            showFilter ? "" : "hidden"
          } sm:block `}
        >
          <p className="text-sm font-medium mb-3">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Topwear"}
                onChange={toggleSubCategorie}
              />
              Topwear
            </p>

            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Bottomwear"}
                onChange={toggleSubCategorie}
              />
              Bottomwear
            </p>

            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Winterwear"}
                onChange={toggleSubCategorie}
              />
              Winterwear
            </p>
          </div>
        </div>
      </div>
      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          {/* Product Sort */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border cursor-pointer outline-none border-gray-300 px-2 text-sm"
          >
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              image={item.image}
              price={item.price}
              name={item.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
