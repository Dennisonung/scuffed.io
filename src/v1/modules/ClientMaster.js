module.exports = {
    name: 'ClientMaster',
    description: 'To manage users.',
    ErrorCodeRange: 200,
    run: function (app, path, R2, io, fs, transporter, sha512, GetQuiz) {
        app.post('/V1/JoinLobby', (req, res) => {
            console.log(req.body)
            if (fs.existsSync(`./data/lobbies/${req.body.LobbyPin}.json`) === false) return res.status(200).send({"ErrCode":201,"ErrMsg":"Lobby does not exist"});
            let LobbyData;
            try {LobbyData = JSON.parse(fs.readFileSync(`./data/lobbies/${req.body.LobbyPin}.json`, "utf8"))} 
            catch (err) {return res.status(202).send({"ErrCode":202,"ErrMsg":"Smothing went wrong..."})}
            if (LobbyData.Players.Length > Config.MaxUsersPerLobby) res.status(202).send({"ErrCode":203,"ErrMsg":"Lobby is full!"})
            LobbyData.Players.Waiting++
            fs.writeFileSync(`./data/lobbies/${req.body.LobbyPin}.json`, JSON.stringify(LobbyData), "utf8", (err) => {
                if (err) {console.error(err); res.status(202).send({"ErrCode":204,"ErrMsg":"Something went wrong..."});}
            })
            res.cookie('LobbyPin', req.body.LobbyPin, {maxAge: 900000, httpOnly: true});
            res.status(202).send({"ErrCode":0,"ErrMsg":"Success","LobbyName":LobbyData.Name});
        })
        app.post('/V1/JoinLobby/UsernameEnter', (req, res) => {
            if (fs.existsSync(`./data/lobbies/${req.cookies.LobbyPin}.json`) === false) return res.status(200).send({"ErrCode":201,"ErrMsg":"Lobby does not exist"});
            })
    }
}    