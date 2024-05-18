import { ProductCard } from "../../components/productCard";
import { Footer } from "../../components/footer";
import { useEffect, useState } from "react";
import { DropDownMenu } from "../../components/dropDownMenu";
import { SEO } from "../../components/SEO";
export function ExplorePage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState({
    searchTxt: "",
    category: "",
    price: "",
  });
  let categoriesArr = [
    ...new Set(
      products.map((product) => {
        return product.category;
      }),
    ),
  ];
  useEffect(() => {
    let filteredArr = products.filter(() => {
      return true;
    });
    if (filter.searchTxt) {
      filteredArr = filteredArr.filter((product) => {
        return product.name
          .toLowerCase()
          .includes(filter.searchTxt.toLowerCase());
      });
    }
    if (filter.category) {
      filteredArr = filteredArr.filter((product) => {
        return product.category === filter.category;
      });
    }
    if (filter.price === "High to low") {
      filteredArr = filteredArr.sort((a, b) => {
        return b.price - a.price;
      });
    }
    if (filter.price === "Low to high") {
      filteredArr = filteredArr.sort((a, b) => {
        return a.price - b.price;
      });
    }
    setFilteredProducts(() => [...filteredArr]);
  }, [filter, products]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:8333/api/products/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const inputChange = (event) => {
    setFilter((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  let clearFilter = () => {
    setFilter({ searchTxt: "", category: "", price: "" });
    setFilteredProducts(products);
  };
  return (
    <>
      <SEO title="Eyena - Explore" description="Explore Eyena products" />
      <div className="p-5">
        <div className="search-filer-container w-full border-b-2 py-4 flex flex-col items-center gap-4  ">
          <div className="search container  lg:w-2/3">
            <input
              className="w-full border-2 p-2 text-lg rounded-lg shadow-lg outline-yellow-light"
              name="searchTxt"
              value={filter.searchTxt}
              onChange={inputChange}
              placeholder="Search"
            />
          </div>
          <div className="filter text-primary text-xl flex justify-center items-center w-full  ">
            <div className="flex justify-between items-center">
              <label className="w-1/3">Filter By:</label>
              <DropDownMenu
                value={filter.category}
                name={"category"}
                changeFun={inputChange}
                options={categoriesArr}
              />
              <DropDownMenu
                value={filter.price}
                name={"price"}
                changeFun={inputChange}
                options={["High to low", "Low to high"]}
              />
            </div>
            <div className="mx-3">
              <button
                className="px-2 py-1 rounded-xl text-base border-2 border-yellow-light text-yellow-light hover:text-white hover:bg-yellow-light transition-colors"
                onClick={clearFilter}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        <div className="products-show flex flex-row justify-center pt-5  ">
          <div className="flex flex-wrap justify-evenly w-10/12">
            {filteredProducts.map((product) => {
              return <ProductCard key={product.name} product={product} />;
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
