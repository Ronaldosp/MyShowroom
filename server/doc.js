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
 * npx sequelize-cli model:generate --name UserProfile --attributes username:string,email:string,password:string,role:string,dealerProfile_id:integer
 * 
 * npx sequelize-cli model:generate --name Admin --attributes username:string,email:string,password:string
 * 
 * npx sequelize-cli model:generate --name DealerProfile --attributes shopName:string,car_id:integer,type:string,address:string,instagramLink:string,whatsAppLink:string,brand_id:integer,user_id:integer
 * 
 * 
 * npx sequelize-cli model:generate --name Brand --attributes name:string,country:string,logo:string
 * npx sequelize-cli model:generate --name Category --attributes name:string
 * npx sequelize-cli model:generate --name Car --attributes model:string,brand_id:integer,thumbnail:string,category_id:integer,price:integer,dealer_id:integer
 * 
 * 
 * npx sequelize-cli model:generate --name SpecificationCategory --attributes name:string
 * npx sequelize-cli model:generate --name Specification --attributes specificationCategory_id:integer,car_id:integer
 * npx sequelize-cli model:generate --name SpecificationField --attributes specification_id:integer,key:string,value:string,unit:string

 *npx sequelize-cli model:generate --name FeatureCategory --attributes name:string,description:string
* npx sequelize-cli model:generate --name Feature --attributes id:integer,specification_id:integer,featureCategory_id:integer,name:string,description:string,thumbnail:string
 */