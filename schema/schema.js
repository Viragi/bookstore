const graphql = require("graphql");

const {GraphQLObjectType,GraphQLString,GraphQLSchema} = graphql;
const _ = require("lodash");
// dummy data

var books =[
    {name:"avatar1" ,id:"1" ,gener:"sci-fi"},
    {name:"avatar2" ,id:"2", gener:"fantasy"},
    {name:"avatar3" ,id:"3" ,gener:"sci-fi"}
]
const bookType = new GraphQLObjectType({
    name:"Book",
    fields:()=>({
        id: {type:GraphQLString},
        name:{type: GraphQLString},
        genre:{type:GraphQLString}
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields:{
        book:{
            type: bookType,
            args : {id: { type:GraphQLString}},
            resolve(parent,args){
               return  _.find(books,{id:args.id});
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})