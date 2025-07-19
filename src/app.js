const express=require("express")
const path=require("path");
require("./db/conn")
const Users=require("./models/user")
const hbs=require("hbs")
const app=express();
const port = process.env.PORT || 8000;

const staticpath=path.join(__dirname,"../public")
const templatepath=path.join(__dirname,"../templates/views")
const partialspath=path.join(__dirname,"../templates/partials")

//middleware
app.use('/css', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use('/js', express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use('/jq', express.static(path.join(__dirname, "../node_modules/jquery/dist")));

app.use(express.urlencoded({extended:false}));
app.use(express.static(staticpath))
app.set("view engine","hbs");
app.set("views",templatepath)
hbs.registerPartials(partialspath)


app.get("/",(req,res)=>{
    res.render("index")
})
app.post("/contact", async (req, res) => {
    try {
      const userData = new Users(req.body);
      await userData.save();
      res.status(200).render("index", { message: "Form submitted successfully!" });
    } catch (err) {
      console.error("Error while saving contact form data:", err);
      res.status(500).render("index", { error: "Something went wrong. Please try again later." });
    }
  });
  

app.listen(port,()=>{
    console.log(`server is running on ${port}`);
    
})

