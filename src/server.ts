import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());

app.post('/webhooks/github', (req: Request, res: Response) => {
    // Handle GitHub webhook payload here
    console.log('GitHub Webhook received:', req.body);
    res.status(200).send('Webhook received successfully');
});

app.listen(port, () => {
    console.log(`Webhook server is running on port ${port} `);
});
