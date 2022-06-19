const express = require('express');
const cors = require('cors');
require("dotenv").config();
const { MongoClient } = require('mongodb');
const ObjectId = require("mongodb").ObjectId;
const app = express();
const port = process.env.PORT || 5000;

/* -------------------MiddleWare----------------*/

app.use(cors());
app.use(express.json());

/* -------------------End of MiddleWare----------------*/

/* -------------------MongoDB Connection----------------*/
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@restful-api.fdzsm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

/* ----------------End of MongoDB Connection----------------*/

/*---------CRUD Operation------------*/
async function run() {
    try {
        await client.connect();
        console.log('Database Connection Established!');

        const database = client.db("allCourses");
        const coursesCollection = database.collection("courses");


        /*-------------GET API--------------*/
        app.get('/courses', async (req, res) => {
            const cursor = coursesCollection.find({});
            const result = await cursor.toArray();
            res.status(200).json(result);
        })
        //   get product by id




        // get order by user email


        /*-------------end of GET API--------------*/

        /*--------POST API----------*/
        app.post('/courses', async (req, res) => {
            const course = req.body;
            // console.log(course);
            const result = await coursesCollection.insertOne(course);
            res.status(200).send(result);
        })

        // send user data to database



        /*--------end of POST API----------*/

        /*----------UPDATE API----------*/

        //course update route
        app.patch("/courses/:courseId", async (req, res) => {
            const id = req.params.courseId;
            const filter = { _id: ObjectId(id) };
            const updateDoc = { $set: req.body };
            const result = await coursesCollection.updateOne(filter, updateDoc);
            res.status(200).send(result);
        });

        /*----------end of UPDATE API----------*/


        /*-----------Delete API----------*/
        app.delete("/courses/:id", async (req, res) => {
            const query = { _id: ObjectId(req.params.id) };
            const result = await coursesCollection.deleteOne(query);
            res.status(200).send(result);
        })

        //delete product by admin



        /*-----------end of Delete API----------*/
    } finally {

    }
}
run().catch(console.dir);
/*---------end of CRUD Operation------------*/


/* -------------------Page Initialization----------------*/

app.get('/', (req, res) => {
    res.send("Welcome to Courses Server!");
});

app.listen(port, () => {
    console.log("Server is running on PORT", port);
});

/* ---------------End of Page Initialization---------------*/