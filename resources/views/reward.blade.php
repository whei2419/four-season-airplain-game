<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your INNISFREE Travel Reward</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: 'Gordita', sans-serif;
            background-image: url('{{ asset('assets/images/mobileBG.png') }}');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            background-attachment: fixed;
            min-height: 100svh;
            display: flex;
            flex-direction: column;
        }
        .reward-container {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 40px 20px;
            max-width: 600px;
            margin: 0 auto;
            width: 100%;
        }
        .logo-section {
            text-align: center;
            margin-bottom: 40px;
        }
        .logo-section img {
            width: auto;
            height: 15vh;
            object-fit: contain;
            margin-bottom: 10px;
        }
        .logo-text {
            font-size: 32px;
            font-weight: bold;
            color: white;
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        .reward-title-img {
            max-width: 100%;
            height: auto;
            text-align: center;
            margin-bottom: 30px;
            display: block;
            margin-left: auto;
            margin-right: auto;
        }
        .reward-title {
            font-size: 36px;
            font-weight: bold;
            color: white;
            text-align: center;
            margin-bottom: 30px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
        }
        .reward-card {
            background: white;
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            width: 100%;
            max-width: 500px;
        }
        .flight-award-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #e0e0e0;
        }
        .innisfree-logo-small {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .innisfree-logo-small img {
            width: 40px;
            height: 40px;
        }
        .innisfree-logo-small span {
            font-size: 18px;
            font-weight: bold;
            color: #4CAF50;
            text-transform: uppercase;
        }
        .flight-awards-text {
            font-size: 18px;
            font-weight: bold;
            color: #333;
            text-transform: uppercase;
        }
        .congrats-section {
            text-align: center;
            margin-bottom: 30px;
        }
        .congrats-title {
            font-size: 32px;
            font-weight: bold;
            color: #333;
            margin-bottom: 15px;
        }
        .reward-detail {
            font-size: 20px;
            color: #4CAF50;
            font-weight: 600;
            margin-bottom: 10px;
        }
        .reward-description {
            font-size: 16px;
            color: #666;
            line-height: 1.6;
        }
        .reward-image {
            text-align: center;
            margin: 30px 0;
            position: absolute;
            right: 0;
            top: 30vh;
        }
        .reward-image img {
            max-width: 95vw;
            height: auto;
        }
        .thank-you-footer {
            background: #4CAF50;
            color: white;
            text-align: center;
            padding: 20px;
            border-radius: 0 0 20px 20px;
            margin: -40px -40px 0;
            font-size: 18px;
            font-weight: 500;
        }
        .footer-credits {
            text-align: center;
            margin-top: 30px;
            color: rgba(0, 0, 0, 0.8);
            font-size: 12px;
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
        }
        .player-info {
            background: #f5f5f5;
            padding: 15px;
            border-radius: 10px;
            margin-bottom: 20px;
        }
        .player-info p {
            margin: 5px 0;
            font-size: 14px;
            color: #666;
        }
        .player-info strong {
            color: #333;
        }
    </style>
</head>
<body>
    <div class="reward-container">
        <div class="logo-section">
            <img src="{{ asset('assets/images/airline logo.webp') }}" alt="Innisfree Logo">
        </div>
        
        <img src="{{ asset('assets/images/Your INNISFREE Travel Reward.png') }}" alt="Your INNISFREE Travel Reward" class="reward-title-img">
        
            @if(isset($reward['image']))
            <div class="reward-image">
                <img src="{{ asset($reward['image']) }}" alt="Boarding Pass">
            </div>
            @endif
        
        <div class="footer-credits">
            Powered by WOWSOME® 2025
        </div>
    </div>
</body>
</html>
