import { PrismaClient } from '@prisma/client';
import AddProducts from './addProduct';
import DeleteProduct from './deleteProduct';
import UpdateProduct from './updateProduct';

const prisma = new PrismaClient();

const getProducts = async () => {
  const response = await prisma.product.findMany({
    select: {
      id: true,
      title: true,
      price: true,
      brandId: true,
      brand: true,
    },
  });
  return response;
};

const getBrands = async () => {
  const response = await prisma.brand.findMany();
  return response;
};

const ProductList = async () => {
  const [products, brands] = await Promise.all([getProducts(), getBrands()]);

  return (
    <div className="w-full min-h-screen flex items-center flex-col p-3">
      <div className="w-full flex justify-start p-3">
        <AddProducts brands={brands} />
      </div>
      <table className="table w-full ">
        <thead className="bg-slate-700">
          <tr>
            <th className="border border-slate-600 ...">#</th>
            <th className="border border-slate-600 ...">Product Name</th>
            <th className="border border-slate-600 ...">Price</th>
            <th className="border border-slate-600 ...">Brand</th>
            <th className="border border-slate-600 ...">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
              <td className="border border-slate-700 ...">{index + 1}</td>
              <td className="border border-slate-700 ...">{product.title}</td>
              <td className="border border-slate-700 ...">{product.price}</td>
              <td className="border border-slate-700 ...">{product.brand.name}</td>
              <td className="border border-slate-700 ...">
                <div className="flex justify-center items-center gap-2">
                  <DeleteProduct product={product} />
                  <UpdateProduct
                    product={product}
                    brands={brands}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
