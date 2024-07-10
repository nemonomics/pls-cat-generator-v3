window.onload = function() {
    const canvas = document.getElementById('memeCanvas');
    const ctx = canvas.getContext('2d');
    const backgroundUpload = document.getElementById('backgroundUpload');
    const resetBtn = document.getElementById('resetBtn');
    const downloadBtn = document.getElementById('downloadBtn');

    const catImg = new Image();
    catImg.src = 'pls-cat-transparent.png'; // Replace with your transparent cat image URL

    let backgroundImg = new Image();
    let isDraggingCat = false;
    let catX = canvas.width / 2 - 172.5; // Adjusted for larger cat image
    let catY = canvas.height / 2 - 172.5; // Adjusted for larger cat image
    const catWidth = 345; // Increased cat image width by 15%
    const catHeight = 345; // Increased cat image height by 15%

    catImg.onload = () => {
        drawCanvas();
    };

    canvas.addEventListener('mousedown', (e) => {
        if (isOverCat(e.offsetX, e.offsetY)) {
            isDraggingCat = true;
            offsetX = e.offsetX - catX;
            offsetY = e.offsetY - catY;
        }
    });

    canvas.addEventListener('mousemove', (e) => {
        if (isDraggingCat) {
            catX = e.offsetX - offsetX;
            catY = e.offsetY - offsetY;
            drawCanvas();
        }
    });

    canvas.addEventListener('mouseup', () => {
        isDraggingCat = false;
    });

    backgroundUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                backgroundImg.src = event.target.result;
                backgroundImg.onload = () => {
                    drawCanvas();
                };
            };
            reader.readAsDataURL(file);
        }
    });

    resetBtn.addEventListener('click', () => {
        backgroundImg.src = '';
        drawCanvas();
    });

    downloadBtn.addEventListener('click', () => {
        const downloadLink = document.createElement('a');
        downloadLink.href = canvas.toDataURL('image/png');
        downloadLink.download = 'meme.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    });

    function drawCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (backgroundImg.src) {
            ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
        }

        ctx.drawImage(catImg, catX, catY, catWidth, catHeight);
    }

    function isOverCat(x, y) {
        return x > catX && x < catX + catWidth && y > catY && y < catY + catHeight;
    }
};
