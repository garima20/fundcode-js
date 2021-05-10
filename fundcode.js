const request = require('request-promise');
const cheerio = require('cheerio');

let url = "https://codequiz.azurewebsites.net/"
let settings = { method: "Get", headers: {'Cookie': 'hasCookie=true'} };

async function getNavByFundcode(inpFundName) {
    const result = await request.get(url, settings);
    const $ = cheerio.load(result);
    $("body > table > tbody > tr").each((index, elem) => {
        const td = $(elem).find("td")
        const fundName = $(td[0]).text().trim()
        const nav = $(td[1]).text().trim()

        if (fundName === inpFundName)
            console.log(nav)
    });
}

const fundCode = process.argv[2]
getNavByFundcode(fundCode);