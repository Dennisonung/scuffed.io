module.exports = {
    name: 'DeveloperMode',
    description: 'ONLY IN DEVMODE.',
    ErrorCodeRange: 690,
    run: function (app, path, R2, io, fs, transporter, sha512, GetQuiz) {
        app.get('/Developer', (req,res) => {
            res.sendFile(path.join(__dirname, '../html/DeveloperTest.html'))
        })
    }
}    