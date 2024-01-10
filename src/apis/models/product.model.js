const mongoose = require('mongoose');
const slugify = require('slugify');

const { toJSON, paginate } = require('./plugins');
const { ProductTypes } = require('../../constants/enum');

const DOCUMENT_NAME = 'product';
const ObjectId = mongoose.Types.ObjectId;

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    slug: String,
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    type: {
      type: String,
      required: true,
      enum: Object.values(ProductTypes),
    },
    variations: { type: Array, default: [] },

    shop: { type: ObjectId, required: true, refPath: 'type' },
    productDetail: { type: ObjectId, required: true, refPath: 'type' },

    isPublic: { type: Boolean, default: false, index: true },
  },
  {
    timestamps: true,
  }
);

productSchema.index({ name: 'text', description: 'text' });

productSchema.plugin(toJSON);
productSchema.plugin(paginate);

productSchema.pre(['save'], async function (next) {
  const product = this;
  if (product.isModified('name')) {
    product.slug = slugify(product.name, { lower: true });
  }
  next();
});

productSchema.pre(['findOneAndUpdate'], async function (next) {
  const update = this.getUpdate();

  if (update?.name) {
    update.$set.slug = slugify(update.name, { lower: true });
  }
  next();
});

module.exports = mongoose.model(DOCUMENT_NAME, productSchema);
