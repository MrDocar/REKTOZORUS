/* Require documents */
const Discord = require('discord.js');
const Low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const Ytdl = require('ytdl-core');
const ffmep = require('ffmpeg-binaries');


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

/* Tableau 1v1 */

var agentsdef = ['Doc', 'Rook', 'Kapkan', 'Tachanka', 'Jäger', 'Bandit','Pulse','Castle','Smoke','Mute','Frost','Valkyrie','Caveira','Echo','Mira','Lesion','Ela','Vigil'];
var agentsdefimg = ['doc_317262.png', 'rook_317279.png', 'kapkan_317273.png', 'tachanka_317282.png', 'jager_317272.png', 'bandit_317254.png','pulse_317278.png','castle_317260.png','smoke_317281.png','mute_317277.png','frost_317266.png','valkyrie_317286.png','caveira_317261.png','echo_317264.png','mira_317275.png','lesion_317274.png','ela_317265.png','vigil_317287.png'];

var agentsatt = ['Glaz', 'Fuze', 'Iq', 'Blitz', 'Twitch', 'Montagne','Thermite','Ash','Tatcher','sledge','Buck','BlackBeard','Capitao','Hibana','Jackal','Ying','Zofia','Dokkaebi','Finka','Lion'];
var agentsattimg = ['glaz_317268.png', 'fuze_317267.png', 'iq_317270.png', 'blitz_317256.png', 'twitch_317285.png', 'montagne_317276.png','thermite_317284.png','ash_317253.png','thatcher_317283.png','sledge_317280.png','buck_317257.png','blackbeard_317255.png','capitao_317258.png','hibana_317269.png','jackal_317271.png','ying_317288.png','zofia_317289.png','dokkaebi_317263.png','finka_319120.png','lion_319121.png'];

var maps = ['Bartlett','Tower','Oregon','Café Dostoyevsky','Favela','Club house','Bank','Border','Consulat','Maison','Yacht','Gratte ciel','Bord de mer','Base d\'Hereford','Kanal','Theme Parck'];
var mapsimg = ['60515173211/rainbowsix/images/thumb/1/14/R6S-bartlett-university.jpg/130px-351%2C1573%2C0%2C1080-R6S-bartlett-university.jpg','71108184443/rainbowsix/images/thumb/9/90/MokMyeokTower1.jpg/130px-234%2C687%2C0%2C400-MokMyeokTower1.jpg','51203202115/rainbowsix/images/thumb/9/96/Oregon.jpg/130px-52%2C229%2C0%2C156-Oregon.jpg','51202230016/rainbowsix/images/thumb/7/7e/RainbowSixSiege-KafeDostoyevsky.jpg/130px-411%2C1512%2C0%2C973-RainbowSixSiege-KafeDostoyevsky.jpg','60726172452/rainbowsix/images/thumb/c/c3/Favela_screenshot_-2.png/130px-413%2C1483%2C0%2C946-Favela_screenshot_-2.png','51202221211/rainbowsix/images/thumb/4/49/R6_EV_04BikersClub02_Ludo_Final_229465.jpg/130px-604%2C2353%2C0%2C1546-R6_EV_04BikersClub02_Ludo_Final_229465.jpg','51202221407/rainbowsix/images/thumb/3/3b/R6_EV_08Bank02_Ludo_Final_229466.jpg/130px-634%2C2322%2C0%2C1492-R6_EV_08Bank02_Ludo_Final_229466.jpg','60515170030/rainbowsix/images/thumb/1/15/R6S-dust-line-border.jpg/130px-253%2C1430%2C0%2C1040-R6S-dust-line-border.jpg','50925163346/rainbowsix/images/thumb/c/c7/Consulate_217069.jpg/130px-209%2C1114%2C0%2C800-Consulate_217069.jpg','51023232530/rainbowsix/images/thumb/9/9f/House_day.jpg/130px-188%2C1133%2C0%2C835-House_day.jpg','60515170826/rainbowsix/images/thumb/d/d7/R6S-black-ice-yacht.jpg/130px-253%2C1430%2C0%2C1040-R6S-black-ice-yacht.jpg','61103173105/rainbowsix/images/thumb/a/a0/Screenshot_%2865%29.png/130px-387%2C914%2C0%2C465-Screenshot_%2865%29.png','70124164214/rainbowsix/images/thumb/4/4d/Coastline_map_teaser_image.png/130px-234%2C687%2C0%2C400-Coastline_map_teaser_image.png','50925163348/rainbowsix/images/thumb/2/29/Hereford_217063.jpg/130px-220%2C1104%2C0%2C781-Hereford_217063.jpg','51202214504/rainbowsix/images/thumb/7/7b/R6_EV_09Kanal_Ludo_Final_227434.jpg/130px-632%2C2325%2C0%2C1497-R6_EV_09Kanal_Ludo_Final_227434.jpg','70828121156/rainbowsix/images/thumb/c/c3/R6SBloodOrchid.jpg/130px-247%2C1756%2C0%2C1334-R6SBloodOrchid.jpg'];

