import { jwtVerify } from "jose";

export const getDataFromToken = async (token: string) => {
    try {
        const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY!);
        const verified = await jwtVerify(token, secretKey);
        return verified.payload.accAddress as any;       

    } catch (error: any) {
        console.log(error);
    }
}