const express = require('express')
const app = express()
const port = 3000
const cors = require("cors");
const {  Brand, Category, Car, Specification, SpecificationCategory, SpecificationField, FeatureCategory, Feature, UserProfile, DealerProfile, Admin } = require('./models');
const { comparePassword } = require('./helpers/bcrypt');
const { signToken } = require("./helpers/jwt");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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
    const user = Admin.findOne({Where : email});
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

app.get('/userprofiles', async(req , res)=>{
  try {
    const data = await UserProfile.findByPk(req.user.id);
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
    const cars = await Car.findAll();
    res.status(200).json(cars)
  } catch (error) {
    console.log(error)
    res.status(500).json({message: "Internal Server Error"})
  }
});

app.get('/cars/:id', async(req,res)=>{
  try {
    const id = req.params.id
    const cars = await Car.findOne({
      include: [Brand , Category],
      where : {id}
    });
    res.status(200).json(cars)
  } catch (error) {
    console.log(error)
    res.status(500).json({message: "Internal Server Error"})
  }
});

app.post('/cars', async(req,res)=>{
  try {
    const {model , brand_id , thumbnail , category_id , price , dealer_id} = req.body;

    const userId = req.user.id;

    const dealerProfile = await DealerProfile.findOne({
      where: { user_id: userId }
    });

    if (!dealerProfile) {
      return res.status(403).json({
        message: "You must have a DealerProfile to create a car"
      });
    }

    const cars = await Car.create({model , brand_id , thumbnail , category_id , price, dealer_id:dealerProfile.id})
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
    const specification = await Specification.create({specificationCategory_id , car_id })
    res.status(201).json(`Created New Specification for Car id: ${car_id}`)
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
    const specificationcategories = await SpecificationCategory.findALl()
    res.status(200).json(specificationcategories)
  } catch (error) {
    res.status(500).json({message: "Internal Server Error"})
  }
});

app.post('/specificationcategories', async(req,res)=>{
  try {
    const{ name } = req.body
    const specificationcategories= await SpecificationCategory.Create({ name })
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
    const specificationfields = await SpecificationField.findALl()
    res.status(200).json(specificationfields)
  } catch (error) {
    res.status(500).json({message: "Internal Server Error"})
  }
});

app.post('/specificationfields', async(req,res)=>{
  try {
    const{ specification_id , key , value , unit } = req.body
    const specificationfields= await SpecificationField.create({ specification_id , key , value , unit })
    res.status(201).json(`Created New Specification Field ${key}`)
  } catch (error) {
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
    const{name ,description, thumbnail} = req.body
    const featurecategories= await FeatureCategory.create({name,description , thumbnail})
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
    const features = await Feature.findALl()
    res.status(200).json(features)
  } catch (error) {
    res.status(500).json({message: "Internal Server Error"})
  }
});

app.post('/features', async(req,res)=>{
  try {
    const{ specification_id , featureCategory_id, name, description , thumbnail} = req.body
    const features= await Feature.Create({ specification_id , featureCategory_id, name, description , thumbnail})
    res.status(201).json(`Created New Feature ${name}`)
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get('/features/:id', async(req,res)=>{
  try {
    const id = req.params.id
    const features = await Feature.findOne({
      include: [Specification],
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
    const { specification_id , featureCategory_id, name, description , thumbnail} = req.body
    const features = await Feature.update(
      { specification_id , featureCategory_id, name, description , thumbnail},
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


app.post('/')