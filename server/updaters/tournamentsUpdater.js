'use strict';

var config = require('../config');
var helper = require('../helper');
var competitions = require('../data/competitions');

var tournamentDataUrl = 'http://www.worldfootball.net/schedule/{0}-{1}-{2}';
var tournamentDataUrlExtensions = ['finale', 'halbfinale', 'viertelfinale', 'achtelfinale', 'sechzehntelfinale'];
var itemsExtended = [
    { code: competitions.championsLeague.code, url: 'champions-league', roundNumber: 4 },
    { code: competitions.europaLeague.code, url: 'europa-league', roundNumber: 5 }
];

// Updates tournament of current year
function update() {
    for (var i = 0; i < itemsExtended.length; i++) {
        updateData(itemsExtended[i]);
    }
}

// Updates the tournament of an item
function updateData(item) {
    var promises = [];
    var results = [
        { name: 'Final', matches: [] },
        { name: 'Semi-finals', matches: [] },
        { name: 'Quarter-finals', matches: [] },
        { name: 'Eighth-finals', matches: [] },
        { name: 'Sixteenth-finals', matches: [] }
    ];

    for (var i = 0; i < item.roundNumber; i++) {
        promises.push(parseRound(item, results, i));
    }

    Promise.all(promises).then(() => {
        helper.writeJsonFile(helper.stringFormat(config.paths.tournamentData, item.code, config.years.current), results);
    });
}

// Parse a page of an item
function parseRound(item, results, round) {
    return new Promise((resolve, reject) => {
        helper.scrapeUrl(helper.stringFormat(tournamentDataUrl, item.url, config.years.current, tournamentDataUrlExtensions[round]), function ($) {
            var currentMatches = results[round].matches;

            $('#site > div.white > div.content > div > div.box > div > table > tr').each((index, elem) => {
                if (round === 0) {
                    var team1 = $(elem).find('td:nth-child(3) > a').text();
                    var team2 = $(elem).find('td:nth-child(5) > a').text();

                    var score = parseScore($(elem).find('td:nth-child(6) > a').text());
                    var finalScore = score.split(' ').length === 1 ? score : score.split(' ')[1].replace('(', '').replace(')', '');

                    currentMatches.push({
                        team1: team1,
                        team2: team2,
                        score: score,
                        winner: finalScore.split(':')[0] > finalScore.split(':')[1] ? team1 : team2
                    });
                } else {
                    switch (index % 4) {
                        case 0:
                            currentMatches.push({
                                team1: $(elem).find('td:nth-child(2) > a').text(),
                                team2: $(elem).find('td:nth-child(4) > a').text(),
                                score1: parseScore($(elem).find('td:nth-child(5) > a').text())
                            });
                            break;
                        case 1:
                            currentMatches[currentMatches.length - 1].score2 = parseScore($(elem).find('td:nth-child(5) > a').text(), true);
                            break;
                        case 2:
                            currentMatches[currentMatches.length - 1].winner = $(elem).find('td:nth-child(5) > b').text();
                            break;
                    }
                }
            });

            for (var i = 0; i < currentMatches.length; i++) {
                currentMatches[i].team1Logo = helper.stringSanitize(currentMatches[i].team1);
                currentMatches[i].team2Logo = helper.stringSanitize(currentMatches[i].team2);
            }

            resolve();
        });
    });
}

// Clean score by removing useless parts
function parseScore(score, inverseScore) {
    var scores = score
        .replace('pso', '')
        .replace('aet', '')
        .replace('(', '')
        .replace(')', '')
        .replace(new RegExp(',', 'g'), '')
        .trim()
        .split(' ');

    var newScorePart1 = scores[0];

    if (inverseScore) {
        newScorePart1 = newScorePart1.split(':')[1] + ':' + newScorePart1.split(':')[0];
    }

    if (scores.length !== 4) {
        return newScorePart1;
    }

    var newScorePart2 = scores[3];

    if (inverseScore) {
        newScorePart2 = newScorePart2.split(':')[1] + ':' + newScorePart2.split(':')[0];
    }

    return newScorePart2 + ' (' + newScorePart1 + ')';
}

module.exports = {
    update: update
};