/*jslint browser:true */
"use strict";

const addMonths = (id) => {
    let annualKwhUse = 0, dailyKwhUse = 0, i = 0, x = 0;
    
    let months = document.getElementById(id).getElementsByTagName('input');
    
    for (i = 0; i < months.length; i++) {
        x = Number(months[i].value);
        annualKwhUse += x;
    }
    dailyKwhUse = annualKwhUse/365;
    return dailyKwhUse
}


const sunHours = () => {
    let hrs;
    let theZone = document.forms.solarForm.zone.selectedIndex;
    theZone += 1;
    switch (theZone) {
        case 1:
            hrs = 6;
            break;
        case 2:
            hrs = 5.5;
            break;
        case 3:
            hrs = 5;
            break;
        case 4:
            hrs = 4.5;
            break;
        case 5:
            hrs = 4.2;
            break;
        case 6:
            hrs = 3.5;
            break;
        default: hrs = 0;
    }
    return hrs;
}

const calculatePanel = () => {
    let userChoice = document.forms.solarForm.panel.selectedIndex;
    let panelOptions = document.forms.solarForm.panel.options;
    let power = panelOptions[userChoice].value;
    let name = panelOptions[userChoice].text;
    let x = [power, name];
    return x;
}

const calculateSolar = () => {
    let dailyUseKwh = addMonths('mpc');

    
    let sunHoursPerDay = sunHours();


    let minKwNeeds = dailyUseKwh / sunHoursPerDay;


    let realKwhNeeds = minKwNeeds * 1.25;


    let realWattNeeds = realKwhNeeds * 1000;


    let panelInfo = calculatePanel();
    let panelOutput = panelInfo[0];
    let panelName = panelInfo[1];


    let panelsNeeded = Math.ceil(realWattNeeds / panelOutput);
  

    let feedback = "";
    feedback += "<p>Based on your average daily use of "+ Math.round(dailyUseKwh) +" kWh, you will need to purchase "+ panelsNeeded +" "+ panelName +" panels to offset 100% of your electricity bill.</p>";

    feedback += "<h2>Additional Details</h2>";

    feedback += "<p>Your average daily electicity consumption: "+ Math.round(dailyUseKwh) +" kWh per day.</p>";

    feedback += "<p>Average sunshine hours per day: "+ sunHoursPerDay +" </p>"

    feedback += "<p>Realistic watts needed per hour: "+ Math.round(realWattNeeds) +" </p>";

    feedback += "<p>The "+ panelName +" panel you selected generates about "+ panelOutput +" watts per hour.</p>"

    document.getElementById('feedback').innerHTML = feedback;
}

