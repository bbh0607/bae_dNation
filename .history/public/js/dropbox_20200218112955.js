const DROPBOX_ACCESS_TOKEN = process.env.DROPBOX_ACCESS_TOKEN;
const FORMAT = "jpeg";
const SIZE = "w120h90";
const MODE = "fitone_bestfit";

const Dropbox = require("dropbox").Dropbox,
  fetch = require("isomorphic-fetch"),
  config = {
    fetch: fetch,
    accessToken: DROPBOX_ACCESS_TOKEN
  };
var dbx = new Dropbox(config);

function downloadThumbnailAsync(path) {
  let download_params = {
    path: path,
    format: FORMAT,
    size: SIZE,
    mode: MODE
  };

  return dbx.filesGetThumbnail(download_params);
}