const Sequelize = require('sequelize')

const db = new Sequelize({
  dialect: 'sqlite', 
  storage: __dirname + '/ecom.db'
})

const vendor = db.define('vendor', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

const product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false 
  },
  qty: {
    type: Sequelize.INTEGER,
    allowNull: false 
  },
  vendorname: {
    type: Sequelize.STRING,
    allowNull: false 
  }
})

const user = db.define('user', {
  email: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  },
})

const cart = db.define('cart', {
  qty: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
})

vendor.hasMany(product,{ onDelete: 'cascade' });
product.hasMany(cart);
user.hasMany(cart);


module.exports = {
  db, vendor, product, user,cart
}
