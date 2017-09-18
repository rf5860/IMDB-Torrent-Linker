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
let { parentElem, siblingElem } = { parentElem: overview.parentNode, siblingElem: overview.nextSibling };
GM_xmlhttpRequest({
  method: "GET",
  url: `https://1337x.to/category-search/${title}/Movies/1/`,
  onload: response => {
    let content = new DOMParser().parseFromString(response.responseText, "text/html");
    let linksTable = content.getElementsByClassName('table-list-wrap')[0];
    ['coll-date', 'coll-5', 'coll-4'].forEach(cls => Array.from(linksTable.getElementsByClassName(cls)).forEach(col => col.remove()));
    linksTable.querySelector('th.coll-1').textContent = 'Name';
    linksTable.querySelector('th.coll-2').textContent = 'Seeders';
    linksTable.querySelector('th.coll-3').textContent = 'Leechers';
    linksTable.querySelectorAll('td>a.icon').forEach(e => e.remove());
    linksTable.querySelectorAll('td>a').forEach(a => { a.protocol = 'https:'; a.host = '1337x.to'; });
    parentElem.insertBefore(linksTable, siblingElem);
  }
});
