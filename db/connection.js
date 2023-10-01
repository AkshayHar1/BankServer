
const mongoose =require('mongoose')


mongoose.connect(process.env.base_url,
    {
        useUnifiedTopology:true,
        useNewUrlParser:true
    })
.then(()=>{console.log("MB atlas connected...")})
.catch(()=>{console.log("MB atlas not connected");})