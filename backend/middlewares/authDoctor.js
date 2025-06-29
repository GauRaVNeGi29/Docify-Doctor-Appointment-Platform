import jwt from 'jsonwebtoken'

async function authDoctor(req, res, next) {
    try {
        const {dtoken} = req.headers;
        if(!dtoken){
            return res.json({success: false, message: "Not Authorized, Please Login"});
        }
        const tokenDecode = jwt.verify(dtoken, process.env.JWT_SECRET);
        req.docId = tokenDecode.id;
        next();
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message});
    }
}

export default authDoctor