const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs/promises')

const app = express()
const PORT = 3000
const DATA_FILE = 'posts.json'

app.use(bodyParser.json())
app.use(async (req, res, next) => {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        req.posts = JSON.parse(data)
    } catch (error) {
        req.posts = [];
    }
    next();
})

app.get('/api/posts', (req, res) => {
    const posts = req.posts;
    console.log(posts)
    res.json(posts)
})

app.post('/api/posts', (req, res) => {
    const newPost = req.body;
    newPost.id = Date.now().toString();
    console.log(req.body)

    req.posts.push(newPost);
    fs.writeFile(DATA_FILE, JSON.stringify(req.posts, null, 2))
        .then(() => res.json(newPost))
        .catch((error) => res.status(500).json({error: 'Ocorreu um erro ao tentar salvar o arquivo'}))
})

app.listen(PORT, () => {
    console.log(`Executando na porta ${PORT}`)
})