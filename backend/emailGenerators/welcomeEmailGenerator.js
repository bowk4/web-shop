module.exports.createWelcomeEmailHtml = (customerFirstName, customerLastName , login) => {
  return `
 <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Nice Gadgets!</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #161827;">
<div class="container" style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #0F1121; display: flex; justify-content: center; flex-direction: column; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); align-items: center; text-align: center;">
    <h1 style="color: white; font-size: 34px; font-style: normal; font-weight: 600; line-height: 21px;">Welcome to Nice Gadgets!</h1>
    <img src="https://res.cloudinary.com/de71eui6p/image/upload/v1712393815/sxhtepbcyn1msl7vptct.webp" alt="logo">
    <p style="color: white; font-size: 18px; font-style: normal; font-weight: 400; line-height: 21px;">Hello ${customerFirstName} ${customerLastName},</p>

    <p style="color: white; font-size: 18px; font-style: normal; font-weight: 400; line-height: 21px;">
        Welcome aboard to NiceGadgets Store! We're thrilled to have you join our community of tech enthusiasts and
        gadget aficionados.
        <span>Your registration has been successfully completed</span> ,
        and we're excited to start this journey with you. Here's a quick overview of what you can expect
    </p>

    <p style="color: white; font-size: 18px; font-style: normal; font-weight: 400; line-height: 21px;">Your account has been successfully created with the following details:</p>
    <ul style="display: flex; flex-direction: column; align-items: flex-start;">
        <li style="list-style-type: none; color: white; font-size: 18px; font-style: normal; font-weight: 400; line-height: 21px;">Login: ${login}</li>
        <li style="list-style-type: none; color: white; font-size: 18px; font-style: normal; font-weight: 400; line-height: 21px;">First Name: ${customerFirstName}</li>
        <li style="list-style-type: none; color: white; font-size: 18px; font-style: normal; font-weight: 400; line-height: 21px;">Last Name: ${customerLastName}</li>
    </ul>

    <p style="color: white; font-size: 18px; font-style: normal; font-weight: 400; line-height: 21px;">Best regards,<br>Nice Gadgets Team</p>
    <p style="color: white; font-size: 18px; font-style: normal; font-weight: 400; line-height: 21px;">Social media:</p>
    <div class="social" style="display: flex; justify-content: space-between; width: 180px;">
        <div>
            <a href="https://t.me/nicegadgetstore" target="_blank" rel="noreferrer">
                <img src="https://res.cloudinary.com/de71eui6p/image/upload/v1711375286/Slider/zwpnzpy4gdrardowloam.webp" alt="Telegram">
            </a>
        </div>
        <div>
            <a href="https://www.instagram.com/n1cegadgetstore" target="_blank" rel="noreferrer">
                <img src="https://res.cloudinary.com/de71eui6p/image/upload/v1711375285/Slider/iypblt7wvhyl9vjywwdr.webp" alt="Instagram">
            </a>
        </div>
        <div>
            <a href="https://www.facebook.com/groups/258628787334330" target="_blank" rel="noreferrer">
                <img src="https://res.cloudinary.com/de71eui6p/image/upload/v1711375284/Slider/ba2xqvptwh9cpu5ekzij.webp" alt="Facebook">
            </a>
        </div>
        <div>
            <a href="mailto:testfrontendmail@gmail.com" target="_blank" rel="noreferrer">
                <img src="https://res.cloudinary.com/de71eui6p/image/upload/v1711375285/Slider/xqxh0u9umai1oa91dgg8.webp" alt="Gmail">
            </a>
        </div>
    </div>
</div>
</body>
</html>



  `;
};