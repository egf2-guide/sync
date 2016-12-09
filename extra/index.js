"use strict";

// add "<POST, PUT, DELETE> <object type or edge>": <handler function (event)>
const handleRegistry = {
    "POST user": require("./post_user").onPost,
    "PUT user": require("./post_user").onPut,
    "DELETE user": require("./post_user").onDelete,
    "POST post": require("./post_user").onPost,
    "PUT post": require("./post_user").onPut,
    "DELETE post": require("./post_user").onDelete
};
module.exports = handleRegistry;
