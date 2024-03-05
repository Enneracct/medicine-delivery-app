const express = require('express'); 
const {Pool} = require('pg');

const app = express(); 
const port = process.env.PORT || 5000; 

const pool = new Pool({
    user : 'user',
    host : 'localhost',
    database : 'medicine-delivery-db',
    password : 'password',
    port : '5432'
    })


const userCarts = {};

app.use(express.json());

app.post('/api/order', async (req, res) => {
    const { name, email, phone, address, cart } = req.body;
    try {
        console.log('Received cart:', cart);

        const existingUser = await pool.query('SELECT email FROM "User" WHERE email = $1', [email]);

        if (existingUser.rows.length > 0) {
            const cartArray = Object.keys(cart).map(product_id => ({ product_id, quantity: cart[product_id] }));
            const insertOrders = await Promise.all(cartArray.map(async (item) => {
                const { product_id, quantity } = item;
                return await pool.query('INSERT INTO Orders (email, product_id, date, quantity) VALUES ($1, $2, $3, $4) RETURNING *', [email, product_id, new Date(), quantity]);
            }));

            userCarts[email] = cartArray;

            res.json(insertOrders.map(order => order.rows[0]));
        } else {
            const insertUser = await pool.query('INSERT INTO "User" (email, full_name, phone, address) VALUES ($1, $2, $3, $4) RETURNING *', [email, name, phone, address]);
            const cartArray = Object.keys(cart).map(product_id => ({ product_id, quantity: cart[product_id] }));
            const insertOrders = await Promise.all(cartArray.map(async (item) => {
                const { product_id, quantity } = item;
                return await pool.query('INSERT INTO Orders (email, product_id, date, quantity) VALUES ($1, $2, $3, $4) RETURNING *', [email, product_id, new Date(), quantity]);
            }));

            userCarts[email] = cartArray;

            res.json({
                user: insertUser.rows[0],
                orders: insertOrders.map(order => order.rows[0])
            });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while inserting data into the database' });
    }
});



app.get('/api/medicine', async (req, res) => {
    try {
        // Query to fetch data from the medicine table
        const getMedicineQuery = `
            SELECT * FROM Product
        `;
        
        // Execute the query
        const { rows } = await pool.query(getMedicineQuery);
        
        // Send the retrieved data as JSON response
        res.status(200).json(rows);
    } catch(err) {
        // If an error occurs, log the error and send a 500 response
        console.error('An error occurred while fetching data from the medicine table:', err);
        res.status(500).send('Error fetching data from the medicine table');
    }
});


app.listen(port, () => console.log(`Listening on port ${port}`));




app.get('/apitest', async (req, res) => { 

    try {
        // Create users table
        const createUserTable = `
        CREATE TABLE IF NOT EXISTS "User" (
            email VARCHAR(255) PRIMARY KEY,
            full_name VARCHAR(255),
            phone VARCHAR(20),
            address VARCHAR(255)
        );
        `;

        // Create product table
        const createProductTable = `
            CREATE TABLE IF NOT EXISTS Product (
                product_id SERIAL PRIMARY KEY,
                product_name VARCHAR(255),
                price DECIMAL(10, 2),
                quantity_remain INTEGER
            );
        `;

        // Create orders table
        const createOrderTable = `
            CREATE TABLE IF NOT EXISTS Orders (
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) REFERENCES "User"(email),
                product_id INTEGER REFERENCES Product(product_id),
                date DATE,
                quantity INTEGER,
                CONSTRAINT fk_user FOREIGN KEY (email) REFERENCES "User"(email),
                CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES Product(product_id)
            );
        `;

        // Execute both create table queries
        await pool.query(createProductTable);
        await pool.query(createUserTable);
        await pool.query(createOrderTable);


        // Populate Product table
        // const insertProductQuery = `
        //     INSERT INTO Product (product_name, price, quantity_remain)
        //     VALUES 
        //         ('Paracetamol', 10.99, 100),
        //         ('Antiseptic', 20.49, 100),
        //         ('Eye drops', 25.49, 100),
        //         ('Omeprazole', 7.49, 100),
        //         ('Losartan', 14.49, 100),
        //         ('Antibiotics', 18.49, 100),
        //         ('Atorvastatin', 16.49, 100),
        //         ('Gabapentin', 11.49, 100)
        //     RETURNING *
        //`;

        const productResult = await pool.query(insertProductQuery);

        res.status(200).json({
            message: 'Tables created and populated with data successfully',
            medicine: productResult.rows
        });

    } catch(err) {
        console.error('An error occured during querying to DB.', err);
        res.status(500).send('Error creating table');
    }}); 