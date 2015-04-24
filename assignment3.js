var req;
//only return 1 to 5 page numbers
function getGists() {
  //url to get gists set to variable url
  var url = 'https://api.github.com/gists';
  var pageNums = document.getElementById('pageNum');
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
  var temp = 'results' + page;
  //make a request
  if (window.XMLHttpRequest) {
    var req = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    req = new ActiveXObject('Microsoft.XMLHTTP');
  }
  if (!req)
  {
    throw 'HTTP request could not be created.';
  }
  req.onreadystatechange = function()
  {
    if (req.readyState === 4)
    {
      if (req.status === 200)
      {
        var gists = this.responseText;
        var json = JSON.parse(gists);
  //      filterGists(page, json);
    //    printGists(page);
      }
    }
    // else {
    //   console.log('Not ready, ready state is ' + this.readyState);
    // }
  };
  req.open('GET', 'https://api.github.com/gists', true);
  req.send();
  }
  //pushes gist to the session storage
  // function filterGists(page, json)
  // {
  //
  // }
  // function printGists(page) {
  //   var temp = 'results' + page;
  // }
