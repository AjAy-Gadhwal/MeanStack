const seeder = require('mongoose-seed');
const config = require('./../config/config');

const Admin = require('./Admin.json');
      
var data = [
  Admin
]; 

seeder.connect(config.database, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, function() {
 
  seeder.loadModels([
    'models/AdminModel.js',    
  ]);
 
  try {
    seeder.clearModels(['Admin'], function() {
      seeder.populateModels(data, function() {
        seeder.disconnect();
      }); 
    });
  } catch (error) {
    console.log(error);    
  }  
});
 