var defi = ['Utilise un silencieux sur tout les arme', 'Rien :heart:', 'Augmenter la sensibilité de 5 points','Joue sans le son', 'Doit dire "Patate !" quand il vois l\'autre','Ne peut pas utiliser son pouvoir','A le droit a un autre perso que celui indiquer','Doit jouer que point rouge'];

/* Action bot démarrage*/
bot.on('ready', () => {
    bot.user.setPresence({ game: { name: prefix + 'help', type:0}});
    console.log('Bot connecter !');
});

/* Connexion du bot */
bot.login(process.env.TOKEN);

/* Réception d'un message */
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
    console.log('----------------------------------- \nRéception du message, analyse ...');

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
        
        /* Appel de la team*/
        case "all":
        message.channel.send("Les petits @REKTOZOR sont attendu sur R6S", {
            tts: true
           })
        break;
        
         /* Réponse du help*/
        case "help": 
        console.log('help demandée');
            var help_embed = new Discord.RichEmbed()
                .setColor('#ffb600')
                .addField('Music', '     - '+prefix+'play [lien YT] : Joue la musique (et la mes en en attente si une est deja en cour) \n- '+prefix+'skip : Passe a la musique suivante \n- '+prefix+'stop : Fin de la musique')
                .addField('Commandes du bot', '     - '+prefix+'help : Affiches mes commandes \n- '+prefix+'1v1 : Je vous fabrique un 1v1 custom \n- '+prefix+'newblague [blague] : Ajoute une blague a mon intelligence \n- '+prefix+'blague : Je te raconte une blague \n- '+prefix+'clear : Supprime les 100 dernier message')
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

            if (!message.guild.voiceConnection) return;

            if (server.dispatcher) server.dispatcher.end();

        break;

        case "stop":
        console.log('Fin de la musique');

            var server = servers[message.guild.id];

            if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
        break;

        case "1v1":
        console.log('1VS1'); 
        var couleur = '#9'+random(0,9)+random(0,9)+random(0,9)+random(0,9)+random(0,9);
        var defense_emnled = new Discord.RichEmbed()
            .setColor(couleur)
            .setThumbnail(`https://ubistatic19-a.akamaihd.net/resource/fr-fr/game/rainbow6/siege-v3/r6-operators-list-${agentsdefimg[random(0,agentsatt.length)]}`)
            .addField('Le défenseur doit prendre : ', `${agentsdef[randnum]}`)
        message.channel.send(defense_emnled);

            couleur = '#'+7+couleur.substr(2);
        var attaque_emnled = new Discord.RichEmbed()
            .setColor(couleur)
            .setThumbnail(`https://ubistatic19-a.akamaihd.net/resource/fr-fr/game/rainbow6/siege-v3/r6-operators-list-${agentsattimg[random(0,agentsatt.length)]}`)
            .addField('L\'attaquant doit prendre : ', `${agentsatt[randnum]}`)
        message.channel.send(attaque_emnled);
        couleur = '#'+5+couleur.substr(2);

        var map_emnled = new Discord.RichEmbed()
            .setColor(couleur)
            .setThumbnail(`https://images.wikia.nocookie.net/__cb201${mapsimg[random(0,agentsatt.length)]}`)
            .addField('La map sera : ', `${maps[randnum]}`)
        message.channel.send(map_emnled);
        couleur = '#'+3+couleur.substr(2);

        var defi_emnled = new Discord.RichEmbed()
            .setColor(couleur)
            .addField('Le defi', `En défense : ${defi[random(0,defi.length)]} \nEn attaque : ${defi[random(0,defi.length)]}`)
        message.channel.send(defi_emnled);
        break; 

        case "clear":
        console.log('Clear du tchat'); 
            message.channel.bulkDelete(10).catch(error => message.channel.send(`Erreur : dans votre selection des messages de plus de 14 jours ne peuvent pas etre supprimer`));
        break;

        default:
        console.log('Error default message'); 
            message.reply('Merci d\'utiliser '+prefix+' et une commande, elle sont disponibles avec '+prefix+'help');
        }
});

bot.on('messageReactionAdd', (emoji, user) => {
    switch (emoji) {
        case "⬅️":
            console.log("Left");
        break;

        case "➡️":
        console.log("right");
        break;
    }
});


/* Function random */
function random(min, max) {
    randnum = Math.floor((Math.random() * max) + min);
    return randnum;
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
