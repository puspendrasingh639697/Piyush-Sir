import { cloudinary } from './config/cloudinary.js';
import Product from './models/Product.js';
import fs from 'fs';
import path from 'path';

const uploadAllImages = async () => {
  const baseDir = './my_images'; // Jahan tumhari 100 images rakhi hain
  const categories = ['Lipstick', 'Foundation', 'Eyeliner', 'Blush', 'Mascara', 'Compact', 'Primer'];

  for (const cat of categories) {
    const folderPath = path.join(baseDir, cat);
    if (!fs.existsSync(folderPath)) continue;

    const files = fs.readdirSync(folderPath);

    for (const file of files) {
      try {
        // 1. Cloudinary par upload karo
        const result = await cloudinary.uploader.upload(`${folderPath}/${file}`, {
          folder: `Ram_Cosmetics/${cat}`
        });

        // 2. Database mein entry banao
        await Product.create({
          name: file.split('.')[0], // File ka naam hi product name ban jayega
          description: `${cat} category best product`,
          price: 499, // Ek dummy price baad mein update kar lena
          category: cat,
          image: result.secure_url, // Cloudinary ka asli link
          stock: 50
        });

        console.log(`✅ Uploaded: ${file} to ${cat}`);
      } catch (err) {
        console.error(`❌ Error uploading ${file}:`, err.message);
      }
    }
  }
  console.log("🚀 Pura 100 Products ka Catalog taiyar hai!");
};