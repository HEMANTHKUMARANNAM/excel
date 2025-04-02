const fs = require('fs');
const path = require('path');

// Path to your images folder
const imagesFolder = path.join(__dirname, 'public', 'assets', 'Animal', 'Dog');

// Function to generate image list
function generateImageList() {
  fs.readdir(imagesFolder, (err, files) => {
    if (err) {
      console.log('Error reading the images folder', err);
      return;
    }

    // Filter only image files (you can adjust this to your needs)
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));

    // Write the list of image filenames to a JSON file
    fs.writeFileSync(
      path.join(__dirname, 'src', 'assets', 'imageList.json'),
      JSON.stringify(imageFiles)
    );

    console.log('Image list generated!');
  });
}

generateImageList();
