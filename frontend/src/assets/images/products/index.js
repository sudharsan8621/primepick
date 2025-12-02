// import headphones from './headphones.jpg';
// import smartwatch from './smartwatch.jpg';
// import shirt from './shirt.jpg';
// import runningShoes from './running-shoes.jpg';
// import waterBottle from './water-bottle.jpg';
// import jsBook from './js-book.jpg';
// import faceSerum from './face-serum.jpg';
// import gamingMouse from './gaming-mouse.jpg';
// import yogaMat from './yoga-mat.jpg';
// import cookware from './cookware.jpg';
// import kurti from './kurti.jpg';
// import speaker from './speaker.jpg';
// import cookbook from './cookbook.jpg';
// import bodyLotion from './body-lotion.jpg';
// import dumbbells from './dumbbells.jpg';
// import jeans from './jeans.jpg';

// const productImages = {
//   'headphones.jpg': headphones,
//   'smartwatch.jpg': smartwatch,
//   'shirt.jpg': shirt,
//   'running-shoes.jpg': runningShoes,
//   'water-bottle.jpg': waterBottle,
//   'js-book.jpg': jsBook,
//   'face-serum.jpg': faceSerum,
//   'gaming-mouse.jpg': gamingMouse,
//   'yoga-mat.jpg': yogaMat,
//   'cookware.jpg': cookware,
//   'kurti.jpg': kurti,
//   'speaker.jpg': speaker,
//   'cookbook.jpg': cookbook,
//   'body-lotion.jpg': bodyLotion,
//   'dumbbells.jpg': dumbbells,
//   'jeans.jpg': jeans,
// };

// export const getProductImage = (imageName) => {
//   return productImages[imageName] || null;
// };

// export default productImages;
























// Electronics
import headphones from './headphones.jpg';
import smartwatch from './smartwatch.jpg';
import gamingMouse from './gaming-mouse.jpg';
import speaker from './speaker.jpg';
import earbuds from './earbuds.jpg';
import laptopStand from './laptop-stand.jpg';
import powerBank from './power-bank.jpg';
import keyboard from './keyboard.jpg';

// Clothing
import shirt from './shirt.jpg';
import kurti from './kurti.jpg';
import jeans from './jeans.jpg';
import dress from './dress.jpg';
import polo from './polo.jpg';
import leatherJacket from './leather-jacket.jpg';
import blazer from './blazer.jpg';
import hoodie from './hoodie.jpg';

// Home & Kitchen
import waterBottle from './water-bottle.jpg';
import cookware from './cookware.jpg';
import coffeeMaker from './coffee-maker.jpg';
import airFryer from './air-fryer.jpg';
import bedsheet from './bedsheet.jpg';
import tableLamp from './table-lamp.jpg';

// Sports
import runningShoes from './running-shoes.jpg';
import yogaMat from './yoga-mat.jpg';
import dumbbells from './dumbbells.jpg';
import resistanceBands from './resistance-bands.jpg';
import gymBag from './gym-bag.jpg';
import skippingRope from './skipping-rope.jpg';

// Books
import jsBook from './js-book.jpg';
import cookbook from './cookbook.jpg';
import selfHelpBook from './self-help-book.jpg';

// Beauty
import faceSerum from './face-serum.jpg';
import bodyLotion from './body-lotion.jpg';
import perfume from './perfume.jpg';

const productImages = {
  // Electronics
  'headphones.jpg': headphones,
  'smartwatch.jpg': smartwatch,
  'gaming-mouse.jpg': gamingMouse,
  'speaker.jpg': speaker,
  'earbuds.jpg': earbuds,
  'laptop-stand.jpg': laptopStand,
  'power-bank.jpg': powerBank,
  'keyboard.jpg': keyboard,
  
  // Clothing
  'shirt.jpg': shirt,
  'kurti.jpg': kurti,
  'jeans.jpg': jeans,
  'dress.jpg': dress,
  'polo.jpg': polo,
  'leather-jacket.jpg': leatherJacket,
  'blazer.jpg': blazer,
  'hoodie.jpg': hoodie,
  
  // Home & Kitchen
  'water-bottle.jpg': waterBottle,
  'cookware.jpg': cookware,
  'coffee-maker.jpg': coffeeMaker,
  'air-fryer.jpg': airFryer,
  'bedsheet.jpg': bedsheet,
  'table-lamp.jpg': tableLamp,
  
  // Sports
  'running-shoes.jpg': runningShoes,
  'yoga-mat.jpg': yogaMat,
  'dumbbells.jpg': dumbbells,
  'resistance-bands.jpg': resistanceBands,
  'gym-bag.jpg': gymBag,
  'skipping-rope.jpg': skippingRope,
  
  // Books
  'js-book.jpg': jsBook,
  'cookbook.jpg': cookbook,
  'self-help-book.jpg': selfHelpBook,
  
  // Beauty
  'face-serum.jpg': faceSerum,
  'body-lotion.jpg': bodyLotion,
  'perfume.jpg': perfume,
};

export const getProductImage = (imageName) => {
  return productImages[imageName] || null;
};

export default productImages;

