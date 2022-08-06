const { User } = require("../../models");
const router = require("express").Router();

router.post('/', async(req, res)=>{
    try {
        const loginData = await User.create(req.body)

        req.session.save(()=>{
            req.session.user
        })

    } catch (error) {
        
    }


}

router.post('./login', async(req, res) => {
    try {
    
} catch (error) {
    
}




} )

router.post('./logout', async(req, res)=>{
    try {
        
    } catch (error) {
        
    }





})