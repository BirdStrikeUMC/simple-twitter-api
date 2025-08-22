const express = require('express')
const fs = require('fs/promises')

const app = express()
const PORT = 3000
const DATA_FILE = 'posts.json'

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

app.listen(PORT, () => {
    console.log(`Executando na porta ${PORT}`)
})