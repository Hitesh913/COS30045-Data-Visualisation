function showChart(image, caption, altText) {
    const chart = document.getElementById("chartImage");
    const figureCaption = document.getElementById("chartCaption");

    chart.src = image;
    chart.alt = altText;
    figureCaption.textContent = caption;
}