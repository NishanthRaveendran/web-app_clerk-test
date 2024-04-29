import connectToDatabase from '../../lib/mongodb';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { db } = await connectToDatabase();
        const eventData = req.body;

        switch (eventData.type) {
            case 'user.created':
                const userData = {
                    clerkId: eventData.data.id,
                    username: eventData.data.username,
                    email: eventData.data.emailAddresses[0].emailAddress,
                    createdAt: eventData.data.createdAt,
                };
                await db.collection('users').insertOne(userData);
                break;
            // You can add more cases to handle other types of events
        }

        res.status(200).json({ message: 'Webhook processed successfully' });
    } else {
        res.status(405).end('Method Not Allowed');
    }
}
