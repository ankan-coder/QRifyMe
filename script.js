function generateQRCode() {
  // Clear existing QR code
  document.getElementById("qrcode").innerHTML = "";

  // Get the URL input value
  const urlInput = document.getElementById("urlInput");
  const url = urlInput.value.trim();

  if (url !== "") {
    // Create a QR code using the qrcode-generator library
    const qrcode = new QRCode(document.getElementById("qrcode"), {
      text: url,
      width: 250,
      height: 250,
    });

    // Show the download link
    const downloadLink = document.getElementById("downloadLink");
    downloadLink.style.display = "block";
    const printLink = document.getElementById("printLink");
    printLink.style.display = "block";
  } else {
    alert("Please enter a valid URL!");
  }
}

function downloadQRCode() {
  // Get the QR code canvas
  const canvas = document
    .getElementById("qrcode")
    .getElementsByTagName("canvas")[0];

  // Create an anchor element
  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = "qrcode.png";

  // Simulate click on the anchor element to trigger download
  link.click();
}

function printQRCode() {
  // Get the QR code canvas
  const canvas = document
    .getElementById("qrcode")
    .getElementsByTagName("canvas")[0];

  // Create a new window with the QR code image and link
  const windowContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Print QR Code</title>
            <style>
                body {
                    text-align: center;
                }
                #qr-code {
                    margin: 0 auto;
                    display: block;
                }
                #download-link {
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <img id="qr-code" src="${canvas.toDataURL()}" style="width:70%; height:auto;">
        </body>
        </html>
    `;

  // Open a new window with the generated content
  const printWindow = window.open("", "", "width=600,height=400");
  printWindow.document.write(windowContent);

  // Trigger print
  printWindow.document.close(); // Necessary for IE <= 10
  printWindow.print();
}
