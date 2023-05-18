import prisma from '../db';
import express, { Request, Response } from 'express';

export const getOneUpdate = async (req, res) => {
  const id = req.params.id;
  const update = await prisma.update.findUnique({
    where: {
      id: id,
    },
  });

  res.json({ data: update });
};
export const getAllUpdates = async (req, res) => {
  const product = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = product.reduce((allupdates, product) => {
    return [...allupdates, ...product.updates];
  }, []);
  res.json({ data: updates });
};
export const createUpdate = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: {
      id: req.body.productId,
    },
  });

  if (!product) {
    return res.json({ message: 'Nope' });
  }

  const update = await prisma.update.create({
    data: {
      title: req.body.title,
      body: req.body.body,
      product: { connect: { id: product.id } },
    },
  });

  res.json({ data: update });
};

export const updateUpdate = async (req, res) => {
  const product = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });
  const updates = product.reduce((allupdates, product) => {
    return [...allupdates, ...product.updates];
  }, []);
  const match = updates.find((update) => update.id === req.params.id);
  if (!match) {
    return res.json({ message: 'Nope' });
  }
  const updateUpdate = await prisma.update.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });
  res.json({ data: updateUpdate });
};

export const deleteUpdate = async (req, res) => {
  const product = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });
  const updates = product.reduce((allupdates, product) => {
    return [...allupdates, ...product.updates];
  }, []);
  const match = updates.find((update) => update.id === req.params.id);
  if (!match) {
    return res.json({ message: 'Nope' });
  }

  const deleteUpdate = await prisma.update.delete({
    where: {
      id: req.params.id,
    },
  });

  res.json({ data: deleteUpdate });
};
