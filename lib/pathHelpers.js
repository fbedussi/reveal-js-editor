function getMediaFiles(text) {
  var fileMatches = text.match(/(?:background-(?:image|video)="([^"]+)")|(?:!\[[^\]]*\] ?\(([^")]+\w)[^)]*\))/g);

  if (!fileMatches) {
    return [];
  }

  return fileMatches
      .map(match => match.replace(/^background-(?:image|video)="([^"]+)"/, '$1'))
      .map(match => match.replace(/!\[[^\]]*\] ?\(([^")]+\w)[^)]*\)/, '$1'))
    ;
}

function replaceAbsoluteMediaPathWithRelativeInHtml(html) {
    return html
        //.replace(/(background-(?:image|video)=")(?:[^"]*[\\/])?([\w% ]+\.\w+")/g, '$1media/$2')
        .replace(/(src=")(?:.*[\\/])?([\w% ]+\.\w+)/g, '$1media/$2')
    ;
}

function replaceAbsoluteMediaPathWithRelativeInMd(md) {
  return md
        .replace(/(!\[.*\]\().*[\\/]([^)]+\))/g, `$1media/$2`)
  ;
}

function replaceRelativeMediaPathWithAbsoluteInMd(md, absolutePath) {
  return md
        .replace(/(!\[.*\]\()([^)]+\))/g, `$1${absolutePath}/$2`)
  ;
}

module.exports = {
  getMediaFiles,
  replaceAbsoluteMediaPathWithRelativeInHtml,
  replaceAbsoluteMediaPathWithRelativeInMd,
  replaceRelativeMediaPathWithAbsoluteInMd
}
