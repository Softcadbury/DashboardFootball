'use strict';

var config = require('../config');
var helper = require('../helper');
var leagues = require('../data/leagues');

var tableDataUrl = 'http://www.worldfootball.net/schedule/{0}-{1}-spieltag';
var leaguesExtended = [
    { code: leagues.bundesliga.code, url: 'bundesliga' },
    { code: leagues.liga.code, url: 'esp-primera-division' },
    { code: leagues.ligue1.code, url: 'fra-ligue-1' },
    { code: leagues.serieA.code, url: 'ita-serie-a' },
    { code: leagues.premierLeague.code, url: 'eng-premier-league' }
];

// Updates tables of current year
function update() {
    for (var i = 0; i < leaguesExtended.length; i++) {
        updateData(leaguesExtended[i]);
    }
}

// Updates the table of a league
function updateData(league) {
    helper.scrapeUrl(helper.stringFormat(tableDataUrl, league.url, config.years.current), function ($) {
        var results = [];

        // Gets results
        $('#site > div.white > div.content > div > div:nth-child(7) > div > table.standard_tabelle > tr').each((index, elem) => {
            if (index > 0 && index <= 20) {
                results.push({
                    rank: $(elem).find('td:nth-child(1)').text(),
                    team: $(elem).find('td:nth-child(3) > a').text(),
                    logoSrc: $(elem).find('td:nth-child(2) > img').attr('src'),
                    points: $(elem).find('td:nth-child(10)').text(),
                    played: $(elem).find('td:nth-child(4)').text(),
                    win: $(elem).find('td:nth-child(5)').text(),
                    draw: $(elem).find('td:nth-child(6)').text(),
                    lost: $(elem).find('td:nth-child(7)').text(),
                    goalsFor: $(elem).find('td:nth-child(8)').text().split(':')[0],
                    goalsAgainst: $(elem).find('td:nth-child(8)').text().split(':')[1],
                    goalDifference: $(elem).find('td:nth-child(9)').text()
                });
            }
        });

        for (var i = 0; i < results.length; i++) {
            results[i].logo = helper.stringSanitize(results[i].team);
            helper.downloadImage('http:' + results[i].logoSrc, helper.stringFormat(config.paths.logosData, results[i].logo));
            delete results[i].logoSrc;
        }

        helper.writeJsonFile(helper.stringFormat(config.paths.tableData, league.code, config.years.current), results);
    });
}

module.exports = {
    update: update
};