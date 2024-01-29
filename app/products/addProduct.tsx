'use client';

import { useRouter } from 'next/navigation';
import { SyntheticEvent, useState } from 'react';
import type { Brand } from '@prisma/client';
import axios from 'axios';

const AddProduct = ({ brands }: { brands: Brand[] }) => {
  const [modal, setModal] = useState(false);
  const router = useRouter();
  const [formAddProduct, setFormAddProduct] = useState({
    title: '',
    price: '',
    brandId: '',
  });

  const handleOpenModal = () => {
    setModal(!modal);
  };

  const handleChange = ({ target: { name, value } }: { target: { name: string; value: String } }) => {
    setFormAddProduct((prev) => ({
      ...formAddProduct,
      [name]: name === 'price' || name === 'brandId' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formAddProduct),
      });
      setFormAddProduct({
        title: '',
        price: '',
        brandId: '',
      });
      router.refresh();
    } catch (err) {
      console.log('error add product', err);
      setFormAddProduct({
        title: '',
        price: '',
        brandId: '',
      });
    }
  };
  return (
    <div>
      <button
        className="btn"
        onClick={handleOpenModal}
      >
        Add New
      </button>
      <input
        type="checkbox"
        className="modal-toggle"
        checked={modal}
        onChange={handleOpenModal}
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Product</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label font-bold">Product Name</label>
              <input
                type="text"
                className="input w-full input-bordered"
                onChange={handleChange}
                placeholder="Product Name"
                name="title"
                value={formAddProduct.title}
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
                value={formAddProduct.price}
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Brand</label>
              <select
                className="select select-bordered"
                onChange={handleChange}
                name="brandId"
                value={formAddProduct.brandId}
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
              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
