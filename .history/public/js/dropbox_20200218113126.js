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

module.exports.run = async () => {
  try {
    let has_more = true;
    let cursor = null;
    let counter = 0; // keeps track of number of imgs resized

    while (has_more) {
      let files_list;

      // Get the next page of files from Dropbox
      if (!cursor) {
        let params = { path: FOLDER_PATH, limit: PAGINATION_SIZE };
        files_list = await dbx.filesListFolder(params);
      } else {
        files_list = await dbx.filesListFolderContinue({ cursor: cursor });
      }

      cursor = files_list.cursor;
      has_more = files_list.has_more;

      let imgs_paths = filterOverSizedImgsInDropboxResult(files_list.entries);

      for (let i = 0; i < imgs_paths.length; i++) {
        let path = imgs_paths[i];

        //1. download a lower resolution version of the file
        let thumbnail = await downloadThumbnailAsync(path);
        console.log("resized and moved ");

        counter++;
      }
    }

    console.log("Finished! Resized " + counter + " images");
  } catch (error) {
    console.log("!! Encountered error, aborting");
    console.log(error);
  }
};

function downloadThumbnailAsync(path) {
  let download_params = {
    path: path,
    format: FORMAT,
    size: SIZE,
    mode: MODE
  };
  console.log("printing img");
  return dbx.filesGetThumbnail(download_params);
}