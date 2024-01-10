const httpStatus = require('http-status');

const { Product: ProductModel, ProductDetails } = require('../models');
const ApiError = require('../../utils/api-error');
const { updateProduct, getProductById } = require('../models/repositories/product.repo');

const {
  Clothing: ClothingModel,
  Electronics: ElectronicsModel,
  Furniture: FurnitureModel,
} = ProductDetails;

class ProductFactory {
  static productRegistry = {};

  static registerProductType(type, classRef) {
    ProductFactory.productRegistry[type] = classRef;
  }

  static async createProduct(type, payload) {
    const productClass = ProductFactory.productRegistry[type];
    if (!productClass) throw new ApiError(httpStatus.BAD_REQUEST, 'No have a Product Class.');

    return new productClass(payload).createProduct();
  }

  static async getProducts(filter = {}, options = {}) {
    return ProductModel.paginate(filter, options);
  }

  static async updateProduct({ shop, id, payload }) {
    const product = await getProductById(id);
    if (!product) throw new ApiError(httpStatus.NOT_FOUND, 'This product is not found');

    if (shop !== product.shop.toString())
      throw new ApiError(httpStatus.NOT_FOUND, 'This product is not belong to this shop');

    // product = { ...product, ...payload };
    // return product.updateOne(payload);
    return updateProduct({ id, payload });
  }

  static async getProductById(id) {
    return getProductById(id);
  }
}

class Product {
  constructor({ name, description, price, quantity, product_type, shop, product_detail }) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.quantity = quantity;
    this.type = product_type;
    this.shop = shop;
    this.productDetail = product_detail;
  }

  async createProduct(productDetailId) {
    return await ProductModel.create({ ...this, productDetail: productDetailId });
  }
}

class Clothing extends Product {
  async createProduct() {
    const newClothing = await ClothingModel.create(this.productDetail);
    if (!newClothing) throw new ApiError(httpStatus.BAD_REQUEST, 'Create new Clothing fail!');

    const newProduct = await super.createProduct(newClothing.id);
    if (!newProduct) throw new ApiError(httpStatus.BAD_REQUEST, 'Create new Product fail!');

    return newProduct;
  }
}

class Electronics extends Product {
  async createProduct() {
    const newElectronics = await ElectronicsModel.create(this.productDetail);
    if (!newElectronics) throw new ApiError(httpStatus.BAD_REQUEST, 'Create new Electronics fail!');

    const newProduct = await super.createProduct(newElectronics.id);
    if (!newProduct) throw new ApiError(httpStatus.BAD_REQUEST, 'Create new Product fail!');

    return newProduct;
  }
}

class Furniture extends Product {
  async createProduct() {
    const newFurniture = await FurnitureModel.create(this.productDetail);
    if (!newFurniture) throw new ApiError(httpStatus.BAD_REQUEST, 'Create new Furniture fail!');

    const newProduct = await super.createProduct(newFurniture.id);
    if (!newProduct) throw new ApiError(httpStatus.BAD_REQUEST, 'Create new Product fail!');

    return newProduct;
  }
}

ProductFactory.registerProductType('Clothing', Clothing);
ProductFactory.registerProductType('Electronics', Electronics);
ProductFactory.registerProductType('Furniture', Furniture);

module.exports = ProductFactory;
