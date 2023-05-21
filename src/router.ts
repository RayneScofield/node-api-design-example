import { Router } from 'express';
import { body } from 'express-validator';
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateProduct,
} from './handlers/product';
import {
  createUpdate,
  deleteUpdate,
  getOneUpdate,
  getUpdates,
  updateUpdate,
} from './handlers/update';
import { handleInputError } from './modules/middleware';

const router = Router();

/**
 * Product
 */
router.get('/product', getProducts);

router.get('/product/:id', getOneProduct);

router.put('/product/:id', body('name').isString(), handleInputError, updateProduct);

router.post('/product', body('name').isString(), handleInputError, createProduct);

router.delete('/product/:id', deleteProduct);

/**
 * Update
 */
router.get('/update', getUpdates);

router.get('/update/:id', getOneUpdate);

router.put(
  '/update/:id',
  body('title').optional().isString(),
  body('body').optional(),
  body('status').isIn(['IN_PROGRESS', 'LIVE', 'ARCHIVED', 'DEPRECATED']).optional(),
  body('version').optional(),
  handleInputError,
  updateUpdate
);

router.post(
  '/update',
  body('title').exists().isString(),
  body('body').exists().isString(),
  body('productId').exists().isString(),
  handleInputError,
  createUpdate
);

router.delete('/update/:id', deleteUpdate);

/**
 * Update Point
 */
router.get('/updatepoint', async (req, res) => {});

router.get('/updatepoint/:id', async (req, res) => {});

router.put(
  '/updatepoint/:id',
  body('name').optional().isString(),
  body('description').optional().isString(),
  handleInputError,
  async (req, res) => {}
);

router.post(
  '/updatepoint',
  body('name').isString(),
  body('description').isString(),
  body('updateId').exists().isString(),
  handleInputError,
  async (req, res) => {}
);

router.delete('/updatepoint/:id', async (req, res) => {});

export default router;
