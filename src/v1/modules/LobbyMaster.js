const { Config } = require("aws-sdk")

module.exports = {
    name: 'LobbyMaster',
    description: 'To manage lobbies.',
    run: function (app, path, R2, io, fs, transporter, sha512, GetQuiz) {
        const useLocalStorage = Config.GetQuizLocal
        const LocalStoragePath = Config.LocalStoragePath

        function R2GetQuiz() {
            return "R2TypeBeat"
        }
        function LocalGetQuiz() {
            return "LocalTypeBeat"
        }
        app.post('/V1/GetQuiz', (req, res) => {
            let QuizInfo;
            !useLocalStorage ? QuizInfo = R2GetQuiz(req.body.quizID) : QuizInfo = LocalGetQuiz(req.body.quizID);
        })
        app.post('/V1/JoinLobby', (req, res) => {
            if (!fs.existsSync(`../../../data/Lobbies/${req.body.LobbyCode}.json`)) res.status(400).send({"ErrCode":201,"ErrMsg":"Lobby does not exist"});
            fs.readFileSync(`../../../data/Lobbies/${req.body.LobbyCode}.json`, "utf8", (err, data) => {
                if (err) {console.error(err); res.status(400).send({"ErrCode":202,"ErrMsg":"Something went wrong..."});}
                let LobbyData = JSON.parse(data);
                //get lobby players count
                if (LobbyData.Players.Length > Config.MaxUsersPerLobby) res.status(400).send({"ErrCode":203,"ErrMsg":"Lobby is full!"})
                LobbyData.Players.Waiting++
                fs.writeFileSync(`../../../data/Lobbies/${req.body.LobbyCode}.json`, JSON.stringify(LobbyData), "utf8", (err) => {
                    if (err) {console.error(err); res.status(400).send({"ErrCode":204,"ErrMsg":"Something went wrong..."});}
                })
                res.status(200).send({"ErrCode":0,"ErrMsg":"Success","LobbyName":LobbyData.Name});
            })
        })
        app.post('/V1/JoinLobby/UsernameEnter', (req, res) => {
            if (!fs.existsSync(`../../../data/Lobbies/${req.body.LobbyCode}.json`)) res.status(400).send({"ErrCode":201,"ErrMsg":"Lobby does not exist"});
            fs.readFileSync(`../../../data/Lobbies/${req.body.LobbyCode}.json`, "utf8", (err, data) => {
                if (err) {console.error(err); res.status(400).send({"ErrCode":202,"ErrMsg":"Something went wrong..."});}
                let LobbyData = JSON.parse(data);
                //get lobby players count
                if (LobbyData.Players.Length > Config.MaxUsersPerLobby) res.status(400).send({"ErrCode":203,"ErrMsg":"Lobby is full!"})
                res.status(200).send({"ErrCode":0,"ErrMsg":"Success","LobbyName":LobbyData.Name});
            })
        })
    }
}    