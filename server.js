const express = require('express')
const {
  db,
  vendor,
  product,
  user,
  cart
} = require('./db')

const app = express()

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

app.use('/',
  express.static(__dirname + '/public')
)
/*
app.use('/home',
  express.static(__dirname + '/public/addvendor.html')
)
*/

app.get('/vendor', async (req, res) => {
  const vendors = await vendor.findAll()
  res.send(vendors)
})

app.post('/vendor', async (req, res) => {
  try {
      const result = await vendor.create({
      name: req.body.name
    })
    res.send({success: true})
  } catch (e) {
    res.send({success: false, err: e.message})
  }
})

app.delete('/deletevendor', async(req,res) => {
  try{
    const result = await vendor.destroy({
      where: {
         name:req.body.vendorname
      }    
  })
  res.send({success: true})
} catch (e) {
  res.send({success: false, err: e.message})
}
})

app.get('/product', async (req, res) => {
  const products = await product.findAll()
  res.send(products)
})

app.post('/product', async (req, res) => {
  try {
      const result = await product.create({
      name: req.body.name,
      price: req.body.price,
      qty: req.body.qty,
      vendorname: req.body.vendorname,
      vendorId:  req.body.vendorid
    })
    res.send({success: true})
  } catch (e) {
    res.send({success: false, err: e.message})
  }
})

app.delete('/deleteproduct', async(req,res) => {
  try{
    const result = await product.destroy({
      where: {
         name:req.body.productname
      }    
  })
  res.send({success: true})
} catch (e) {
  res.send({success: false, err: e.message})
}
})

app.post('/user', async (req, res) => {

  try {
      const result = await user.create({
      email: req.body.email
    })
    
    res.send({success: true})
  } catch (e) {
    res.send({success: false, err: e.message})
  }
})

app.post('/addtocart', async (req, res) => {
  try {
      var prev = await cart.findAll({
        where:{
          productId: req.body.pid,
          userEmail: req.body.uid 
        }
      })
     if(prev.length){   
      let x = prev[0].dataValues.qty+1
      const result = await cart.update(
        {qty: x},
        {where:{
          productId: req.body.pid,
          userEmail: req.body.uid 
        }})
        res.send({success: true})
     }
     else{
      const result = await cart.create({
        qty: 1,
        productId: req.body.pid,
        userEmail: req.body.uid  
      })   
      res.send({success: true})   
     }   
  } catch (e) {
    res.send({success: false, err: e.message})
  }
})

app.post('/login',async (req, res) => {
  var result = await user.findAll({
    where:{
      email: req.body.email 
    }
  })
  if(result.length){
    res.send({success: true})  
  }
  else
  res.send({success: false})  
  })

  app.post('/getcart',async (req, res) => {
    var result = await cart.findAll({
      where:{
        userEmail: req.body.email 
      }
    })
    var result2 = new Array()
    for(var pro of result){
      result2.push(await product.findAll({
        where:{
          id: pro.productId
        }
      }))
    }
    for(var i =0 ; i<result2.length;i++){
      result2[i].qty= result[i].qty
    }  
    var result3={result,result2}
    res.send(result3)
  })

db.sync()
  .then(() => {
    app.listen(7777)
  })
