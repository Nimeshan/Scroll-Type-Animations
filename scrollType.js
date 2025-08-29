gsap.registerPlugin(ScrollTrigger);
Splitting();

// --- Lenis smooth scrolling ---
const lenis = new Lenis({ lerp: 0.2, smooth: true });
const scrollFn = (time) => { lenis.raf(time); requestAnimationFrame(scrollFn); };
requestAnimationFrame(scrollFn);
lenis.on("scroll", () => ScrollTrigger.update());

// --- Cache elements once ---
const types = Array.from({ length: 10 }, (_, i) =>
  gsap.utils.toArray(`[data-splitting][data-effect${i + 1}]`)
);

// --- Helper: set perspective once per type ---
const setPerspective = (elements, value) =>
  elements.forEach(el => (el.style.perspective = value));

// --- Animations ---
const scroll = () => {
  // Type 1
  types[0].forEach(title => {
    const words = title.querySelectorAll(".word");

    gsap.fromTo(title, { transformOrigin: "0% 50%", rotate: 3 }, {
      rotate: 0,
      ease: "none",
      scrollTrigger: { trigger: title, start: "top bottom", end: "top top", scrub: true }
    });

    gsap.fromTo(words, { opacity: 0.1 }, {
      opacity: 1,
      ease: "none",
      stagger: 0.05,
      scrollTrigger: { trigger: title, start: "top bottom-=20%", end: "center top+=20%", scrub: true }
    });
  });

  // Type 2
  types[1].forEach(title => {
    const chars = title.querySelectorAll(".char");
    setPerspective([title], 1000);

    const randomRot = Array.from(chars).map(() => gsap.utils.random(-120, 120));
    const randomZ = Array.from(chars).map(() => gsap.utils.random(-200, 200));

    gsap.fromTo(chars, {
      opacity: 0,
      rotateX: i => randomRot[i],
      z: i => randomZ[i]
    }, {
      opacity: 1,
      rotateX: 0,
      z: 0,
      ease: "none",
      stagger: 0.02,
      scrollTrigger: { trigger: title, start: "top bottom", end: "bottom top", scrub: true }
    });
  });

  // Type 3
  types[2].forEach(title => {
    const chars = title.querySelectorAll(".char");
    setPerspective([title], 1000);

    gsap.fromTo(chars, { opacity: 0.2, z: -800 }, {
      opacity: 1,
      z: 0,
      ease: "back.out(1.2)",
      stagger: 0.04,
      scrollTrigger: { trigger: title, start: "top bottom", end: "bottom top", scrub: true }
    });
  });

  // Type 4
  types[3].forEach(title => {
    const chars = title.querySelectorAll(".char");
    setPerspective([title], 1000);

    gsap.fromTo(chars, {
      opacity: 0,
      rotationX: -90,
      z: -200,
      transformOrigin: "50% 0%"
    }, {
      opacity: 1,
      rotationX: 0,
      z: 0,
      ease: "power1",
      stagger: 0.05,
      scrollTrigger: { trigger: title, start: "center bottom", end: "bottom top+=20%", scrub: true }
    });
  });

  // Type 5
  types[4].forEach(title => {
    const chars = title.querySelectorAll(".char");
    setPerspective([title], 1000);

    gsap.fromTo(chars, {
      opacity: 0,
      rotationX: 90,
      transformOrigin: "50% 100%"
    }, {
      opacity: 1,
      rotationX: 0,
      ease: "power4",
      stagger: { each: 0.03, from: "random" },
      scrollTrigger: { trigger: title, start: "center bottom", end: "bottom top+=20%", scrub: true }
    });
  });

  // Type 6
  types[5].forEach(title => {
    const words = title.querySelectorAll(".word");

    words.forEach(word => {
      const chars = word.querySelectorAll(".char");
      const mid = chars.length / 2;
      setPerspective([word], 2000);

      const randomZ = Array.from(chars).map(() => gsap.utils.random(-1500, -600));
      const randomRotX = Array.from(chars).map(() => gsap.utils.random(-500, -200));

      gsap.fromTo(chars, {
        opacity: 0,
        y: i => -40 * Math.abs(i - mid),
        z: i => randomZ[i],
        rotationX: i => randomRotX[i]
      }, {
        opacity: 1,
        y: 0, z: 0, rotationX: 0,
        ease: "power1.inOut",
        stagger: { each: 0.06, from: "center" },
        scrollTrigger: { trigger: word, start: "top bottom", end: "top top+=15%", scrub: true }
      });
    });
  });

  // Type 7
  types[6].forEach(title => {
    const chars = title.querySelectorAll(".char");
    const N = chars.length;
    const yVals = Array.from(chars).map((_, i) => {
      const f = i < N/2 ? i : N/2 - Math.abs(Math.floor(N/2)-i)-1;
      return (N/2 - f + 6)*130;
    });

    gsap.fromTo(chars, { y: i => yVals[i] }, {
      y: 0,
      ease: "elastic.out(.4)",
      stagger: { amount: 0.1, from: "center" },
      scrollTrigger: { trigger: title, start: "top bottom", end: "bottom top-=50%", scrub: true }
    });
  });

  // Type 8
  types[7].forEach(title => {
    const chars = title.querySelectorAll(".char");

    gsap.fromTo(chars, { scaleY: 0, transformOrigin: "50% 100%" }, {
      opacity: 1,
      scaleY: 1,
      ease: "power3.in",
      stagger: 0.05,
      scrollTrigger: { trigger: title, start: "center center", end: "+=500%", scrub: true, pin: title.parentNode }
    });
  });

  // Type 9
  types[8].forEach(title => {
    const words = title.querySelectorAll(".word");

    words.forEach(word => {
      const chars = word.querySelectorAll(".char");
      const N = chars.length;

      const scaleVals = Array.from(chars).map((_, i) => {
        const f = i < N/2 ? i : N/2 - Math.abs(Math.floor(N/2)-i)-1;
        return gsap.utils.mapRange(0, N/2, 0.5, 2.1, f);
      });

      const yVals = Array.from(chars).map((_, i) => {
        const f = i < N/2 ? i : N/2 - Math.abs(Math.floor(N/2)-i)-1;
        return gsap.utils.mapRange(0, N/2, 0, 60, f);
      });

      const rotVals = Array.from(chars).map((_, i) => {
        const f = i < N/2 ? i : N/2 - Math.abs(Math.floor(N/2)-i)-1;
        return i < N/2 ? gsap.utils.mapRange(0, N/2, -4,0,f) : gsap.utils.mapRange(0, N/2,0,4,f);
      });

      gsap.fromTo(chars, {
        scale: i => scaleVals[i],
        y: i => yVals[i],
        rotation: i => rotVals[i],
        filter: "blur(12px) opacity(0)",
        transformOrigin: "50% 100%"
      }, {
        scale: 1, y:0, rotation:0, filter:"blur(0px) opacity(1)",
        ease: "power2.inOut",
        stagger: { amount:0.15, from:"center" },
        scrollTrigger: { trigger: word, start:"top bottom+=40%", end:"top top+=15%", scrub:true }
      });
    });
  });

  // Type 10
  types[9].forEach(title => {
    const words = title.querySelectorAll(".word");
    setPerspective(words, 1000);

    const randZ = Array.from(words).map(() => gsap.utils.random(500, 950));
    const randX = Array.from(words).map(() => gsap.utils.random(-100, 100));
    const randY = Array.from(words).map(() => gsap.utils.random(-10, 10));
    const randRot = Array.from(words).map(() => gsap.utils.random(-90, 90));

    gsap.fromTo(words, {
      z: i => randZ[i],
      opacity: 0,
      xPercent: i => randX[i],
      yPercent: i => randY[i],
      rotationX: i => randRot[i]
    }, {
      z:0, xPercent:0, yPercent:0, rotationX:0, rotationY:0, opacity:1,
      ease:"expo",
      stagger:{ each:0.006, from:"random" },
      scrollTrigger:{ trigger:title, start:"center center", end:"+=300%", scrub:true, pin:title.parentNode }
    });
  });
};

// --- Run animations ---
scroll();
