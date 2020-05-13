# xml-proxy

To solve problems with XML API's.

## Usage

The script is deployed at xml.proxy.emilfolino.se: [https://xml-proxy.emilfolino.se](https://xml-proxy.emilfolino.se)

```javascript
var url = encodeURIComponent("https://emilfolino.se/sitemap.xml");

fetch("https://xml-proxy.emilfolino.se/" + url)
.then(function (response) {
    return response.json();
}).then(function(result) {
    console.log("With proxy: ", result);
});
```
