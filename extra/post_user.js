"use strict";

const elastic = require("../components").elasticSearch;

const indexName = "post_user";

function isUser(event) {
    let obj = event.current || event.previous;
    return obj.object_type === "user";
}

function onPost(event) {
    return elastic.index({
        index: indexName,
        type: indexName,
        id: event.object,
        body: {
            id: event.current.id,
            combo: isUser(event) ?
                `${event.current.name.given} ${event.current.name.family}` :
                event.current.description
        }
    });
}

function onPut(event) {
    let combo;
    if (isUser(event)) {
        if (event.current.name.given !== event.previous.name.given ||
            event.current.name.family !== event.previous.name.family) {
            combo = `${event.current.name.given} ${event.current.name.family}`;
        }
    } else if (event.current.description !== event.previous.description) {
        combo = event.current.description;
    }
    if (combo) {
        return elastic.update({
            index: indexName,
            type: indexName,
            id: event.object,
            body: {combo}
        });
    }
    return Promise.resolve();
}

function onDelete(event) {
    return elastic.delete({
        index: indexName,
        type: indexName,
        id: event.object
    });
}

module.exports = {
    onPost,
    onPut,
    onDelete
};
