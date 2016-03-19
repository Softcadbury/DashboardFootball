'use strict';

var config = require('../config');
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var assistsDataUrl = 'http://www.espnfc.com/{0}/statistics/assists';
var leagues = [
    { name: config.leagues.bundesliga, code: 'german-bundesliga/10' },
    { name: config.leagues.liga, code: 'spanish-primera-division/15' },
    { name: config.leagues.ligue1, code: 'french-ligue-1/9' },
    { name: config.leagues.serieA, code: 'italian-serie-a/12' },
    { name: config.leagues.premierLeague, code: 'barclays-premier-league/23' }
];

// Updates assists of current year
function update() {
    for (var i = 0; i < leagues.length; i++) {
        updateData(leagues[i]);
    }
}

// Updates the assists of a league
function updateData(league) {
    var url = assistsDataUrl.replace('{0}', league.code);

    request(url, (err, resp, body) => {
        if (err) {
            throw err;
        }

        var $ = cheerio.load(body);
        var result = [];

        $('#stats-top-assists > div > table > tbody > tr').each((index, elem) => {
            if (index < 20) {
                result.push({
                    rank: $(elem).find('td[headers=rank]').text() || '-',
                    name: $(elem).find('td[headers=player]').text(),
                    team: $(elem).find('td[headers=team]').text(),
                    goals: $(elem).find('td[headers=goals]').text()
                });
            }
        });

        var filePath = config.paths.assistsData.replace('{0}', league.name);
        fs.writeFile(filePath, JSON.stringify(result, null, 4), (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Assists updated for ' + league.name);
            }
        });
    });
}

module.exports = {
    update: update
};