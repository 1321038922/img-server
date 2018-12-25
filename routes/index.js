var express = require('express');
var router = express.Router();
const qiniu = require('qiniu')

/* GET home page. */
router.get('/', function (req, res, next) {
  var accessKey = 'your access key';
  var secretKey = 'your secret key';
  var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  var options = {
    scope: 'yaoqi',
    returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"url":"http://idv093d.qiniudns.com/$(key)"}'
  };
  var putPolicy = new qiniu.rs.PutPolicy(options);
  var uploadToken=putPolicy.uploadToken(mac);
  res.header('Access-Control-Allow-Origin','*')
  res.json({
    code:200,
    data:uploadToken,
    msg:'success'
  })
});

module.exports = router;
