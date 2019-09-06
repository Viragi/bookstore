const graphql = require("graphql");

const {GraphQLObjectType,
        GraphQLString,
        GraphQLSchema,
        GraphQLID,
        GraphQLInt,
        GraphQLList} = graphql;
const _ = require("lodash");
// dummy data

var books =[
    {name:"avatar1" ,id:"1" ,gener:"sci-fi", authorId: "1"},
    {name:"avatar2" ,id:"2", gener:"fantasy", authorId: "2"},
    {name:"avatar3" ,id:"3" ,gener:"sci-fi", authorId: "3"},
    {name:"avatar4" ,id:"4" ,gener:"sci-fi", authorId: "2"},
    {name:"avatar5" ,id:"5" ,gener:"sci-fi", authorId: "2"},
    {name:"avatar6" ,id:"6" ,gener:"sci-fi", authorId: "1"}
]

var authors =[
    {name: "author1" ,id:"1",age:22},
    {name: "author2" ,id:"2",age:32},
    {name: "author3" ,id:"3",age:42}
]
const bookType = new GraphQLObjectType({
    name:"Book",
    fields:()=>({
        id: {type:GraphQLID},
        name:{type: GraphQLString},
        genre:{type:GraphQLString},
        author:{
            type:authorType,
            resolve(parent,args){
                return _.find(authors,{id:parent.authorId});
            }
        }
    })
})

const authorType = new GraphQLObjectType({
    name: "Author",
    fields: ()=>({
        id:{type: GraphQLID},
        name:{type:GraphQLString},
        age :{type: GraphQLInt},
        book:{
            type: new GraphQLList(bookType),
            resolve(parent,args){
                return _.filter(books,{authorId:parent.id});
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields:{
        book:{
            type: bookType,
            args : {id: { type:GraphQLID}},
            resolve(parent,args){
               return  _.find(books,{id:args.id});
            }
        },
        author:{
            type:authorType,
            args:{id: {type:GraphQLID}},
            resolve(parent,args){
                return _.find(authors,{id:args.id});
            }
        },
        books:{
            type: new GraphQLList(bookType),
            resolve(parent,args){
                return books
            }
        },

        authors:{
            type: new GraphQLList(authorType),
            resolve(parent,args){
                return authors
            }
        }

    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})