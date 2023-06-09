import prisma from '../db';

// get all products
export const getAllProducts = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      products: true,
    },
  });
  res.json({ data: user.products });
};

// get single Product
export const getSingleProduct = async (req, res) => {
  const id = req.params.id;
  const product = await prisma.product.findFirst({
    where: {
      id: id,
      belongsToId: req.user.id,
    },
  });

  res.json({ data: product });
};

// create product

export const createProduct = async (req, res, next) => {
  try {
    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        belongsToId: req.user.id,
      },
    });
    res.json({ data: product });
  } catch (error) {
    next(error);
  }
};

// update product

export const updateProduct = async (req, res) => {
  const updated = await prisma.product.update({
    where: {
      // ... provide filter here
      id_belongsToId: {
        id: req.user.id,
        belongsToId: req.user.id,
      },
    },
    data: {
      // ... provide data here
      name: req.body.name,
    },
  });
  res.json({ data: updated });
};

// delete product
export const deleteProduct = async (req, res) => {
  const deleted = await prisma.product.delete({
    where: {
      id_belongsToId: {
        id: req.user.id,
        belongsToId: req.user.id,
      },
    },
  });
  res.json({ data: deleted });
};
