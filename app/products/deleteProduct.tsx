'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Product = {
  id: number;
  title: string;
  price: number;
  brandId: number;
};

const DeleteProduct = ({ product }: { product: Product }) => {
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const router = useRouter();

  const handleOpenModal = () => {
    setModal(!modal);
  };

  const handleDelete = async (productId: number) => {
    setIsMutating(true);
    await axios.delete(`/api/products/${productId}`);
    setIsMutating(false);
    router.refresh();
    setModal(false);
  };

  return (
    <div>
      <button
        className="btn btn-error btn-sm"
        onClick={handleOpenModal}
      >
        Delete
      </button>
      <input
        type="checkbox"
        className="modal-toggle"
        checked={modal}
        onChange={handleOpenModal}
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are you sure to delete this "{product.title}"</h3>
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
                onClick={() => handleDelete(product.id)}
              >
                Delete
              </button>
            ) : (
              <button
                type="submit"
                className="btn loading"
              >
                Deleting...
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;
