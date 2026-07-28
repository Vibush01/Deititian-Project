import sharp from 'sharp';

async function convertFavicon() {
  try {
    await sharp('public/favicon.webp')
      .toFormat('png')
      .toFile('public/favicon.png');
    console.log('Successfully converted favicon.webp to favicon.png');
  } catch (error) {
    console.error('Error converting image:', error);
  }
}

convertFavicon();
