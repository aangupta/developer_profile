const path = require('path');
const axios = require('axios');

const fs = require('fs').promises;

const dataPath = path.join(__dirname, '..', 'data', 'developersProfile.json');

exports.addDeveloperProfile = async (req,res) => {
    const devProfile = req.body;
    console.log(devProfile);
    try {
        if(!devProfile.github_id){
            return res.status(400).json({ error: 'Github_id is required' });
        }
        const userData = await axios.get(`https://api.github.com/users/${devProfile.github_id}`);
        const userDataRepos = await axios.get(`https://api.github.com/users/${devProfile.github_id}/repos`);

        const repos = userDataRepos.data.map((repo) => {
            return {
                name: repo.name,
                html_url: repo.html_url,
                description: repo.description,
                updated_at: repo.updated_at,
            };
        });
        const developerProfileData = {
            id: userData.data.login,
            avatar_url: userData.data.avatar_url,
            name: userData.data.name,
            company: userData.data.company,
            blog: userData.data.blog,
            location: userData.data.location,
            email: userData.data.email ?? devProfile.email,
            bio: userData.data.bio,
            github_id: userData.data.login,
            linkedin_id: devProfile.linkedin_id,
            codechef_id: devProfile.codechef_id,
            hackerrank_id: devProfile.hackerrank_id,
            twitter_id: devProfile.twitter_id,
            medium_id: devProfile.medium_id,
            repos,
        }

        const developersData = JSON.parse(await fs.readFile(dataPath, 'utf-8'));
        console.log(developersData);
        const developerValue = developersData.find((x) => x.id === developerProfileData.github_id);
        if(!developerValue){
            const newData = [...developersData, developerProfileData];
            await fs.writeFile(dataPath, JSON.stringify(newData), 'utf-8');     
        } else {
            const developerIdx = developersData.indexOf(developerValue);
            if(developerIdx > -1) 
                developersData.splice(developerIdx, 1);
            developersData.push(developerProfileData);
            await fs.writeFile(dataPath, JSON.stringify(developersData),'utf-8');
        }
        return res.status(201).json({ message: 'Developer added successfully' });
            
    } catch (error){
        console.log(error);
        return res.status(404).json({ error: 'Github id not found' });

    }
};

exports.getDevelopers = async (req,res) => {
    try{

        const developersData = JSON.parse(await fs.readFile(dataPath, 'utf-8'));
        const developers = developersData.map((dev) => {
            return{
                id: dev.id,
                avatar_url: dev.avatar_url,
            };
        });
        return res.status(200).json(developers);

    } catch(error){
        console.log(error);
        return res.status(500).json({ error: 'Something went wrong' });
    }

} 

exports.getDeveloperProfile = async (req,res) => {
    const { id } = req.params;
    try{
        const developersData = JSON.parse(await fs.readFile(dataPath,'utf-8'));
        const developerProfile = developersData.find((x) => x.id === id);

        if(!developerProfile)
            return res.status(400).json({error: 'Developer Profile not found'}); 
        
        return res.status(200).json(developerProfile);

    } catch(error) {
        console.log(error);
        return  res.status(500).json({ error: 'Something went wrong!' });

    }
}

exports.searchDeveloperProfile = async (req,res) => {
    const { id } = req.params;

    try{
        const developersData = JSON.parse(await fs.readFile(dataPath,'utf-8'));
        const developerProfile = developersData.find((x) => x.id === id);
        if(!developerProfile)
            return res.status(400).json([]);
        
        const developer = [
            {
                id:developerProfile.id,
                avatar_url:developerProfile.avatar_url,
            }
        ];

        return res.status(200).json(developer);

    } catch(error) {
        console.log(error);
        return  res.status(500).json({ error: 'Something went wrong!' });
    }
}

exports.deleteDeveloperProfile = async (req,res) => {
    const {id} = req.params;
    try{
        const developersData = JSON.parse(await fs.readFile(dataPath,'utf-8'));
        const developerProfile = developersData.find((x) => x.id === id);
        if(!developerProfile)
            return res.status(400).json({error: 'Github id not found'});
        
        const developerIdx = developersData.indexOf(developerProfile);
        if(developerIdx > -1) developersData.splice(developerIdx,1);

        await fs.writeFile(dataPath, JSON.stringify(developersData), 'utf-8');
        return res.status(204).json({ message: 'Developer profile deleted successfully' });

    } catch(error){
        console.log(error);
        return  res.status(500).json({ error: 'Something went wrong!' });
    }
}