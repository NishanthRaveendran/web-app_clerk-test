import connectToDatabase from '../../lib/mongodb';

// Middleware to log raw request
export const config = {
    api: {
        bodyParser: false,  // Disable automatic body parsing
    },
};

export default async function handler(req, res) {
    // Buffer to store raw data
    let rawData = '';
    req.on('data', chunk => {
        rawData += chunk;
    });

    req.on('end', async () => {
        console.log("Raw webhook payload:", rawData);

        // Now parse the JSON data
        const eventData = JSON.parse(rawData).data;

        if (eventData.type === 'user.created') {
            const { db } = await connectToDatabase();

            const email = eventData.email_addresses && eventData.email_addresses.length > 0
                          ? eventData.email_addresses[0].emailAddress
                          : 'default@email.com'; // Fallback if no email is present

            const userData = {
                clerkId: eventData.id,
                username: eventData.username || 'defaultUsername',
                email: email,
                createdAt: eventData.last_active_at,
            };

            console.log("Inserting user data:", userData);
            await db.collection('users').insertOne(userData);
            res.status(200).json({ message: 'User added to MongoDB' });
        } else {
            res.status(405).end('Method Not Allowed');
        }
    });
}
