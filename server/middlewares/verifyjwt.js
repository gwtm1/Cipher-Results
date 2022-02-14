import jwt from "jsonwebtoken";

export const verifyjwt = (req, res, next) => {
    try {
        const { jwtkey } = req.headers;
        const jwtSecretKey = process.env.jwtSecretKey;

        const verified = jwt.verify(jwtkey, jwtSecretKey);

        if(verified) {
            // return res.send("Successfully Verified");
            // res.header('Access-Control-Allow-Origin', '*');
            next();
        } 
        else{
            return res.status(401).send(error);
        }
    } catch (error) {
        return res.status(401).send(error);
    }
}