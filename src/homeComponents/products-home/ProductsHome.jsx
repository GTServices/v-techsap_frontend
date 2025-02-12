import React, { useEffect, useState } from "react";
import "./ProductsHome.css";
import { FaArrowUp } from "react-icons/fa";
import { MdOutlineFileDownloadDone } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";

function ProductsHome() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageClass, setImageClass] = useState("scale-in");

  useEffect(() => {
    fetch("../../../db.json")
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setProducts(data.products);
          setCategories([{ id: 0, name: "ALL" }, ...data.categories]);
        } else {
          console.log("Gələn məlumat formatı səhvdir");
        }
      })
      .catch((error) => console.error("Xəta baş verdi:", error));

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageClass("");
      setTimeout(() => {
        setImageClass("scale-in");
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 3);
      }, 50);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setIsOpen(false);
  };

  const filteredProducts = selectedCategory === "ALL"
    ? products
    : products.filter((product) => product.category === selectedCategory);

  const visibleProducts = isMobile ? filteredProducts.slice(0, 3) : filteredProducts;

  return (
    <section className="products-home container">
      <div className="products-title">
        <h3 className="gradient-heading">Məhsullar</h3>
      </div>

      <div className="products-home-top">
        <div className="category-select">
          <div className="select-box" onClick={() => setIsOpen(!isOpen)}>
            <span>{selectedCategory || "Kateqoriya seçin"}</span>
            <IoMdArrowDropdown />
          </div>

          {isOpen && (
            <div className="options">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className={`option ${selectedCategory === category.name ? "selected" : ""}`}
                  onClick={() => handleCategoryChange(category.name)}
                >
                  <span>{category.name}</span>
                  {selectedCategory === category.name && (
                    <MdOutlineFileDownloadDone className="check-icon" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="products-home-cards">
        <div className="total">
          {visibleProducts.length > 0 ? (
            visibleProducts.map((product) => (
              <div className="card" key={product.id}>
                <div className="card-content">
                  <div className="pro-home-card-img">
                    <img
                      src={product.imgSrc[currentImageIndex] || "../../../public/mikro.png"}
                      alt={product.title}
                      className={imageClass}
                    />
                  </div>
                  <div className="change-img">
                    <div
                      className={`${
                        currentImageIndex === 0 ? "change-long" : "change-half"
                      }`}
                    ></div>
                    <div
                      className={`${
                        currentImageIndex === 1 ? "change-long" : "change-half"
                      }`}
                    ></div>
                    <div
                      className={`${
                        currentImageIndex === 2 ? "change-long" : "change-half"
                      }`}
                    ></div>
                  </div>
                  <div className="hover-text">
                    <h3>Yaddaş</h3>
                    <p>{product.specs.yaddas}</p>
                    <h3>Anten</h3>
                    <p>{product.specs.anten}</p>
                    <h3>Ölçülər</h3>
                    <p>{product.specs.olculer}</p>
                    <h3>Prosessor</h3>
                    <p>{product.specs.prosessor}</p>
                  </div>
                </div>

                <div className="card-end">
                  <h4>{product.title}</h4>
                  <i>
                    <FaArrowUp />
                  </i>
                </div>
              </div>
            ))
          ) : (
            <p></p>
          )}
        </div>
        <div className="pro-button">
          <button className="orangeBtn">Daha çox</button>
        </div>
      </div>
    </section>
  );
}

export default ProductsHome;
