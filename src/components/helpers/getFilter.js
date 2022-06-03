import { result } from "lodash";

const getFilter = (items, filter) => {
  //console.log(filter)
    // console.log(items);

if (items.category=== 'Обувь'){
  if (filter === 'All'){
     return items;
    // return items.filter(item => item.category === 'Oбувь')
   }
  else {
       return  items.filter(item => item.size.some(size => size.scale === filter && size.quantity !== null))
  }
} 

else {
    if (filter === 'All'){
        return items;
       // return items.filter(item => item.category === 'Oбувь')
      }
     else {
          return  items.filter(item => item.size.some(size => size.scale === filter && size.quantity !== null))
     }
}

}



export default getFilter;

//console.log(item.size.scale) === filter && item.size.quantity !== null)
// else {
//     return items.filter(({ size, ...props }) => {
//         //console.log(size)
//       const arraySizes = size;
//       const activeSizeFilter = arraySizes.filter((size) => size.scale === filter);
//       const availableSizeFilter = activeSizeFilter.filter((size) => size.quantity !== null);
//       console.log(availableSizeFilter);
//       return availableSizeFilter;
//       // size = availableSizeFilter;
//       // const newFilterArr = { size, ...props };
//       //console.log(newFilterArr);
//       // return newFilterArr;
//   })

// else {
//     const result =  items.map((item) => {
//        const size = item.size;
//        const data =  size.filter(item => item.scale === filter && item.quantity !== null)
       
//         console.log(data);
//         console.log(item.size)

//        return item.size = data;
      
//   })

//  //console.log(result)
//  return result
// }