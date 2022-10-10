module.exports = {
    name: 'LobbyMaster',
    description: 'To manage lobbies.',
    ErrorCodeRange: 200,
    run: function (app, path, R2, io, fs, transporter, sha512, GetQuiz) {
        app.get('/V1/Lobby', (req, res) => {
            res.send('LobbyMaster');
        })
    }
}    