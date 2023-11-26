import * as crypto from "crypto";
import { Request } from "express";
import dotenv from 'dotenv';

dotenv.config();

const GITHUB_WEBHOOK_SECRET = process.env.GITHUB_WEBHOOK_SECRET || '';


const verifySignature = (req: Request) => {
    const signature = crypto
        .createHmac("sha256", GITHUB_WEBHOOK_SECRET)
        .update(JSON.stringify(req.body))
        .digest("hex");
    let trusted = Buffer.from(`sha256=${signature}`, 'ascii');
    let untrusted = Buffer.from(req.get("x-hub-signature-256") || '', 'ascii');
    return crypto.timingSafeEqual(trusted, untrusted);
};

export default verifySignature;
