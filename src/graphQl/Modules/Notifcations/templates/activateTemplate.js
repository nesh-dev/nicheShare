export const activateTemplate = ({ username, token }) => (`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
    .Email-wrapper{
        display:grid;
        width: 50%;
        min-height: 50px;
        margin: 10px;
       
    }
    .Email-wrapper_log{
        justify-self: start;
        margin: 10px;
    }
    .Email-wrapper_button{
        background-color: #0094FF;
        width: 40%;
        color: white;
        padding: 10px;
        cursor: pointer;
        text-decoration: none;
        text-align: center;
    }
    .Email-wrapper_button:hover {
      cursor: pointer;
    }
    .Email-wrapper_body_message , .Email-wrapper_body_name{
    align-self: center; 
   margin-left: 25px;
   margin: 10px;
   color: gray;
    }
    .Email-wrapper_body_name{
     margin-bottom: 20px;
     margin: 10px;
    }
   #thanks{
        margin-top: 10px;
    }
    </style>
</head>
<body>
    <div class="Email-wrapper">
        <div class="Email-wrapper_body">
            <div class="Email-wrapper_body_name">Hi ${username}!</div>
            <div class="Email-wrapper_body_message">We are excited to have you onboard. Click the link below to activate your account.

            </br>  </br>  </br>  <span id="thanks" style="margin-top: 10px;">Connect with fellow enthusiasts in your niche.</span>  </div>
        </div>
       <a href="http://localhost:3000/activate/${token}" class="Email-wrapper_button" style="cursor: pointer !important; justify-self: center; margin-left: 80px; text-decoration: none; color: white;">Activate Account</a>
       
        

    </div>
    </body>
    </html>`);
