module.exports = {
    name: 'WebUI',
    description: 'WebUI Module. For Quiz hosters and general users.',
    run: function (app, path, R2, io, fs, transporter, sha512) {
        app.get('/favicon.ico', (req,res) => {
            res.sendFile(path.join(__dirname, '../res/favicon.ico'))
        })
        app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, '../html/index.html'));
        })
        app.get('/Lobby', (req, res) => {
            const QuizID = req.query.QuizID;
            res.send(qwe);

        })
    }
}    