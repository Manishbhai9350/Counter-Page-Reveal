import { ToSpans } from "./utils.js";

console.clear();

document.addEventListener("DOMContentLoaded", () => {
  let TotalLoaded = 0;
  let LoadedText = "00";

  const Counter = document.querySelector(".counter");
  const CounterBounds = Counter.getBoundingClientRect();
  const Count1 = Counter.querySelector(".counts-1");
  const Count2 = Counter.querySelector(".counts-2");
  const Counts1 = gsap.utils.toArray(".counts-1 .count");
  const Counts2 = gsap.utils.toArray(".counts-2 .count");
  let SVGS = gsap.utils.toArray(".svgs .svg");
  let SVGDelays = [0.2, 0.5, .7,1];
  let TotalCounts = Counts1.length;
  let CurrentCount = 0;

  function ShowLoading(IsTimeOut = false, Interval = 0) {
    const CurrentCount1 = Counts1[CurrentCount];
    const CurrentCount2 = Counts2[CurrentCount];
    const PrevCount1 = CurrentCount1?.previousElementSibling;
    const PrevCount2 = CurrentCount2?.previousElementSibling;

    const TL = gsap.timeline({
      onComplete() {
        if (IsTimeOut) {
          setTimeout(LoaderManagement, Interval);
        }
      },
    });

    if (PrevCount1) {
      TL.to(
        PrevCount1,
        {
          left: "100%",
        },
        "<"
      );
    }
    if (PrevCount2) {
      TL.to(
        PrevCount2,
        {
          left: "100%",
        },
        "<"
      );
    }
    TL.to(
      [CurrentCount1, CurrentCount2],
      {
        left: 0,
      },
      "<"
    );
    TL.to(
      Counter,
      {
        left:
          TotalLoaded - (CounterBounds.width / innerWidth) * TotalLoaded + "%",
      },
      "<"
    );
    CurrentCount++;
  }
  ShowLoading();
  function LoaderManagement() {
    let IsTimeOut = false;
    if (TotalLoaded < 85) {
      TotalLoaded += 23;
      LoadedText = TotalLoaded.toString();
      ShowLoading(true, Math.random() * 500 + 500);
      IsTimeOut = true;
    } else if (TotalLoaded < 99) {
      TotalLoaded = 99;
      LoadedText = TotalLoaded.toString();
      ShowLoading(true, Math.random() * 500 + 500);
      IsTimeOut = true;
    } else if (TotalLoaded == 99) {
      gsap.to([Counts1[CurrentCount - 1], Counts2[CurrentCount - 1]], {
        left: "100%",
        onComplete() {
          SVGS.forEach((SVG, i) => {
            gsap.to(SVG, {
              delay: SVGDelays[i] - 0.3,
              scale: 20,
              duration: 1,
              ease: "power4.inOut",
              onComplete() {
                if (i == SVGS.length - 1) {
                  LandingAnimation();
                }
              },
            });
          });
        },
      });
      TotalLoaded = 100;
    }
  }
  setTimeout(LoaderManagement, Math.random() * 1500 + 500);

  ToSpans(".content h1")
  ToSpans("nav a")
  ToSpans("nav p")
  gsap.set('nav a span, nav p span',{
    y:'100%',
    display:'inline-block'
  })
  gsap.set('.content h1 span',{
    y:'100%',
    display:'inline-block'
  })
  function LandingAnimation() {
    gsap.set(".loader", { display: "none" });
    gsap.to('.content h1 span',{
      y:0,
      stagger:.02,
      ease:"power4"
    })
    gsap.to('nav a span, nav p span',{
      y:0,
      stagger:.02,
      ease:"power4"
    })
  }
});
