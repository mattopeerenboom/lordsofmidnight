// Function to draw an image on the canvas
async function drawImageOnCanvas(canvas, imagePath, maxWidth, playerx, playery, locationx, locationy) {
    const steps = Math.abs(playery - locationy);
    const desiredWidth = maxWidth * Math.pow(0.6, steps - 1); // Further away is smaller

    const xsteps = locationx - playerx;
    const tangent = Math.atan(xsteps / steps) * 2;

    const ylocation = canvas.height / 3 + canvas.height / 3 / Math.pow(2, steps - 1);
    const newLocation = {
        x: canvas.width / 2 + (canvas.width / 2) * tangent / 2,
        y: ylocation,
    };

    const ctx = canvas.getContext('2d');

    // Load the image using await
    const img = await loadImage(imagePath);

    const aspectRatio = img.height / img.width;
    const desiredHeight = desiredWidth * aspectRatio;

    // Calculate the top-left corner for the image placement
    const x = newLocation.x - desiredWidth / 2;
    const y = newLocation.y - desiredHeight;

    // Draw the image on the canvas
    ctx.drawImage(img, x, y, desiredWidth, desiredHeight);
}

function loadImage(imagePath) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(err);
        img.src = imagePath;
    });
}

// Example usage
window.onload = async function () {
    const canvas = document.getElementById('myCanvas');
    const imagePath = 'assets/4/000.png'; // Replace with your transparent PNG path
    
    //citadel 1024, 576

    //canvas is 1280, 720

    //citadel should be half the canvas width
    //bottom third should be empty
    const bottomCenter = { x: canvas.width / 2, y: canvas.height * 2/3 };
    
    //y locations are 6 deep, using 1/3 of height, 
    //let maxwidth=canvas.width/2;
    let maxwidth=200;
    //let steps=0;
    for(let j=75;j>64;j--){
        for(let i=60;i<70;i++){
            await drawImageOnCanvas(canvas, imagePath, maxwidth,64,64,i,j,0);
        }
    }
};