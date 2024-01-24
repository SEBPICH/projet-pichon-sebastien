const database = require('../models'); // Import your Sequelize instances
const { Sequelize } = require('sequelize');
const Catalogue = database.catalogue;


exports.get = async (req, res) => {
	try {
	  res.setHeader('Content-Type', 'application/json');
  
	  const searchTerm = req.query.searchTerm || ''; // Default to an empty string if not provided
  
	  if (searchTerm !== '') {
		const products = await Catalogue.findAll({
		  where: {
			[Sequelize.Op.or]: [
			  Sequelize.literal(`LOWER(name) LIKE '%${searchTerm.toLowerCase()}%'`),
			  Sequelize.literal(`LOWER(description) LIKE '%${searchTerm.toLowerCase()}%'`),
			],
		  },
		});
  
		res.json(products);
	  } else {
		const products = await Catalogue.findAll();
		res.json(products);
	  }
	} catch (err) {
	  console.error('Error executing query', err);
	  res.status(500).json({ error: 'Internal Server Error' });
	}
  };
  