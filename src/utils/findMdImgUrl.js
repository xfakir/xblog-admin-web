export default function(str) {
  console.log(str);
  var reg = /!\[\w+\]\(\w+\.(gif|jpeg|png|jpg|bmp)\)/g;
  var result = str.match(reg);
  console.log(result);
  return result;
}
