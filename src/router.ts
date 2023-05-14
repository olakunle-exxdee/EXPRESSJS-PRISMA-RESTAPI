import { Router } from 'express';
import { body } from 'express-validator';
import { handleInputErrors } from './modules/middewares';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} from './handlers/product';
const router = Router();

// Products
router.get('/product', getAllProducts);
router.get('/product/:id', getSingleProduct);
router.put(
  '/product/:id',
  body('name').isString(),
  handleInputErrors,
  updateProduct
);
router.post(
  '/product',
  body('name').isString(),
  handleInputErrors,
  createProduct
);
router.delete('/product/:id', deleteProduct);

// Updates
router.get('/update');
router.get('/update/:id');
router.put(
  '/update/:id',
  body('title').optional(),
  body('body').optional,
  body('status').isIn(['IN_PROGRESS', 'SHIPPED', ' DEPRECATED']),
  body('version').optional,
  handleInputErrors
);
router.post(
  '/update',
  body('title').exists().isString(),
  body('body').exists().isString(),
  handleInputErrors
);
router.delete('/update/:id');

/**
 *
 * Update points
 */

router.get('/updatepoint');
router.get('/updatepoint/:id');
router.put(
  '/updatepoint/:id',
  body('name').optional().isString(),
  body('description').optional().isString(),
  handleInputErrors
);
router.post(
  '/updatepoint',
  body('name').isString(),
  body('description').isString(),
  body('updateId').exists().isString(),
  handleInputErrors
);
router.delete('/updatepoint/:id');

export default router;
