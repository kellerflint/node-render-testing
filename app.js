//Import Libraries
import express from 'express';
import pg from 'pg';
import validateForm from './services/validation.js';

//Define our database credentials
const pool = new pg.Pool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '1234',
    database: process.env.DB_NAME || 'pizza',
    port: process.env.DB_PORT || 5432,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

//Define function to connect to the DB
async function connect() {
    try {
        const conn = await pool.connect();
        console.log('Connected to the database!')
        return conn;
    } catch (err) {
        console.log(`Error connecting to the database ${err}`)
        throw err;
    }
}

//Instantiate an Express application
const app = express();

//Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

//Set the view engine for our application
app.set('view engine', 'ejs');

//Serve static files from the 'public' directory
app.use(express.static('public'));

//Define a port number for our server to listen on
const PORT = process.env.PORT || 3000;

//Define a "default" route for our home page
app.get('/', (req, res) => {

    // Send our home page as a response to the client
    res.render('home');
});

//Define an admin route
app.get('/admin', async (req, res) => {

    //Connect to the database
    const conn = await connect();

    //Query the database
    const orders = await conn.query('SELECT * FROM orders')

    console.log(orders.rows);

    // Release the connection back to the pool
    conn.release();

    res.render('order-summary', { orders: orders.rows });
});

//Define a "thank you" route
app.post('/thankyou', async (req, res) => {

    const order = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        method: req.body.method,
        toppings: req.body.toppings,
        size: req.body.size
    };

    const result = validateForm(order);
    if (!result.isValid) {
        console.log(result.errors);
        res.send(result.errors);
        return;
    }

    try {
        //Connect to the database
        const conn = await connect();

        //Convert toppings to a string
        if (order.toppings) {
            if (Array.isArray(order.toppings)) {
                order.toppings = order.toppings.join(",");
            }
        } else {
            order.toppings = "";
        }

        // Add the order to our database
        const insertQuery = await conn.query(`INSERT INTO orders 
            (fname, lname, email, size, method, toppings)
            VALUES ($1, $2, $3, $4, $5, $6)`,
            [ order.fname, order.lname, order.email, order.size, 
            order.method, order.toppings ]);

        // Release the connection back to the pool
        conn.release();

        // Send our thank you page
        res.render('thankyou', { order });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).send('Database error: ' + err.message);
    }
});

//Tell the server to listen on our specified port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
