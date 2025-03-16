import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Home.css";

function Home() {
  const [totalClothes, setTotalClothes] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:3000/auth/clothes")
      .then(result => {
        if (result.data.Status) {
          setTotalClothes(result.data.Result.length);
        }
      })
      .catch(err => console.log(err));

    axios.get("http://localhost:3000/auth/category")
      .then(result => {
        if (result.data.Status) {
          setTotalCategories(result.data.Result.length);
        }
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="home-container d-flex flex-column align-items-center">
      <div className="d-flex justify-content-center w-75">
        {/* Clothes Card */}
        <div className="card custom-card mx-3 p-3">
          <h4 className="card-title">Clothes</h4>
          <hr className="card-divider" />
          <p className="card-label">Total:</p>
          <h2 className="card-value">{totalClothes}</h2>
        </div>

        {/* Category Card */}
        <div className="card custom-card mx-3 p-3">
          <h4 className="card-title">Categories</h4>
          <hr className="card-divider" />
          <p className="card-label">Total:</p>
          <h2 className="card-value">{totalCategories}</h2>
        </div>
      </div>
    </div>
  );
}

export default Home;
