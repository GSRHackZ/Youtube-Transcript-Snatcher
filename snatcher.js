// ==UserScript==
// @name         Youtube Transcript Snatcher
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Turn youtube videos into copyable text
// @author       GSRHackZ
// @match        https://www.youtube.com/*
// @grant        none
// @icon         https://www.flaticon.com/svg/1450/1450566.svg
// @license                  MIT
// @compatible               chrome
// @compatible               firefox
// @compatible               opera
// @compatible               safari
// ==/UserScript==

const style=`
color:white;
border:1px solid lightgrey;
border-radius:3px;
width:150px;
padding:5px;
font-size:15px;
background:transparent;
cursor:pointer;
float:right;
outline:none;
margin-left:30px;
transition:.6s;
`;
let displayed=false,body=document.body,copied=false;

function copy(){
    if(copied==false){
        let array=[];
        let text=document.getElementsByClassName("cue style-scope ytd-transcript-body-renderer");
        for(let i=0;i<text.length;i++){
            array.push(text[i].innerText);
        }
        let transcript=array.join(' ').split('.').join('.\n');
        let panel=document.getElementsByClassName("style-scope ytd-transcript-renderer")[1];
        panel.innerHTML=transcript;
        panel.style="color:white;font-size:15px;line-height:25px;padding:10px;text-align:center;overflow-y:scroll;scroll-behaviour:smooth;";
        copied=true;
    }
}

setInterval(function(){
    if(document.getElementsByClassName("style-scope ytd-transcript-renderer")[4]!==undefined&&displayed==false){
        const footer=document.getElementsByClassName("style-scope ytd-transcript-renderer")[4];
        const btn=document.createElement("button");
        btn.innerHTML="Snatch Transcript";
        btn.style=style;
        btn.onclick=function(){
            copy();
            this.innerHTML="snatched!";
            setTimeout(function(){
                btn.innerHTML="Snatch Transcript";
            },1000)
        }
        btn.onmouseover = function(){
            btn.style.letterSpacing="1px";
            btn.style.border="1px solid aqua";
            btn.style.color="aqua";
        }
        btn.onmouseout=function(){
            btn.style.letterSpacing="0px";
            btn.style.border="1px solid lightgrey";
            btn.style.color="white";
        }
        footer.append(btn);
        displayed=true;
    }
},1000)
