const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')


const app = express()
const port = 4000
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
 
 app.use(cors(corsOptions))


app.post("/calculateBreakEven", (req, res) => {
    const { fixedCosts, variableCostPerUnit, sellingPricePerUnit } = req.body;
  
    // Calculate the break-even point as in your previous React component
    const contributionMarginPerUnit = sellingPricePerUnit - variableCostPerUnit;
    const breakEvenUnits = fixedCosts / contributionMarginPerUnit;
    const breakEvenDollars = breakEvenUnits * sellingPricePerUnit;
  
    res.json({ breakEvenUnits, breakEvenDollars });
  });


app.listen(port, () =>{
    console.log(`server is running ${port}`)
})


