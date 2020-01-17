const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

// Index, Show, Store, Update, Destroy

module.exports = {
    async index(request, response){
        const devs = await Dev.find();
        return response.json(devs);
    },
    async store(request, response) {
        const {github_username, techs, latitude, longitude} = request.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev){
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
        
            let {name = login, avatar_url, bio} = apiResponse.data;
        
            const techsArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],  
            }
        
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            })
        }
    
        return response.json(dev);
    },
    async update(request, response) {
        const {id, name, avatar_url, techs, bio, latitude, longitude} = request.body;
  
            const techsArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],  
            }
        
            var query = { _id: id };
            dev = await Dev.update(query,{
                name,
                avatar_url,
                techs: techsArray,
                bio,
                location,
            })

        return response.json(dev);
    },
    async destroy(request, response) {
        const {id} = request.params.id;
        
        dev = await Dev.findOneAndRemove({ id });
    
        return response.json(dev);
    }
};