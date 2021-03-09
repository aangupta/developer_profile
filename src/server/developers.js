const express = require('express');
const fetch = require('node-fetch');
const axios = require('axios');

const router = express.Router();
const { devRepos } = require('./developers_data');

/* GET /api/developers */

router.get('/', (req, res) => {
    const usersData = [];
    Object.keys(devRepos).forEach((id) => {
        const user = {
            id:id,
            avatar_url: devRepos[id].avatarUrl,
        };
        usersData.push(user);
    });
    res.status(200).send(usersData);
});

/* POST /api/developers */
						
						
router.post('/', (req, res) => {

    if(!req.body.github_id) {
        res.status(400).json({ error: 'Github_id is required' });
    }
    const uid = req.body.github_id;
    const github_id = req.body.github_id;
    const linkedin_id = req.body.linkedin_id;
    const codechef_id = req.body.codechef_id;
    const hackerrank_id = req.body.hackerrank_id;
    const twitter_id = req.body.twitter_id;
    const medium_id = req.body.medium_id;

    fetch(`https://api.github.com/users/${uid}`)
        .then((response) => response.json())
        .then((json) => {
            const id = json.login;
            const avatarUrl = json.avatar_url;
            const name = json.name;
            const company = json.company;
            const blog = json.blog;
            const location = json.location;
            const email = json.email;
            const bio = json.bio;
            const url = json.repos_url;
            /* console.log(uid);
            const getDeveloperRepos = axios.get(`https://api.github.com/users/${uid}/repos`);
            console.log(getDeveloperRepos.data);
            const repos = getDeveloperRepos.data.map((repo) => {
                return {
                    name: repo.name,
                    html_url: repo.html_url,
                    description: repo.description,
                    updated_at: repo.updated_at,
                  };
            }); */


            fetch(`https://api.github.com/users/${uid}/repos`)
                .then((response1) => response1.json())
                .then((data) => {
                    const repos = data.map((element) => {
                        return {
                            name: element.name,
                            html_url: element.owner.html_url,
                            description: element.description,
                            updated_at: element.updated_at,
                        };
                    });
                    devRepos[uid] = {repos};
                
                }); 
              
            if (req.body.github_id === json.login) {
                devRepos[uid] = {id,avatarUrl,name,company, blog,location,email,bio};
                console.log(devRepos[uid]);
                res.status(201).send({ id: req.body.github_id });
            } else {
                res.status(400).send('GitHub username is invalid');
            }
        });
});

/* GET /api/developers/:id */

router.get('/:id', (req, res) => {
    Object.keys(devRepos).forEach((element) => {
        /* console.log(`github id ${element.github_id}    request param ${req.params.id}`); */
        if (element.github_id === req.params.id) {
            /* console.log('Hi there'); */
            res.status(200).send((element));
        }
    });

    res.status(404).send('User does not exist');
});

/* DELETE /api/developers/:id */

router.delete('/:id', (req, res) => {
    let i = 0;
    while (i < devRepos.length) {
        const user = devRepos[i];
        if (user.id === req.params.id) {
            devRepos.splice(i, 1);
            res.status(204).send('Deleted');
        }
        i += 1;
    }
    res.status(404).send('User does not exist');
});

module.exports = router;
