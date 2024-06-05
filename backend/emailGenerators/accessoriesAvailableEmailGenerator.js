function accessoriesAvailableEmailGenerator(name, picture, price, color, weight, size, category){
  return `
   <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Nice Gadgets!</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 0;
      padding: 0;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    h1 {
      color: #333;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Welcome to Nice Gadgets - ${category}!</h1>
  </div>
</body>
</html>

  `;
}

module.exports = accessoriesAvailableEmailGenerator;