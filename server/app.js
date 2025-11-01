const express = require('express')
const app = express()
const port = 3000
const cors = require("cors");
const {  Brand, Category, Car, Specification, Design, Technology, Performance, Accessories, Gallery, UserProfile, DealerProfile, Admin } = require('./models');
const { comparePassword } = require('./helpers/bcrypt');
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
    const user = UserProfile.findOne({Where : email});
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

app.get('/users', async(req , res)=>{
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
    const category = Category.findAll()
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
      const category = Category.findByPk(id)
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
    const cars = Car.findAll();
    res.status(200).json(cars)
  } catch (error) {
    console.log(error)
    res.status(500).json({message: "Internal Server Error"})
  }
});

app.get('/cars/:id', async(req,res)=>{
  try {
    const id = req.params.id
    const cars = Car.findOne({
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
    const {model , brand_id , thumbnail , category_id , price} = req.body;
    const cars = Car.create({model , brand_id , thumbnail , category_id , price})
    res.status(201).json(`Created New Car ${model}`)
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.put('/cars/:id', async(req, res)=>{
  try {
    const id = req.params.id
    const {model , brand_id , thumbnail , category_id , price} = req.body
    const cars = await Car.update(
      {model , brand_id , thumbnail , category_id , price},
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
    const specification = Specification.findAll()
    res.status(200).json(specification)
  } catch (error) {
    res.status(500).json({message: "Internal Server Error"})
  }
});

app.post('/specifications' , async(req,res)=>{
  try {
    const {car_id , description , exterior_desc , interior_desc , engine_desc, safety_desc} = req.body
    const specification = Specification.create({car_id , description , exterior_desc , interior_desc , engine_desc, safety_desc})
    res.status(201).json(`Created New Specification for Car id: ${car_id}`)
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get('/specifications/:id', async(req,res)=>{
  try {
    const id = req.params.id
    const specifications = Specification.findOne({
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
    const {car_id , description , exterior_desc , interior_desc , engine_desc, safety_desc} = req.body
    const specification = Specification.update(
      {car_id , description , exterior_desc , interior_desc , engine_desc, safety_desc},
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
    const specification = Specification.findByPk(id)
    if(!specification){
      return {message : 'NotFound'}
    }
    await Specification.destroy({where : {id}})
    res.status(200).json({message : "Specification Deleted"})
  } catch (error) {
    console.log(error);
  }
});

app.get('/design', async(req,res)=>{
  try {
    const design = Design.findALl()
    res.status(200).json(design)
  } catch (error) {
    res.status(500).json({message: "Internal Server Error"})
  }
});

app.post('/design', async(req,res)=>{
  try {
    const{ specification_id , name , color} = req.body
    const design= await Design.Create({ specification_id , name , color})
    res.status(201).json(`Created New Design ${name}`)
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get('/design/:id', async(req,res)=>{
  try {
    const id = req.params.id
    const design = Design.findOne({
      include: [Specification],
      where : {id}
    });
    res.status(200).json(design)
  } catch (error) {
    console.log(error)
    res.status(500).json({message: "Internal Server Error"})
  }
});

app.put('/design/:id', async(req,res)=>{
  try {
    const {id} = req.params
    const { specification_id , name , color} = req.body
    const design = Design.update(
      { specification_id , name , color},
      {where :{id :id}}
    )
    if(!design){
      throw {message : 'NotFound'}
    }
    res.status(200).json({ message: "Design has been updated" });
  } catch (error) {
    if (error.name === "NotFound") {
      res.status(404).json({ message: "Car Not Found" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
})

app.delete('/design/:id' , async(req , res)=>{
  try {
    const {id} = req.params
    const design = Design.findByPk(id)
    if(!design){
      return {message : 'NotFound'}
    }
    await Design.destroy({where : {id}})
    res.status(200).json({message : "Design Deleted"})
  } catch (error) {
    console.log(error);
  }
});

app.get('/technology', async(req,res)=>{
  try {
    const technology = Technology.findALl()
    res.status(200).json(technology)
  } catch (error) {
    res.status(500).json({message: "Internal Server Error"})
  }
});

app.post('/technology', async(req,res)=>{
  try {
    const{ specification_id , name , thumbnail} = req.body
    const technology= await technology.create({ specification_id , name , thumbnail})
    res.status(201).json(`Created New technology ${name}`)
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get('/technology/:id', async(req,res)=>{
  try {
    const id = req.params.id
    const technology = Technology.findOne({
      include: [Specification],
      where : {id}
    });
    res.status(200).json(technology)
  } catch (error) {
    console.log(error)
    res.status(500).json({message: "Internal Server Error"})
  }
});

app.put('/technology/:id', async(req,res)=>{
  try {
    const {id} = req.params
    const { specification_id , name , thumbnail} = req.body
    const technology = Technology.update(
      { specification_id , name , thumbnail},
      {where :{id :id}}
    )
    if(!technology){
      throw {message : 'NotFound'}
    }
    res.status(200).json({ message: "technology has been updated" });
  } catch (error) {
    if (error.name === "NotFound") {
      res.status(404).json({ message: "Car Not Found" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
})

app.delete('/technology/:id' , async(req , res)=>{
  try {
    const {id} = req.params
    const technology = Technology.findByPk(id)
    if(!technology){
      return {message : 'NotFound'}
    }
    await Technology.destroy({where : {id}})
    res.status(200).json({message : "technology Deleted"})
  } catch (error) {
    console.log(error);
  }
});

app.get('/performance', async(req,res)=>{
  try {
    const performance = Performance.findALl()
    res.status(200).json(performance)
  } catch (error) {
    res.status(500).json({message: "Internal Server Error"})
  }
});

app.post('/performance', async(req,res)=>{
  try {
    const{ specification_id , name , thumbnail} = req.body
    const performance= await Performance.create({ specification_id , name , thumbnail})
    res.status(201).json(`Created New performance ${name}`)
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get('/performance/:id', async(req,res)=>{
  try {
    const id = req.params.id
    const performance = Performance.findOne({
      include: [Specification],
      where : {id}
    });
    res.status(200).json(performance)
  } catch (error) {
    console.log(error)
    res.status(500).json({message: "Internal Server Error"})
  }
});

app.put('/performance/:id', async(req,res)=>{
  try {
    const {id} = req.params
    const { specification_id , name , thumbnail} = req.body
    const performance = Performance.update(
      { specification_id , name , thumbnail},
      {where :{id :id}}
    )
    if(!performance){
      throw {message : 'NotFound'}
    }
    res.status(200).json({ message: "performance has been updated" });
  } catch (error) {
    if (error.name === "NotFound") {
      res.status(404).json({ message: "Car Not Found" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
})

app.delete('/performance/:id' , async(req , res)=>{
  try {
    const {id} = req.params
    const performance = Performance.findByPk(id)
    if(!performance){
      return {message : 'NotFound'}
    }
    await Performance.destroy({where : {id}})
    res.status(200).json({message : "performance Deleted"})
  } catch (error) {
    console.log(error);
  }
});

app.get('/accessories', async(req,res)=>{
  try {
    const accessories = Accessories.findALl()
    res.status(200).json(accessories)
  } catch (error) {
    res.status(500).json({message: "Internal Server Error"})
  }
});

app.post('/accessories', async(req,res)=>{
  try {
    const{ specification_id , name , thumbnail} = req.body
    const accessories= await Accessories.Create({ specification_id , name , thumbnail})
    res.status(201).json(`Created New accessories ${name}`)
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get('/accessories/:id', async(req,res)=>{
  try {
    const id = req.params.id
    const accessories = Accessories.findOne({
      include: [Specification],
      where : {id}
    });
    res.status(200).json(accessories)
  } catch (error) {
    console.log(error)
    res.status(500).json({message: "Internal Server Error"})
  }
});

app.put('/accessories/:id', async(req,res)=>{
  try {
    const {id} = req.params
    const { specification_id , name , thumbnail} = req.body
    const accessories = Accessories.update(
      { specification_id , name , thumbnail},
      {where :{id :id}}
    )
    if(!accessories){
      throw {message : 'NotFound'}
    }
    res.status(200).json({ message: "accessories has been updated" });
  } catch (error) {
    if (error.name === "NotFound") {
      res.status(404).json({ message: "Car Not Found" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
})

app.delete('/accessories/:id' , async(req , res)=>{
  try {
    const {id} = req.params
    const accessories = Accessories.findByPk(id)
    if(!accessories){
      return {message : 'NotFound'}
    }
    await Accessories.destroy({where : {id}})
    res.status(200).json({message : "accessories Deleted"})
  } catch (error) {
    console.log(error);
  }
});

app.get('/gallery', async(req,res)=>{
  try {
    const gallery = Gallery.findALl()
    res.status(200).json(gallery)
  } catch (error) {
    res.status(500).json({message: "Internal Server Error"})
  }
});

app.post('/gallery', async(req,res)=>{
  try {
    const{ specification_id , exterior_images , interior_images} = req.body
    const gallery= await Gallery.create({ specification_id , exterior_images , interior_images})
    res.status(201).json(`Created New gallery ${name}`)
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get('/gallery/:id', async(req,res)=>{
  try {
    const id = req.params.id
    const gallery = Gallery.findOne({
      include: [Specification],
      where : {id}
    });
    res.status(200).json(gallery)
  } catch (error) {
    console.log(error)
    res.status(500).json({message: "Internal Server Error"})
  }
});

app.put('/gallery/:id', async(req,res)=>{
  try {
    const {id} = req.params
    const { specification_id , exterior_images , interior_images} = req.body
    const gallery = Gallery.update(
      { specification_id , exterior_images , interior_images},
      {where :{id :id}}
    )
    if(!gallery){
      throw {message : 'NotFound'}
    }
    res.status(200).json({ message: "gallery has been updated" });
  } catch (error) {
    if (error.name === "NotFound") {
      res.status(404).json({ message: "Car Not Found" });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
})

app.delete('/gallery/:id' , async(req , res)=>{
  try {
    const {id} = req.params
    const gallery = Gallery.findByPk(id)
    if(!gallery){
      return {message : 'NotFound'}
    }
    await Gallery.destroy({where : {id}})
    res.status(200).json({message : "gallery Deleted"})
  } catch (error) {
    console.log(error);
  }
});

app.post('/')