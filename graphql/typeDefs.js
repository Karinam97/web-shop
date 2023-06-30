const {gql} = require('apollo-server')

module.exports = gql`
type Product {
    brand: String
    image: String
    name: String
    price: String
}

input ProductInput {
    brand:String
    image: String
    name: String
    price: String
}

type Query {
    product(ID: ID!): Product!
    getProducts(amount: Int): [Product]
}

type Mutation {
    createProduct(productInput: ProductInput): Product!
    deleteProduct(ID: ID!): Boolean    
}
`

