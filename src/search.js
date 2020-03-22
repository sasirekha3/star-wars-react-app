import axios from 'axios';

module.exports = function (queryString, episodes = [], characters = {}, from = 0, size = 10) {
    if(episodes === [] && characters === {} && (query === "" || query === undefined)) {
        return null;
    }
    
    let query = {
        "from": from,
        "size": size,
        "query": {
            "bool": {
                "should": [

                ], 
                "must": [
                    {
                        "bool": {
                            "should": [

                            ],
                            "minimum_should_match": 1
                        }
                    }
                ],
                "minimum_should_match": 1
            }
        }
    }

    if(queryString !== "") {
        let temp = {
            "match": { "quote": queryString}
        }
        query["query"]["bool"]["must"].push(temp);
    }
    for (var key in episodes) {
        let temp = {
            "term": { "sequence": episodes[key]} 
        }
        query["query"]["bool"]["should"].push(temp);
    }
    for (var key in characters) {
        let temp = {
            "match": { "character": characters[key]} 
        }
        query["query"]["bool"]["must"][0]["bool"]["should"].push(temp);
    }

    if( query["query"]["bool"]["should"].length === 0) {
        delete query["query"]["bool"]["should"];
        delete query["query"]["bool"]["minimum_should_match"];
    }

    if( query["query"]["bool"]["must"][0]["bool"]["should"].length === 0) {
        delete query["query"]["bool"]["must"][0];
    }

    if( query["query"]["bool"]["must"].length === 0) {
        delete query["query"]["bool"]["must"];
    }

    return axios({
        method: "post",
        url: "https://api.sasirekha3.com/star-wars",
        header: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        data: query
    });
}