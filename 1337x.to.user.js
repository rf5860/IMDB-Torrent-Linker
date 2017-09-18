// ==UserScript==
// @name          1337x Torrent Linker
// @description	  Modifies IMDB to search 1337x.to
// @include       http://www.imdb.com/title/*
// @grant         GM_xmlhttpRequest
// @connect       1337x.to
// @author        rjf89
// ==/UserScript==

const title = encodeURIComponent(document.title.replace(' - IMDb', ''));
const overview = document.getElementById('title-overview-widget');
GM_xmlhttpRequest({
  method: "GET",
  url: `https://1337x.to/category-search/${title}/Movies/1/`,
  onload: response => overview.parentNode.insertBefore(new DOMParser()
    .parseFromString(response.responseText, "text/html").getElementsByClassName('table-list-wrap')[0],
    overview.nextSibling)
});
