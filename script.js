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
  let TotalCounts = Counts1.length;
  let CurrentCount = 0;

  function ShowLoading() {
    const CurrentCount1 = Counts1[CurrentCount];
    const CurrentCount2 = Counts2[CurrentCount];
    const PrevCount1 = CurrentCount1?.previousElementSibling;
    const PrevCount2 = CurrentCount2?.previousElementSibling;
    if (PrevCount1) {
      gsap.to(PrevCount1, {
        left: "100%",
      });
    }
    if (PrevCount2) {
      gsap.to(PrevCount2, {
        left: "100%",
      });
    }
    gsap.to([CurrentCount1, CurrentCount2], {
      left: 0,
    });
    console.log((TotalLoaded - (CounterBounds.width / innerWidth)))
    gsap.to(Counter, {
      left: (TotalLoaded - (CounterBounds.width / innerWidth) * TotalLoaded) + "%",
    });
    CurrentCount++;
  }
  ShowLoading();
  setInterval(() => {
    if (TotalLoaded < 85) {
      TotalLoaded += 23;
      LoadedText = TotalLoaded.toString();
      ShowLoading();
    } else if (TotalLoaded < 99) {
      TotalLoaded = 99;
      LoadedText = TotalLoaded.toString();
      ShowLoading();
    }
  }, 2000);
});
