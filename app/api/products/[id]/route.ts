import { PrismaClient, Product } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const DELETE = async (request: Request, { params }: { params: { id: string } }) => {
  const res = await prisma.product.delete({
    where: { id: Number(params.id) },
  });
  return NextResponse.json(res, { status: 200 });
};

export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
  const body: Product = await request.json();
  const res = await prisma.product.update({
    where: { id: Number(params.id) },
    data: {
      title: body.title,
      price: body.price,
      brandId: body.brandId,
    },
  });
  return NextResponse.json(res, { status: 200 });
};
