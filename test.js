/**
 * @param {string[]} ops - List of operations
 * @return {number} - Sum of scores after performing all operations
 */
var calPoints = function(ops) {
    let temp = []
    let prev = null
    var result = null;
    ops.forEach((str) => {
      
      if( NaN()){
         temp.push(parseInt(str))
      
      } else if ( str == 'D' ){
      
          temp.push(2*prev)
      
      } else if( str == "C"){
      
        prev = temp[-1]
        temp.pop()
      
      } else {
        //assume its a +
      
        temp.push(temp[-1]+ temp[-2])
      }
    })
   for(let i=1; i< temp.length-1; i++){
     result = temp[0];
     result =  result + temp[i+1]
   }


return result;
};

var ops = ["5", "2", "C", "D", "+"];

console.log(calPoints(ops));

