<?php
$quotes = [
    "Believe you can and you're halfway there.",
    "Do something today that your future self will thank you for.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "It always seems impossible until it's done.",
    "Start where you are. Use what you have. Do what you can."
];

// Pick a random quote
$randomQuote = $quotes[array_rand($quotes)];
?>

<!DOCTYPE html>
<html>
<head>
    <title>Random Quote</title>
</head>
<body style="font-family: Arial; text-align: center; margin-top: 100px;">
    <h1>🌟 Your Inspirational Quote 🌟</h1>
    <p style="font-size: 24px; color: #555;">
        "<?php echo $randomQuote; ?>"
    </p>
</body>
</html>
