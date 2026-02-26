const express = require('express');
const multer = require("multer");
const path = require("path");
const fs = require('fs');

const app = express()
const port = 3000
const cors = require("cors");
const {  Brand, Category, Car, Specification, SpecificationCategory, SpecificationField, FeatureCategory, Feature, UserProfile, DealerProfile, Admin,CarARAsset } = require('./models');
const { comparePassword } = require('./helpers/bcrypt');
const { signToken } = require("./helpers/jwt");

app.use(cors("*"));
//app.use(cors());
//app.use(cors({
//  origin: [
//    "https://d85f0465f7d1.ngrok-free.app",
//    "http://localhost:5173"
 // ],
 // credentials: true
//}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.glb')) {
      res.setHeader('Content-Type', 'model/gltf-binary');
      res.setHeader('Cache-Control', 'no-store');
    }
    if (filePath.endsWith('.usdz')) {
      res.setHeader('Content-Type', 'model/vnd.usdz+zip');
    }
  }
}));
app.use("/register", express.json());
app.use("/registerAdmin", express.json());
app.use("/login", express.json());
app.use("/loginAdmin", express.json());
app.use("/userprofiles", express.json());
app.use("/cars", express.json());
app.use("/categories", express.json());
app.use("/brands", express.json());

app.use("/dealerprofiles", express.json());
app.use("/dealerprofilesuser", express.json());
app.use("/dealerprofilesbrand", express.json());
app.use("/features", express.json());
app.use("/featurecategories", express.json());
app.use("/specifications", express.json());
app.use("/specificationcategories", express.json());
app.use("/specificationfields", express.json());
//app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.get('/', (req, res) => {
  res.send('Hello World! we are back :)')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.post('/register',async(req , res)=>{
  try {
    const {username, email , role, password} = req.body;
    const user = await UserProfile.create({ username, email, role, password });
    res.status(201).json({ id: user.id, email: user.email });
  } catch (error) {
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      res.status(400).json({ message: error.errors[0].message });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
    console.log(error);
  }
});

