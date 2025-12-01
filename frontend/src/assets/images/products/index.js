import headphones from './headphones.jpg';
import smartwatch from './smartwatch.jpg';
import shirt from './shirt.jpg';
import runningShoes from './running-shoes.jpg';
import waterBottle from './water-bottle.jpg';
import jsBook from './js-book.jpg';
import faceSerum from './face-serum.jpg';
import gamingMouse from './gaming-mouse.jpg';
import yogaMat from './yoga-mat.jpg';
import cookware from './cookware.jpg';
import kurti from './kurti.jpg';
import speaker from './speaker.jpg';
import cookbook from './cookbook.jpg';
import bodyLotion from './body-lotion.jpg';
import dumbbells from './dumbbells.jpg';
import jeans from './jeans.jpg';

const productImages = {
  'headphones.jpg': headphones,
  'smartwatch.jpg': smartwatch,
  'shirt.jpg': shirt,
  'running-shoes.jpg': runningShoes,
  'water-bottle.jpg': waterBottle,
  'js-book.jpg': jsBook,
  'face-serum.jpg': faceSerum,
  'gaming-mouse.jpg': gamingMouse,
  'yoga-mat.jpg': yogaMat,
  'cookware.jpg': cookware,
  'kurti.jpg': kurti,
  'speaker.jpg': speaker,
  'cookbook.jpg': cookbook,
  'body-lotion.jpg': bodyLotion,
  'dumbbells.jpg': dumbbells,
  'jeans.jpg': jeans,
};

export const getProductImage = (imageName) => {
  return productImages[imageName] || null;
};

export default productImages;