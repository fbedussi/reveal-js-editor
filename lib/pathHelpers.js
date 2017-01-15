function getMediaFiles(text) {
  var fileMatches = text.match(/(?:background-(?:image|video)="([^"]+)")|(?:!\[[^\]]*\] ?\(([^")]+\w)[^)]*\))/g);
  
  if (!fileMatches) {
    console.log('no file match');
    return [];
  }
  
  console.log('matches', fileMatches);
  return
    fileMatches
      .map(match => match.replace(/^background-(?:image|video)="([^"]+)"/, '$1'))
      .map(match => match.replace(/!\[[^\]]*\] ?\(([^")]+\w)[^)]*\)/, '$1'))
    ;
}

function updateMediaPath(html) {
    return html
        .replace(/(background-(?:image|video)=")(?:[^"]*[\\/])?([\w% ]+\.\w+")/g, '$1media/$2')
        .replace(/(src=")(?:.*[\\/])?([\w% ]+\.\w+)/g, '$1media/$2');
}

module.exports = {
  getMediaFiles,
  updateMediaPath
}
