(function(){
  var eventDate=new Date("2026-11-06T17:00:00-08:00").getTime(),d=document.getElementById("days"),h=document.getElementById("hours"),m=document.getElementById("minutes"),s=document.getElementById("seconds");
  function update(){var r=Math.max(0,eventDate-Date.now());d.textContent=String(Math.floor(r/86400000)).padStart(3,"0");h.textContent=String(Math.floor(r/3600000%24)).padStart(2,"0");m.textContent=String(Math.floor(r/60000%60)).padStart(2,"0");s.textContent=String(Math.floor(r/1000%60)).padStart(2,"0")}update();setInterval(update,1000);
  document.querySelector(".menu-toggle").addEventListener("click",function(){document.querySelector(".menu").classList.toggle("open")});
  document.querySelectorAll(".faq-question").forEach(function(button){button.addEventListener("click",function(){button.parentElement.classList.toggle("open")})});
  document.querySelectorAll(".menu a").forEach(function(link){link.addEventListener("click",function(){document.querySelector(".menu").classList.remove("open")})});
  if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches){
    document.documentElement.classList.add("motion-ready");
    var sectionObserver=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){entry.target.classList.toggle("in-view",entry.isIntersecting)});
    },{rootMargin:"-16% 0px -18% 0px",threshold:.12});
    document.querySelectorAll("section.content,.dna-bridge,.vessel-divider").forEach(function(section){sectionObserver.observe(section)});
  }else{
    document.querySelectorAll("section.content,.dna-bridge,.vessel-divider").forEach(function(section){section.classList.add("in-view")});
  }
  var hero=document.querySelector(".hero"),hackResult=document.querySelector(".hack-result"),eventStrip=document.querySelector(".event-strip"),ticking=false;
  var revealLines=["Build the unexpected","Health is a team sport","Prototype the possible"];
  var revealIndex=-1,revealArmed=true;
  function breakHero(){
    var rect=hero.getBoundingClientRect(),distance=Math.min(hero.offsetHeight*.58,560);
    var progress=Math.max(0,Math.min(1,-rect.top/distance));
    if(progress>.22&&revealArmed){
      revealIndex=(revealIndex+1)%revealLines.length;
      hackResult.textContent=revealLines[revealIndex];
      hackResult.classList.toggle("team-sport",revealLines[revealIndex]==="Health is a team sport");
      revealArmed=false;
    }
    if(progress<.06)revealArmed=true;
    var heroRect=hero.getBoundingClientRect(),stripRect=eventStrip.getBoundingClientRect();
    var centerX=hero.offsetWidth/2,centerY=hero.offsetHeight*.48;
    var landingX=(stripRect.left-heroRect.left)+(stripRect.width/2);
    var landingY=(stripRect.bottom-heroRect.top)+66;
    var dropProgress=Math.max(0,Math.min(1,(progress-.2)/.55));
    var resultX=centerX+(landingX-centerX)*dropProgress;
    var resultY=centerY+(landingY-centerY)*dropProgress;
    hero.style.setProperty("--result-x",resultX+"px");
    hero.style.setProperty("--result-y",resultY+"px");
    hero.style.setProperty("--break",progress.toFixed(3));
    ticking=false;
  }
  window.addEventListener("scroll",function(){if(!ticking){requestAnimationFrame(breakHero);ticking=true}},{passive:true});
  window.addEventListener("resize",breakHero);
  breakHero();
})();
