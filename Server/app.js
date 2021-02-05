const express = require("express");
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

const Event = require('./models/event')

const graphqlHttp = require('express-graphql').graphqlHTTP;
//const bookMongModel = mongoose.model();

const app = express();

//All About Databases
//Connection to the Database
url = `mongodb+srv://umar:123@cluster0.foq8i.mongodb.net/db?retryWrites=true&w=majority`;
mongoose.connect(url);
mongoose.connection.once('open', () => console.log('Database Connected'));

/* const bookModel = new bookMongModel('book', {
    id: Number,
    name: String,
    genre: String
});

const authorModel = new bookMongModel('author', {
    age: Number,
    name: String,
});
 */

let events = [];
 
app.use('/graphql', graphqlHttp({
    schema: buildSchema(`
        type EventType {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!    
        }
        type RootQuery{
            events: [EventType!]!
        }
        input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!                    
        }
        
        type RootMutation{
            createEvent( eventInput: EventInput ): EventType
        }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        events: () => {
           return Event.find().then( events => {
              return events.map( event => {
                    return {...event._doc, _id:event._doc._id.toString()} 
                })
            }).catch (err =>{
                throw err;
            })
        },
        createEvent: (args) => {
            // const event = {
            //     _id: Math.random.toString(),
            //     title: args.eventInput.title,
            //     description: args.eventInput.description,
            //     price: args.eventInput.price, 
            //     date: args.eventInput.date
            // };
            const event = new Event({
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: args.eventInput.price, 
                date: new Date(args.eventInput.date)
            })
            return event
                .save()
                .then(result => {
                console.log(result);
                return {...result._doc}
                })
                .catch( err => {
                console.log(err);
                throw err
            });
            //events.push(event);
            //return event;
        }
    },
    graphiql: true
}));
app.listen(3050, () => {
    console.log("Connected Port 3050")
});