const MongoClient = require('mongodb').MongoClient;

// Replace the MongoDB connection string with your own
const mongoURI = 'mongodb://localhost:27017/';

// Sample district names
const districtNames = [
    'Srinagar',
    'Jammu',
    'Udhampur',
    'Pulwama',
    'Anantnag',
    'Baramulla',
    'Kathua',
    'Rajouri',
    'Doda',
    'Kupwara'
];

// Sample sellers data (unique sellers)
const uniqueSellersData = [
    { name: 'Seller 1', products: ['Product A', 'Product B'] },
    { name: 'Seller 2', products: ['Product C', 'Product D'] },
    { name: 'Seller 3', products: ['Product E', 'Product F'] },
    { name: 'Seller 4', products: ['Product G', 'Product H'] },
    { name: 'Seller 5', products: ['Product I', 'Product J'] }
];

async function createDatabase() {
    const client = new MongoClient(mongoURI, {  });

    try {
        await client.connect();

        const db = client.db();
        const sellersCollection = db.collection('sellers');

        // Insert unique sellers
        await sellersCollection.insertMany(uniqueSellersData);

        // Create sellers for each district by referencing the unique sellers
        for (const district of districtNames) {
            const sellersForDistrict = uniqueSellersData.map((seller) => ({ ...seller, district }));
            await sellersCollection.insertMany(sellersForDistrict);
        }
        console.log("Database Connected!")

        
    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.close();
    }
}

createDatabase();
