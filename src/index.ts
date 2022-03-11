/// <reference path="../node_modules/@workadventure/iframe-api-typings/iframe_api.d.ts" />
import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;
const popups: any = [];

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    popups.mainRoom = WA.ui.openPopup("mainRoom","Welcome to UBUCON!",[]);
    popups.room1 = WA.ui.openPopup("boardRoom1","Ubuntu installation workshop",[]);
    let i = 0;

    window.setInterval(function(){
        i++;
        popups.room1.close();

        if (i%2==0){
            popups.room1 = WA.ui.openPopup("boardRoom1","Installing something",[]);
        } else {
            const today = new Date();
            const t = new Date(today.getTime() + 5*60);
            popups.room1 = WA.ui.openPopup("boardRoom1","Next talk at "+t.toLocaleTimeString(),[]);
        }
    }, 20000);


    WA.room.onEnterLayer('clockZone').subscribe(() => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        currentPopup = WA.ui.openPopup("clockPopup","It's " + time,[]);
    })

    WA.room.onLeaveLayer('clockZone').subscribe(closePopUp)

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

function closePopUp(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}
