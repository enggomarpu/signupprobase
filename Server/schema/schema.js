const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt, 
    GraphQLList, 
    GraphQLSchema

} = graphql;


const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author:{
            type:AuthorType,
            resolve:(root, args, context, info) => {
                
            }
        } 
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: GraphQLList(BookType),
            resolve:(root, args, context, info) => {
                
            }            
        } 
    })
})

const RootQuery = new GraphQLObjectType({
    //name = 'RootQueryType',
    fields: {
        getBook:{
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve:(root, args, context, info) => {
                
            }
        },
        getAuthor:{
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve:(root, args, context, info) => {
                
            }
        },
        getBooks:{
            type: GraphQLList(BookType),
            resolve:(root, args, context, info) => {
                
            } 
        },
        getAuthors:{
            type: GraphQLList(AuthorType),
            resolve:(root, args, context, info) => {
                
            } 
        }        
    }
});
module.exports = new GraphQLSchema({
   query: RootQuery 
})