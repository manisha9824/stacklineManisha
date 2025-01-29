import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { RootState } from "./redux/store";
import { setProductData } from "./redux/productSlice.ts";
import ProductDetails from "./components/ProductDetails.tsx";
import SalesChart from "./components/SalesChart.tsx";
import SalesTable from "./components/SalesTables.tsx";
import "./App.css";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const product = useSelector((state: RootState) => state.product.data);
  const loading = useSelector((state: RootState) => state.product.loading);

  useEffect(() => {
    axios.get(`${process.env.PUBLIC_URL}/data.json`)
      .then(response => {
        dispatch(setProductData(response.data[0]));
      })
      .catch(error => console.error("Error loading data:", error));
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="app-container">
      <header className="header">
        <img
          src={`${process.env.PUBLIC_URL}/stackline_logo.svg`}
          alt="Stackline Logo"
          className="logo"
        />
      </header>

      {product && (
        <div className="main-content">
          <div className="left-section">
            <ProductDetails product={product} />
          </div>
          <div className="right-section">
            <div className="sales-chart-container">
              <h3> Retail Sales </h3>
              <SalesChart sales={product.sales} />
            </div>
            <div className="sales-chart-container">
              <SalesTable sales={product.sales} />
            </div>
          </div>
        </div>

      )}
    </div>
  );
};

export default App;
