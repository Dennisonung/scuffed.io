module.exports = {
    name: 'WebUI',
    description: 'WebUI Module for clients.',
    ErrorCodeRange: 110,
    run: function (app, path, R2, io, fs, transporter, sha512) {
        app.get('/Join', (req, res) => {
            res.sendFile(path.join(__dirname, '../html/Client.html'));
        })
    }
}    