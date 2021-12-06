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
    console.log(dailyUseKwh)
    
    let sunHoursPerDay = sunHours();
    console.log(sunHoursPerDay);

    let minKwNeeds = dailyUseKwh / sunHoursPerDay;
    console.log(minKwNeeds)

    let realKwhNeeds = minKwNeeds * 1.25;
    console.log(realKwhNeeds)

    let realWattNeeds = realKwhNeeds * 1000;
    console.log(realWattNeeds)

    let panelInfo = calculatePanel();
    let panelOutput = panelInfo[0];
    let panelName = panelInfo[1];
    console.log(panelOutput, panelName);

    let panelsNeeded = Math.ceil(realWattNeeds / panelOutput);
    console.log(panelsNeeded)
}

