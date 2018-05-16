/* Require documents */
const Discord = require('discord.js');
const Low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const Ytdl = require('ytdl-core');
const ffpem = require('ffmpeg');

/* Initialisation bdd */
const adapter_blague = new FileSync('blaguedb.json');
const blaguedb = Low(adapter_blague);

blaguedb.defaults({ blague : [], count: 1 })
    .write();

const adapter_user = new FileSync('usderdb.json');
const userdb = Low(adapter_user);
    
userdb.defaults({ user : [], count: 1 })
        .write();
/* Objet bot */
var bot = new Discord.Client();

/* Déclaration des variables */ 
var prefix = ("$");
var randnum = 0;
var servers = {};

/* Connexion du bot */
bot.login(process.env.TOKEN);

/* Action bot démarrage*/
bot.on('ready', () => {
    bot.user.setPresence({ game: { name: prefix + 'help', type:0}})
    console.log('Bot connecter !');
});

/* Réception d'un action */
bot.on('message', message => {

    /* Test ping*/
    if (message.content === 'ping') {
        console.log('Test du ping');    
        message.reply('pong');  
    }

    /* Comment vas-tu bot ? */

    if (message.content === 'Comment vas-tu bot ?') {

        random(1,3);

        if (randnum == 1) {
            message.reply('Bien et toi ?');
        }
        if (randnum == 2) {
            message.reply('Et tu t\'es pris pour qui tu me parle mieux !!');
        }
        if (randnum == 3) {
            message.reply('J\'ai la diarée en ce moment :poop: :neutral_face: ');
        }
        
    }

    /* Analyse du message */
    if (!message.content.startsWith(prefix)) return;
    var args = message.content.substring(prefix.length).split(" ");
    console.log('Réception du message, analyse ...');

    switch (args[0].toLowerCase()) {

        /* Ajout d'un nouvelle blague dans la bdd*/
        case "newblague":
            console.log('Nouvelle blague détectée');

            var value = message.content.substring(11);

            message.reply('Ajout de l\'blague a la base de données');

            blaguedb.update('count', n => n + 1)
                .write()

            blaguedb.get('blague')
                .push({id : blaguedb.get('count').value(),story_value : value})
                .write();
        break;

        /* Affichage d'une blague */
        case "blague":
        console.log('affichage d\'une blague');
        var storynumber = blaguedb.get('blague').map('story_value').value();
        random(0,blaguedb.get('count').value());
        var blague_emnled = new Discord.RichEmbed()
            .setColor('#00ff21')
            .addField('Voici une blague : ', `${storynumber[randnum]}`)
            .setFooter('Bot by MrDocar')
        message.channel.send(blague_emnled);
        break;

        /* Réponse du help*/
        case "help": 
        console.log('help demandée');
            var help_embed = new Discord.RichEmbed()
                .setColor('#ffb600')
                .addField('Music', '     - '+prefix+'play [lien YT] : Joue la musique (et la mes en en attente si une est deja en cour) \n- '+prefix+'skip : Passe a la musique suivante \n- '+prefix+'stop : Fin de la musique')
                .addField('Commandes du bot', '     - '+prefix+'help : Affiches mes commandes \n- '+prefix+'newblague [blague] : Ajoute une blague a mon intelligence \n- '+prefix+'blague : Je te raconte une blague')
                .addField('Interaction', '     - ping : test la connexion du bot')
                .setFooter('by MrDocar')
            message.channel.send(help_embed);
            break;
        case "play":
        console.log('Début de la musique');

            if (!args[1]) {
                message.channel.send('Je ne peux pas jouer de la musique si tu me donne pas de lien :expressionless: !');
                return;
            }

            if (!message.member.voiceChannel) {
                message.channel.send('Je ne peux pas jouer de la musique si tu n\'est pas un channel !');
                return;
            }
            
            if (!servers[message.guild.id]) servers[message.guild.id] = {
                queue: []
            }

            var server = servers[message.guild.id];

            server.queue.push(args[1]);

            if (!message.guild.voiceConnection)message.member.voiceChannel.join().then(function(connection) {
                play(connection, message)
            });
        break;

        case "skip":
        console.log('skip de la musique');
            var server = servers[message.guild.id];

            if (server.dispatcher) server.dispatcher.end();

        break;

        case "stop":
        console.log('Fin de la musique');

            var server = servers[message.guild.id];

            if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
        break;

        case "stop":
            var server = servers[message.guild.id];

            if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
        break;        
        default:
            message.reply('Merci d\'utiliser '+prefix+' et une commande, elle sont disponibles avec '+prefix+'help');
        }
});


/* Function random */
function random(min, max) {
    randnum = Math.floor((Math.random() * max) + min);
}

/* Function connection */
function play(connection, message) {
    var server = servers[message.guild.id];

    server.dispatcher = connection.playStream(Ytdl(server.queue[0],{filter: 'audioonly'}));
    server.queue.shift();

    server.dispatcher.on("end", function () {
        if (server.queue[0]) play(connection, message);
        else connection.disconnect();
            
    });
}