app.post('/registerAdmin',async(req , res)=>{
  try {
    const {username, email , password} = req.body;
    const admin = await Admin.create({ username, email, password });
    res.status(201).json({ id: admin.id, email: admin.email });
  } catch (error) {
    if (
      error.name === "SequelizeValidationError" ||
      error.name === "SequelizeUniqueConstraintError"
    ) {
      res.status(400).json({ message: error.errors[0].message });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
    console.log(error);
  }
});

app.post('/login', async(req , res)=>{
  try {
    const {email , password} = req.body;
    console.log(req.body);
    
    const user = await UserProfile.findOne({where : {email}});
    if(!user){
      throw { message : "UserNotFound" };
    }

    const passValid = comparePassword(password , user.password);
    if(!passValid){
      throw { message : "UserNotFound"};
    }
    const token = signToken({ id: user.id , email: user.email , role: user.role})
    res.status(200).json({ access_token: token });
  } catch (error) {
    console.log(error);
    if (error.name === "SequelizeValidationError") {
      res.status(400).json({ message: error.errors[0].message });
    } else if (error.message === "UserNotFound") {
      res.status(500).json({ message: "Invalid email/password" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

app.post('/loginAdmin', async(req , res)=>{
  try {
    const {email , password} = req.body;
    const user = await Admin.findOne({Where : email});
    if(!user){
      throw { message : "UserNotFound" };
    }
    const passValid = comparePassword(password , user.password);
    if(!passValid){
      throw { message : "UserNotFound"};
    }
    const token = signToken({ id: user.id , email: user.email})
    res.status(200).json({ access_token: token });
  } catch (error) {
    console.log(error);
    if (error.name === "SequelizeValidationError") {
      res.status(400).json({ message: error.errors[0].message });
    } else if (error.message === "UserNotFound") {
      res.status(500).json({ message: "Invalid email/password" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

app.get('/userprofiles/:id', async(req , res)=>{
  try {
    const {id} = req.params
    const data = await UserProfile.findByPk(id);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get('/brands', async(req , res)=>{
  try {
    const brand = await Brand.findAll();
    res.status(200).json(brand)
  } catch (error) {
    console.log(error)
    res.status(500).json({message: "Internal Server Error"})
  }
});

app.post('/brands', async(req,res)=>{
  try {
    console.log(req.body);
    
    const {name , country, logo} = req.body;
    const brand = await Brand.create({name , country , logo})
    console.log(brand);
    res.status(201).json(`Created New Brand ${name}`)
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.put('/brands/:id', async(req,res)=>{
  try {
    const {id} = req.params
    const {country , name, logo} = req.body
    const brand = await Brand.update(
      {country,name, logo},
      {where :{id : id}}
    )
    if(!brand){
      return {message:'NotFound'}
    }
    res.status(200).json({message : "Brand has been Updated"})
  } catch (error) {
    if (error.name === "NotFound") {
      res.status(404).json({ message: "Category Not Found" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

app.delete('/brands/:id' , async(req,res)=>{
  try {
    const {id} = req.params
    const brand = await Brand.findByPk(id)
    if(!brand){
      throw {message : 'NotFound'}
    }
    await Brand.destroy({where :{id}})
    res.status(200).json({message : "Brand Deleted"})
  } catch (error) {
    console.log(error);
  }
});

app.get('/categories', async(req,res)=>{
  try {
    const category = await Category.findAll();
    
    res.status(200).json(category)
  } catch (error) {
    console.log(error)
    res.status(500).json({message: "Internal Server Error"})
  }
});

app.put('/categories/:id', async(req , res)=>{
  try {
    const {id} = req.params
    const {name} = req.body
    const category = await Category.update(
      {name},
      {where: {id:id}}
    )
    if(!category){
      throw {message : 'NotFound'}
    }
    res.status(200).json({ message: "Category has been updated" });
  } catch (error) {
    if (error.name === "NotFound") {
      res.status(404).json({ message: "Category Not Found" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

app.delete('/categories/:id', async(req,res)=>{
  try {
      const {id} = req.params
      const category = await Category.findByPk(id)
      if(!category){
        return {message : 'NotFound'}
      }
      await Category.destroy({where:{id}})
      res.status(200).json({message : "Category Deleted"})
  } catch (error) {
      console.log(error); 
  }
});

app.post('/categories', async(req,res)=>{
  try {
    const {name} = req.body
    const category = Category.create({name})
    res.status(201).json(`Created New Category ${name}`)
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get('/cars', async(req,res)=>{
  try {
    const cars = await Car.findAll({
      include: [
        Brand,
        Category,
        DealerProfile,
        CarARAsset,
        {
          model: Specification,
          include: [
            SpecificationCategory,
            SpecificationField
          ]
        },
        {
          model: Feature,
          include: [FeatureCategory]
        }
      ]
    });
    res.status(200).json(cars)
  } catch (error) {
    console.log(error)
    res.status(500).json({message: "Internal Server Error"})
  }
});

app.get('/cars/:id', async(req,res)=>{
  try {
    console.log("GET ID");
    
    const id = req.params.id
    const car = await Car.findByPk(id, {
      include: [
        Brand,
        Category,
        DealerProfile,
        CarARAsset,
        {
          model: Specification,
          include: [
            SpecificationCategory,
            SpecificationField
          ]
        },
        {
          model: Feature,
          include: [
            FeatureCategory
          ]
        }
      ]
    });
    res.status(200).json(car)
  } catch (error) {
    console.log(error)
    res.status(500).json({message: "Internal Server Error"})
  }
});

app.post('/cars', async(req,res)=>{
  try {
    const {model , brand_id , thumbnail , category_id , price , dealer_id} = req.body;

    const cars = await Car.create({model , brand_id , thumbnail , category_id , price, dealer_id})
    res.status(201).json(`Created New Car ${model}`)
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.put('/cars/:id', async(req, res)=>{
  try {
    const id = req.params.id
    const {model , brand_id , thumbnail , category_id , price, dealer_id} = req.body
    const cars = await Car.update(
      {model , brand_id , thumbnail , category_id , price, dealer_id},
      {where :{id:id}}
    )
    if(!cars){
      throw {message : 'NotFound'}
    }
    res.status(200).json({ message: "Car has been updated" });
  } catch (error) {
    if (error.name === "NotFound") {
      res.status(404).json({ message: "Car Not Found" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

app.delete('/cars/:id' , async(req,res)=>{
  try {
    const {id} = req.params
    const cars = await Car.findByPk(id)

    if(!cars){
      return {message : 'NotFound'}
    }
    await Car.destroy({where : {id}})
    res.status(200).json({message : "Car Deleted"})
  } catch (error) {
    console.log(error);
  }
});

app.get('/specifications' , async(req,res)=>{
  try {
    const specification = await Specification.findAll()
    res.status(200).json(specification)
  } catch (error) {
    res.status(500).json({message: "Internal Server Error"})
  }
});

app.post('/specifications' , async(req,res)=>{
  try {
    const {specificationCategory_id , car_id } = req.body
    console.log(req.body , "BODY");
    
    const specification = await Specification.create({specificationCategory_id , car_id })
    res.status(201).json(specification)
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get('/specifications/:id', async(req,res)=>{
  try {
    const id = req.params.id
    const specifications = await Specification.findOne({
      include: [Car],
      where : {id}
    });
    res.status(200).json(specifications)
  } catch (error) {
    console.log(error)
    res.status(500).json({message: "Internal Server Error"})
  }
});

app.put('/specifications/:id', async(req,res)=>{
  try {
    const {id} = req.params
    const {specificationCategory_id , car_id} = req.body
    const specification = await Specification.update(
      {specificationCategory_id , car_id},
      {where :{id :id}}
    )
    if(!specification){
      throw {message : 'NotFound'}
    }
    res.status(200).json({ message: "Specification has been updated" });
  } catch (error) {
    if (error.name === "NotFound") {
      res.status(404).json({ message: "Car Not Found" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
})

app.delete('/specifications/:id' , async(req , res)=>{
  try {
    const {id} = req.params
    const specification = await Specification.findByPk(id)
    if(!specification){
      return {message : 'NotFound'}
    }
    await Specification.destroy({where : {id}})
    res.status(200).json({message : "Specification Deleted"})
  } catch (error) {
    console.log(error);
  }
});

app.get('/specificationcategories', async(req,res)=>{
  try {
    const specificationcategories = await SpecificationCategory.findAll()
    res.status(200).json(specificationcategories)
  } catch (error) {
    res.status(500).json({message: "Internal Server Error"})
  }
});

app.post('/specificationcategories', async(req,res)=>{
  try {
    const{ name } = req.body
    const specificationcategories= await SpecificationCategory.create({ name })
    res.status(201).json(`Created New Specification Category ${name}`)
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get('/specificationcategories/:id', async(req,res)=>{
  try {
    const id = req.params.id
    const specificationcategories = await SpecificationCategory.findOne({
      include: [Specification],
      where : {id}
    });
    res.status(200).json(specificationcategories)
  } catch (error) {
    console.log(error)
    res.status(500).json({message: "Internal Server Error"})
  }
});

app.put('/specificationcategories/:id', async(req,res)=>{
  try {
    const {id} = req.params
    const { name } = req.body
    const specificationcategories = await SpecificationCategory.update(
      { name },
      {where :{id :id}}
    )
    if(!specificationcategories){
      throw {message : 'NotFound'}
    }
    res.status(200).json({ message: "Specification Category has been updated" });
  } catch (error) {
    if (error.name === "NotFound") {
      res.status(404).json({ message: "Car Not Found" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
})

app.delete('/specificationcategories/:id' , async(req , res)=>{
  try {
    const {id} = req.params
    const specificationcategories = await SpecificationCategory.findByPk(id)
    if(!specificationcategories){
      return {message : 'NotFound'}
    }
    await SpecificationCategory.destroy({where : {id}})
    res.status(200).json({message : "Specification Category Deleted"})
  } catch (error) {
    console.log(error);
  }
});

app.get('/specificationfields', async(req,res)=>{
  try {
    const specificationfields = await SpecificationField.findAll()
    res.status(200).json(specificationfields)
  } catch (error) {
    res.status(500).json({message: "Internal Server Error"})
  }
});

app.post('/specificationfields', async(req,res)=>{
  try {
    console.log( req.body , "SPEC FIELDS BODy");
    
    const{ specification_id , key , value , unit } = req.body
    if (!unit) {
      unit = "N/A";
    }
    const specificationfields= await SpecificationField.create({ specification_id , key , value , unit })
    console.log(specificationfields , "specificationfields");
    
    res.status(201).json({key})
    
  } catch (error) {
    console.log(error , "error");
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get('/specificationfields/:id', async(req,res)=>{
  try {
    const id = req.params.id
    const specificationfields = await SpecificationField.findOne({
      include: [Specification],
      where : {id}
    });
    res.status(200).json(specificationfields)
  } catch (error) {
    console.log(error)
    res.status(500).json({message: "Internal Server Error"})
  }
});

app.put('/specificationfields/:id', async(req,res)=>{
  try {
    const {id} = req.params
    const { specification_id , key , value , unit} = req.body
    const specificationfields = await SpecificationField.update(
      { specification_id , key , value , unit},
      {where :{id :id}}
    )
    if(!specificationfields){
      throw {message : 'NotFound'}
    }
    res.status(200).json({ message: "Specification Field has been updated" });
  } catch (error) {
    if (error.name === "NotFound") {
      res.status(404).json({ message: "Car Not Found" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
})

app.delete('/specificationfields/:id' , async(req , res)=>{
  try {
    const {id} = req.params
    const specificationfields = await SpecificationField.findByPk(id)
    if(!specificationfields){
      return {message : 'NotFound'}
    }
    await SpecificationField.destroy({where : {id}})
    res.status(200).json({message : "Specification Field Deleted"})
  } catch (error) {
    console.log(error);
  }
});

app.get('/featurecategories', async(req,res)=>{
  try {
    const featurecategories = await FeatureCategory.findAll()
    res.status(200).json(featurecategories)
  } catch (error) {
    res.status(500).json({message: "Internal Server Error"})
  }
});

app.post('/featurecategories', async(req,res)=>{
  try {
    console.log(req.body);
    
    const{name ,description, thumbnail} = req.body
    const featurecategories= await FeatureCategory.create({name,description , thumbnail})
    console.log(featurecategories);
    res.status(201).json(`Created New Feature Category ${name}`)
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get('/featurecategories/:id', async(req,res)=>{
  try {
    const id = req.params.id
    const featurecategories = await FeatureCategory.findOne({
      where : {id}
    });
    res.status(200).json(featurecategories)
  } catch (error) {
    console.log(error)
    res.status(500).json({message: "Internal Server Error"})
  }
});

app.put('/featurecategories/:id', async(req,res)=>{
  try {
    const {id} = req.params
    const {name,description , thumbnail} = req.body
    const featurecategories = await FeatureCategory.update(
      {name,description , thumbnail},
      {where :{id :id}}
    )
    if(!featurecategories){
      throw {message : 'NotFound'}
    }
    res.status(200).json({ message: "Feature Category has been updated" });
  } catch (error) {
    if (error.name === "NotFound") {
      res.status(404).json({ message: "Car Not Found" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
})

app.delete('/featurecategories/:id' , async(req , res)=>{
  try {
    const {id} = req.params
    const featurecategories = await FeatureCategory.findByPk(id)
    if(!featurecategories){
      return {message : 'NotFound'}
    }
    await FeatureCategory.destroy({where : {id}})
    res.status(200).json({message : "Feature Category Deleted"})
  } catch (error) {
    console.log(error);
  }
});

app.get('/features', async(req,res)=>{
  try {
    const features = await Feature.findAll()
    res.status(200).json(features)
  } catch (error) {
    res.status(500).json({message: "Internal Server Error"})
  }
});

app.post('/features', async(req,res)=>{
  try {
    console.log("BODY" ,req.body);
    
    const{ car_id , featureCategory_id, name, description , thumbnail} = req.body
    const features= await Feature.create({ car_id , featureCategory_id, name, description , thumbnail})
    console.log("test" ,features);
    res.status(201).json(`Created New Feature ${name}`)
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get('/features/:id', async(req,res)=>{
  try {
    const id = req.params.id
    const features = await Feature.findOne({
      include: [Car],
      where : {id}
    });
    res.status(200).json(features)
  } catch (error) {
    console.log(error)
    res.status(500).json({message: "Internal Server Error"})
  }
});

app.put('/features/:id', async(req,res)=>{
  try {
    const {id} = req.params
    const { car_id , featureCategory_id, name, description , thumbnail} = req.body
    const features = await Feature.update(
      { car_id , featureCategory_id, name, description , thumbnail},
      {where :{id :id}}
    )
    if(!features){
      throw {message : 'NotFound'}
    }
    res.status(200).json({ message: "Feature has been updated" });
  } catch (error) {
    if (error.name === "NotFound") {
      res.status(404).json({ message: "Car Not Found" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
})

app.delete('/features/:id' , async(req , res)=>{
  try {
    const {id} = req.params
    const features = await Feature.findByPk(id)
    if(!features){
      return {message : 'NotFound'}
    }
    await Feature.destroy({where : {id}})
    res.status(200).json({message : "Feature Deleted"})
  } catch (error) {
    console.log(error);
  }
});

app.get('/dealerprofiles', async(req,res)=>{
  try {
    const dealerprofiles = await DealerProfile.findAll({include: {
        model: Brand,
        through: { attributes: [] }
      }
    })
    res.status(200).json(dealerprofiles)
  } catch (error) {
    res.status(500).json({message: "Internal Server Error"})
  }
});

app.post('/dealerprofiles', async(req,res)=>{
  try {
    console.log(req.body);
    const{ shopName ,  type, address , instagramLink , whatsAppLink , brand_id , user_id} = req.body
    const dealerprofiles= await DealerProfile.create({ shopName ,  type, address , instagramLink , whatsAppLink , user_id})
    if (Array.isArray(brand_id) && brand_id.length > 0) {
      await dealerprofiles.setBrands(brand_id);
    }
    res.status(201).json(`Created New Dealer Profile ${shopName}`)
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get('/dealerprofiles/:id', async(req,res)=>{
  try {
    const id = req.params.id
    const dealerprofiles = await DealerProfile.findOne({
      include: [
        {
          model: UserProfile,
        },
        { model: Car, include: [Brand, Category] }
      ],
      where : {id}
    });
    res.status(200).json(dealerprofiles)
  } catch (error) {
    console.log(error)
    res.status(500).json({message: "Internal Server Error"})
  }
});

app.get("/dealerprofilesbrand", async (req, res) => {
  try {
    const userId = req.user.id;

    const dealerProfile = await DealerProfile.findOne({
      where: { user_id: userId },
      include: {
        model: Brand,
        through: { attributes: [] } 
      }
    });

    if (!dealerProfile) {
      return res.status(404).json(null);
    }

    res.status(200).json(dealerProfile);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/dealerprofilesuser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    
    const dealerProfile = await DealerProfile.findOne({
      where: { user_id: id },
      include: {
        model: Brand,
        through: { attributes: [] }
      }
    });

    // return profile OR null
    res.json(dealerProfile);

  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.put('/dealerprofiles/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      shopName,
      type,
      address,
      instagramLink,
      whatsAppLink,
      brand_id
    } = req.body;

    const dealerProfile = await DealerProfile.findByPk(id);

    if (!dealerProfile) {
      throw { name: 'NotFound' };
    }

    await dealerProfile.update({
      shopName,
      type,
      address,
      instagramLink,
      whatsAppLink
    });

    if (Array.isArray(brand_id)) {
      await dealerProfile.setBrands(brand_id);
    }

    res.status(200).json({ message: "Dealer Profile updated" });
  } catch (error) {
    if (error.name === "NotFound") {
      res.status(404).json({ message: "Dealer Profile Not Found" });
    } else {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

app.get('/dealerprofilesbrand/:id', async (req, res) => {
  const dealerProfile = await DealerProfile.findByPk(req.params.id, {
    include: {
      model: Brand,
      through: { attributes: [] }
    }
  });

  res.json(dealerProfile);
});


app.delete('/dealerprofiles/:id' , async(req , res)=>{
  try {
    const {id} = req.params
    const dealerprofiles = await DealerProfile.findByPk(id)
    if(!dealerprofiles){
      return {message : 'NotFound'}
    }
    await DealerProfile.destroy({where : {id}})
    res.status(200).json({message : "Dealer Profile Deleted"})
  } catch (error) {
    console.log(error);
  }
});

app.get('/cararassets', async(req,res)=>{
  try {
    const cararassets = await CarARAsset.findAll()
    res.status(200).json(cararassets)
  } catch (error) {
    res.status(500).json({message: "Internal Server Error"})
  }
});


app.get('/cararassets/:id', async(req,res)=>{
  try {
    const id = req.params.id
    const cararassets = await CarARAsset.findOne({
      where : {id}
    });
    res.status(200).json(cararassets)
  } catch (error) {
    console.log(error)
    res.status(500).json({message: "Internal Server Error"})
  }
});

app.put('/cararassets/:id', async(req,res)=>{
  try {
    const {id} = req.params
    const {car_id ,desktopAsset, mobileAsset} = req.body
    const cararassets = await CarARAsset.update(
      {car_id ,desktopAsset, mobileAsset},
      {where :{id :id}}
    )
    if(!cararassets){
      throw {message : 'NotFound'}
    }
    res.status(200).json({ message: "AR Asset has been updated" });
  } catch (error) {
    if (error.name === "NotFound") {
      res.status(404).json({ message: "AR asset Not Found" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
})

app.delete('/cararassets/:id' , async(req , res)=>{
  try {
    const {id} = req.params
    const cararassets = await CarARAsset.findByPk(id)
    if(!cararassets){
      return {message : 'NotFound'}
    }
    await CarARAsset.destroy({where : {id}})
    res.status(200).json({message : "AR Asset Deleted"})
  } catch (error) {
    console.log(error);
  }
});

const uploadDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log('Created uploads folder');
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage, limits: { fileSize: 50 * 1024 * 1024 } }); // 50 MB per file

app.post(
  "/cararassets",
  upload.fields([
    { name: "desktopAsset", maxCount: 1 },
    { name: "mobileAsset", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const { car_id } = req.body;
      const desktopAsset = req.files.desktopAsset ? req.files.desktopAsset[0].filename : null;
      const mobileAsset = req.files.mobileAsset ? req.files.mobileAsset[0].filename : null;

      const carARAsset = await CarARAsset.create({
        car_id,
        desktopAsset,
        mobileAsset,
      });

      res.status(201).json({ message: "Created New AR Asset", carARAsset });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

app.post('/')