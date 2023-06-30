const Product = require('../models/product')

module.exports = {
    Query: {
        async product(_,{ID}){
            return await Product.findById(ID)
        },
        async getProducts(_, {amount}) {
            return await Product.find().limit(amount)
        }
    },
    Mutation:{
        async createProduct(_,{productInput:{brand, image, name, price}}){
            const createdProduct = new Product({
                brand: brand,
                image: image,
                name: name,
                price: price
            })

            const res = await createdProduct.save()
            console.log(res)
            return {
                id: res.id,
                ...res._doc
            }
        },
        async deleteProduct(_, {ID}){
            const wasDelted = (await Product.deleteOne({_id: ID})).deletedCount
            return wasDeleted
        }
    }
}