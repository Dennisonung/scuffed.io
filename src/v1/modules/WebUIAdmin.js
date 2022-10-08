module.exports = {
    name: 'WebUI',
    description: 'WebUI Module for Admins.',
    run: function (app, path, R2, io, fs, transporter, sha512) {
        app.get('/Admin', (req, res) => {
            res.send('test of webui of scuffed.io');
        })
    }
}    