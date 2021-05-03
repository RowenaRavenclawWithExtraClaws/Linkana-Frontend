// for development!
const env = "https://api.Linkana.de";
const aiEnv = "https://ai.linkana.de";
const site = "https://assets.linkana.de/";
const url = "api.linkana.de";
const docSite = "https://doc.linkana.de/";

// for production!
/*const env = `https://api.${window.location.host}`;
const aiEnv = `https://ai.${window.location.host}`;
const site = `https://assets.${window.location.host}/`;
const url = `api.${window.location.host}`;
const docSite = "https://doc.linkana.ai/";*/

module.exports.site = site;
module.exports.url = url;
module.exports.auth = `${env}/auth/token/`;
module.exports.register = `${env}/auth/register/`;
module.exports.changePass = `${env}/auth/change-password/`;
module.exports.profile = `${env}/auth/profile/`;
module.exports.status = `${env}/status/`;
module.exports.devices = `${env}/devices/`;
module.exports.apps = `${env}/apps/`;
module.exports.logs = `${env}/logs/`;
module.exports.releases = `${env}/releases/`;
module.exports.groups = `${env}/groups/`;
module.exports.commands = `${env}/commands/`;
module.exports.outputs = `${env}/outputs/`;
module.exports.companies = `${env}/companies/`;
module.exports.confirm = `${env}/auth/confirmation/`;
module.exports.reset = `${env}/auth/password-reset/`;
module.exports.users = `${env}/users/`;
module.exports.playground = `https://pg.linkana.eu/voice/`;
module.exports.asr = `${env}/asr/`;
module.exports.nlp = `${env}/nlu/`;
module.exports.lang = `${env}/languages/`;
module.exports.types = `${env}/types/`;
module.exports.services = `${env}/services/`;
//AI endpoints
module.exports.audio = `${aiEnv}/audio/`;
module.exports.voice = `${aiEnv}/voice/`;
module.exports.query = `${aiEnv}/query/`;

module.exports.docSite = docSite;
