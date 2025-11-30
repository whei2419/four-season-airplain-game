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
            background: linear-gradient(180deg, #4CAF50 0%, #FFA726 50%, #EC407A 100%);
            min-height: 100vh;
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
            width: 120px;
            height: auto;
            margin-bottom: 10px;
        }
        .logo-text {
            font-size: 32px;
            font-weight: bold;
            color: white;
            text-transform: uppercase;
            letter-spacing: 2px;
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
        }
        .reward-image img {
            max-width: 200px;
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
            color: rgba(255,255,255,0.8);
            font-size: 14px;
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
            <img src="{{ asset('assets/images/innisfree-logo.png') }}" alt="Innisfree Logo">
            <div class="logo-text">Airline</div>
        </div>
        
        <h1 class="reward-title">Your INNISFREE Travel Reward</h1>
        
        <div class="reward-card">
            <div class="flight-award-header">
                <div class="innisfree-logo-small">
                    <img src="{{ asset('assets/images/innisfree-icon.png') }}" alt="Innisfree">
                    <span>Innisfree<br>Airline</span>
                </div>
                <div class="flight-awards-text">Flight Awards</div>
            </div>
            
            <div class="player-info">
                <p><strong>Player:</strong> {{ $player->player_name }}</p>
                <p><strong>Flight:</strong> {{ $player->flight_number }}</p>
                <p><strong>Score:</strong> {{ $player->score }} points</p>
            </div>
            
            @if(isset($reward['image']))
            <div class="reward-image" style="margin: 20px 0;">
                <img src="{{ asset($reward['image']) }}" alt="Boarding Pass" style="max-width: 100%; height: auto; border-radius: 10px;">
            </div>
            @endif
            
            <div class="thank-you-footer">
                Thank you for flying with INNISFREE Airline.
            </div>
        </div>
        
        <div class="footer-credits">
            Powered by WOWSOME® 2025
        </div>
    </div>
</body>
</html>
