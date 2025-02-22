/*
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * npx sequelize-cli model:generate --name User --attributes username:string,email:string,password:string,role:string
 * npx sequelize-cli model:generate --name Brand --attributes name:string,country:string
 * npx sequelize-cli model:generate --name Category --attributes name:string
 * npx sequelize-cli model:generate --name Car --attributes model:string,brand_id:integer,thumbnail:string,category_id:integer,price:integer
 * npx sequelize-cli model:generate --name Specification --attributes car_id:integer,description:string,exterior_desc:string,interior_desc:string,engine_desc:string,safety_desc:string
 * npx sequelize-cli model:generate --name Design --attributes specification_id:integer,name:string,color:string
 * npx sequelize-cli model:generate --name Technology --attributes specification_id:integer,name:string,thumbnail:string
 * npx sequelize-cli model:generate --name Performance --attributes specification_id:integer,name:string,thumbnail:string
 * npx sequelize-cli model:generate --name Accessories --attributes specification_id:integer,name:string,thumbnail:string
 * npx sequelize-cli model:generate --name Gallery --attributes specification_id:integer,exterior_images:string,interior_images:string
 *
 */