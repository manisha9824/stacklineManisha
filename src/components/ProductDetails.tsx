import React from "react";
import { Product } from "../types";

interface Props {
    product: Product;
}

const ProductDetails: React.FC<Props> = ({ product }) => {
    return (
        <div className="product-details-container">
            <img src={product.image} alt={product.title} />
            <h2>{product.title}</h2>
            <p>{product.subtitle}</p>
            <div className="tags-container">
                {product.tags.map((tag, index) => (
                    <div key={index} className="tag-box">
                        {tag}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductDetails;
