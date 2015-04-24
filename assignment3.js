//only return 1 to 5 page numbers
function getGists() {
  //url to get gists set to variable url
  var url = 'https://api.github.com/gists';
  var pageNums = document.getElementsById('pageNum').value;
  //only get 1 to 5 pages from gist
  if (pageNums < 1 || pageNums > 5)
  {
    pageNums = 1;
    console.log('Invalid amount of pages, return 1 page');
  }
  console.log('value in page number field: ' + pageNums);
  for (var i = 1; i <= pageNums; ++i) {
    if (i == 1)
    {
      reqGists(url, i);
    }
    else if (i == 2)
    {
      url += '?page=2';
      reqGists(url, i);
    }
    else
    {
      url = url.slice(0, url.length - 1);
      url += 1;
      reqGists(url, i);
    }
  }
}
//make an AJAX request and store results
function reqGists(url, page)
{
  var 
}
