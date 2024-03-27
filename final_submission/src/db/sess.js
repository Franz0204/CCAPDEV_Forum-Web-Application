import session from 'express-session';
import ConnectMongoDBSession from 'connect-mongodb-session';
const MongoDBStore = ConnectMongoDBSession(session);
const store = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    databaseName: process.env.DB_NAME,
    collection: 'sessions'
});

store.on('error', function(error) {
    console.error(error);
});

const ssOpts = {
    secret: process.env.SECRET,
    cookie: {
        //sameSite: true,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7
    },
    store: store,
    saveUninitialized: false,
    resave: true
}

const sess = session(ssOpts);

export default sess;