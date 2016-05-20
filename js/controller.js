function LetterChanges(str) { 
  // code goes here  
  console.log(str)
  str = str.split('');
  console.log(str)
  for (var i = 0; i < str.length; i++) {
    var charCode = str[i].charCodeAt(0)
    console.log(charCode)
    if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)) {
    	 str[i] = String.fromCharCode(charCode + 1)
    }
  }
  str = str.join('')
  str = str.replace('a','A');
  str = str.replace('e','E');
  str = str.replace('i','I');
  str = str.replace('o','O');
  str = str.replace('u','U');
  return str; 
         
}
   
// keep this function call here 

console.log(LetterChanges('Argument goes here'))
