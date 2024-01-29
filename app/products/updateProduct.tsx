'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { Brand } from '@prisma/client';
type Product = {
  id: number;
  title: string;
  price: number;
  brandId: number;
};

const UpdateProduct = ({ brands, product }: { brands: Brand[]; product: Product }) => {
  const [modal, setModal] = useState(false);
  // const [productName, setProductName] = useState(product.p);
  // const [price, setPrice] = useState(product.price);
  const [formUpdateProduct, setFormUpdateProduct] = useState({
    title: product.title,
    price: product.price,
    brandId: product.brandId,
  });
  const [isMutating, setIsMutating] = useState(false);
  const router = useRouter();

  const handleOpenModal = () => {
    setModal(!modal);
  };

  const handleChange = ({ target: { name, value } }: { target: { name: string; value: string } }) => {
    setFormUpdateProduct((prev) => ({
      ...formUpdateProduct,
      [name]: name === 'price' || name === 'brandId' ? Number(value) : value,
    }));
  };

  async function handleUpdate(productId: number) {
    setIsMutating(true);
    try {
      await fetch(`/api/products/${productId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formUpdateProduct),
      });
      setIsMutating(true);
      router.refresh();
      setModal(false);
    } catch (err) {
      console.log('error update product', err);
    }
  }
  return (
    <div>
      <button
        className="btn btn-info btn-sm"
        onClick={handleOpenModal}
      >
        Edit
      </button>
      <input
        type="checkbox"
        className="modal-toggle"
        checked={modal}
        onChange={handleOpenModal}
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update Product {product.title}</h3>
          <form onSubmit={() => handleUpdate(product.id)}>
            <div className="form-control">
              <label className="label font-bold">Product Name</label>
              <input
                type="text"
                className="input w-full input-bordered"
                onChange={handleChange}
                placeholder="Product Name"
                name="title"
                value={formUpdateProduct.title}
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Price</label>
              <input
                type="text"
                className="input w-full input-bordered"
                onChange={handleChange}
                placeholder="Price"
                name="price"
                value={formUpdateProduct.price}
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Brand</label>
              <select
                className="select select-bordered"
                onChange={handleChange}
                name="brandId"
                value={formUpdateProduct.brandId}
              >
                <option
                  value=""
                  disabled
                >
                  Select Brand
                </option>
                {brands.map((brand) => (
                  <option
                    value={brand.id}
                    key={brand.id}
                  >
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>
            <div
              className="modal-action"
              onClick={handleOpenModal}
            >
              <button
                type="button"
                className="btn"
              >
                Close
              </button>
              {!isMutating ? (
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Update
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn loading"
                >
                  Updating...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
