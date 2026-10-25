/* Lab image surfaces intentionally use native images for upstream canvas sampling. */
/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from "react";
const shots = [
  "9th-luxe",
  "wearables-atelier",
  "helping-tribe-academy",
  "the-thesis-desk",
  "aureo",
  "studycoach",
].map((s) => `/work/${s}.png`);
const labels = [
  "Digital commerce",
  "Product engineering",
  "Learning platforms",
  "Research tools",
  "Financial systems",
  "Intelligent products",
];
const pictureItems = shots.map((image, i) => ({
  id: String(i),
  image,
  src: image,
  img: image,
  alt: labels[i],
  text: labels[i],
  title: labels[i],
  label: labels[i],
  description: "From the TrustCode team portfolio",
  subtitle: "Designed and engineered with intent.",
  link: "#",
  url: "#",
  href: "#",
  height: 230 + (i % 2) * 60,
  width: 360,
}));
const textNames = new Set([
  "ASCIIText",
  "BlurText",
  "CircularText",
  "CurvedLoop",
  "DecryptedText",
  "DepthText",
  "EchoText",
  "FallingText",
  "FoldText",
  "MaskedHeading",
  "ParticleText",
  "Shuffle",
  "SplitFlapText",
  "SplitText",
  "StrokeText",
  "TechText",
  "TextPressure",
  "WarpText",
]);
const childTextNames = new Set([
  "FuzzyText",
  "GlitchText",
  "GradientText",
  "ScrambledText",
  "ScrollFloat",
  "ScrollReveal",
  "ShinyText",
  "VariableProximity",
]);
export function sampleProps(
  name: string,
  onAction: (message: string) => void,
): Record<string, unknown> {
  const props: Record<string, unknown> = {};
  if (textNames.has(name))
    Object.assign(props, {
      text: "Build with trust.",
      className: "lab-display-type",
    });
  if (childTextNames.has(name))
    Object.assign(props, {
      children: "Build with trust.",
      className: "lab-display-type",
    });
  if (
    [
      "AnimatedContent",
      "FadeContent",
      "ElectricBorder",
      "GlareHover",
      "Magnet",
      "StarBorder",
      "SpotlightCard",
      "BorderGlow",
      "PixelCard",
      "GlassSurface",
      "GradualBlur",
      "ClickSpark",
    ].includes(name)
  )
    props.children = (
      <div className="lab-sample-card">
        <span>TRUSTCODE / EXPLORATIONS</span>
        <strong>
          Every detail.
          <br />
          Considered.
        </strong>
        <p>Move your pointer. Click. Discover.</p>
      </div>
    );
  if (
    [
      "AccordionGallery",
      "ChromaGrid",
      "CircularCarousel",
      "CircularGallery",
      "DepthCarousel",
      "DriftWall",
      "FlexCarousel",
      "InfiniteMenu",
      "InfiniteSpiral",
      "Masonry",
      "MorphSlider",
      "Carousel",
    ].includes(name)
  )
    props.items = pictureItems;
  if (
    ["DomeGallery", "OrbitImages", "BounceCards", "ImageTrail"].includes(name)
  )
    props.images = shots;
  if (["FlyingPosters", "GridMotion"].includes(name))
    props.items = pictureItems;
  if (["GridDistortion", "StickerPeel"].includes(name))
    props.imageSrc = shots[0];
  if (
    [
      "DitherVeil",
      "HalftoneReveal",
      "ScrollExpand",
      "ShapeBlur",
      "PaperCrumple",
      "RippleDistortion",
    ].includes(name)
  )
    props.src = shots[0];
  if (["DecayCard", "HoloCard"].includes(name)) props.image = shots[0];
  if (["ElectricLogo", "ElasticMesh"].includes(name)) props.src = "/icon.svg";
  if (name === "MetallicPaint") props.imageSrc = "/icon.svg";
  switch (name) {
    case "RotatingText":
      return {
        texts: ["Design.", "Engineer.", "Deliver."],
        mainClassName: "lab-display-type",
        rotationInterval: 2000,
      };
    case "TextType":
      return {
        text: [
          "Software you can trust.",
          "Designed to move you.",
          "Built to move you forward.",
        ],
        className: "lab-display-type",
      };
    case "TextLoop":
      return { text: "TRUSTCODE · BUILD WITH TRUST · ", fontSize: 50 };
    case "TextCursor":
      return { text: "BUILD" };
    case "CountUp":
      return {
        to: 218,
        duration: 2,
        mode: "roll",
        className: "lab-display-type",
      };
    case "Counter":
      return { value: 218, fontSize: 70 };
    case "ScrollVelocity":
      return {
        texts: ["TRUSTCODE", "DESIGN · ENGINEERING"],
        className: "lab-display-type",
      };
    case "TrueFocus":
      return { sentence: "Design Engineer Deliver", manualMode: false };
    case "LogoLoop":
      return {
        logos: labels.map((text) => ({
          node: <span className="lab-loop-label">{text}</span>,
        })),
        speed: 40,
        logoHeight: 25,
        gap: 40,
      };
    case "PixelTransition":
      return {
        firstContent: (
          <div className="lab-sample-card">
            <strong>What if?</strong>
          </div>
        ),
        secondContent: (
          <div className="lab-sample-card">
            <strong>Let’s build it.</strong>
          </div>
        ),
        style: { width: 330, height: 280 },
      };
    case "PixelSwap":
      return {
        firstContent: (
          <div className="lab-sample-card">
            <strong>Explore.</strong>
          </div>
        ),
        secondContent: (
          <div className="lab-sample-card">
            <strong>Discover.</strong>
          </div>
        ),
        children: (
          <div className="lab-sample-card">
            <strong>Explore.</strong>
          </div>
        ),
      };
    case "TiltedCard":
      return {
        imageSrc: shots[0],
        altText: "9th Luxe portfolio screenshot",
        containerWidth: "300px",
        containerHeight: "300px",
        imageWidth: "300px",
        imageHeight: "300px",
        captionText: "Design in every detail.",
        showTooltip: true,
      };
    case "ProfileCard":
      return {
        avatarUrl: "/team/abass-ibrahim.jpg",
        name: "TrustCode",
        title: "Design & Engineering",
        handle: "trustcodesys",
        status: "Building with intent",
        contactText: "Say hello",
        onContactClick: () =>
          onAction("Hello from the TrustCode interaction lab."),
      };
    case "HoloCard":
      return { ...props, width: 260 };
    case "Lanyard":
      return {
        frontImage: "/trustcode-system-logo-dark.png",
        backImage: shots[0],
        size: 1.2,
      };
    case "ModelViewer":
      return {
        url: "/lab/trust-shape.gltf",
        width: "100%",
        height: 420,
        environment: "studio",
        autoRotate: true,
      };
    case "Stack":
      return {
        cards: shots
          .slice(0, 4)
          .map((src, i) => (
            <img
              key={src}
              src={src}
              alt={labels[i]}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          )),
        style: { width: 270, height: 300 },
      };
    case "CardSwap":
      return {
        width: 300,
        height: 240,
        children: labels.slice(0, 3).map((t) => (
          <div key={t} className="lab-sample-card">
            <strong>{t}</strong>
          </div>
        )),
      };
    case "ScrollStack":
      return {
        children: labels.slice(0, 3).map((t) => (
          <div className="scroll-stack-card lab-sample-card" key={t}>
            <strong>{t}</strong>
          </div>
        )),
      };
    case "CardNav":
      return {
        logo: <span>TrustCode</span>,
        items: [
          {
            label: "Explore",
            bgColor: "#15233c",
            textColor: "#fff",
            links: [
              { label: "Work", href: "/work" },
              { label: "Expertise", href: "/services" },
            ],
          },
          {
            label: "Connect",
            bgColor: "#24354c",
            textColor: "#fff",
            links: [
              { label: "Studio", href: "/about" },
              { label: "Contact", href: "/contact" },
            ],
          },
        ],
        defaultOpen: true,
        maxWidth: 650,
      };
    case "PillNav":
      return {
        items: [
          { label: "Work", href: "#work" },
          { label: "Studio", href: "#studio" },
          { label: "Contact", href: "#contact" },
        ],
        collapse: "never",
        onItemClick: (
          item: { label: string },
          _: number,
          e: React.MouseEvent,
        ) => {
          e.preventDefault();
          onAction(`${item.label} selected in this navigation demo.`);
        },
      };
    case "GooeyNav":
      return {
        items: [
          { label: "Design", link: "#design" },
          { label: "Build", link: "#build" },
          { label: "Ship", link: "#ship" },
        ],
        initialActiveIndex: 0,
      };
    case "BubbleMenu":
      return {
        logo: <span>TC</span>,
        items: [
          { label: "Design", href: "#design" },
          { label: "Engineer", href: "#engineer" },
          { label: "Deliver", href: "#deliver" },
        ],
      };
    case "StaggeredMenu":
      return {
        items: [
          { label: "Work", link: "/work" },
          { label: "Studio", link: "/about" },
          { label: "Contact", link: "/contact" },
        ],
        position: "right",
        isFixed: false,
        displaySocials: false,
        displayItemNumbering: true,
        logoUrl: "/trustcode-system-logo-dark.png",
      };
    case "FlowingMenu":
      return {
        items: pictureItems
          .slice(0, 3)
          .map((i) => ({ link: "#", text: i.title, image: i.image })),
      };
    case "Dock":
      return {
        items: ["⌘", "◇", "✳", "↗"].map((icon, i) => ({
          icon: <span>{icon}</span>,
          label: labels[i],
          onClick: () => onAction(`${labels[i]} opened in the demo.`),
        })),
        baseItemSize: 48,
      };
    case "GlassIcons":
      return {
        items: ["⌘", "◇", "✳", "↗"].map((icon, i) => ({
          icon: <span>{icon}</span>,
          color: ["blue", "purple", "green", "indigo"][i],
          label: labels[i],
        })),
      };
    case "AnimatedList":
    case "LineSidebar":
    case "OptionWheel":
      return {
        items: labels,
        onItemSelect: (_: unknown, i: number) =>
          onAction(`${labels[i]} selected.`),
        onChange: (_: number, item: string) => onAction(`${item} selected.`),
      };
    case "Folder":
      return {
        color: "#6d9df4",
        size: 1.5,
        items: shots
          .slice(0, 3)
          .map((src, i) => <img key={src} src={src} alt={labels[i]} />),
      };
    case "FolderFloat":
      return {
        items: labels.slice(0, 4),
        label: "TrustCode explorations",
        onSelect: (value: string) => onAction(`${value} selected.`),
      };
    case "FlipCard":
      return {
        front: (
          <div className="lab-sample-card">
            <strong>Good design.</strong>
            <p>Click or drag to turn.</p>
          </div>
        ),
        back: (
          <div className="lab-sample-card">
            <strong>Strong engineering.</strong>
            <p>Two sides. One system.</p>
          </div>
        ),
        width: 280,
        height: 330,
      };
    case "TearTicket":
      return {
        children: (
          <div style={{ padding: 30 }}>
            <strong>YOUR NEXT BIG IDEA</strong>
            <p>TrustCode / Interaction Lab</p>
          </div>
        ),
        stub: <span style={{ padding: 20 }}>TEAR HERE ↗</span>,
        width: 350,
        height: 210,
      };
    case "Shredder":
      return {
        items: [
          "Old assumptions",
          "Unnecessary friction",
          "Ordinary experiences",
        ],
        renderItem: (item: ReactNode) => <span>{item}</span>,
        onChange: () => onAction("Demo item removed. Replay to reset."),
      };
    case "RubberSegment":
      return {
        items: labels
          .slice(0, 3)
          .map((label, i) => ({ label, value: String(i) })),
        defaultValue: "0",
        onChange: (value: string) =>
          onAction(`${labels[Number(value)]} selected.`),
      };
    case "WarmTooltip":
      return {
        content: "Thoughtful details make the difference.",
        children: (
          <button className="button-solid">Hover or focus here ↗</button>
        ),
      };
    case "VoicePill":
      return {
        reactive: "simulated",
        onStart: () =>
          onAction("Simulated voice interaction. No microphone is used."),
      };
    case "PromptBar":
      return {
        placeholder: "Describe what you’d like to build…",
        width: 550,
        onSend: (text: string) => onAction(`Demo message: ${text}`),
        onDictate: () => {
          onAction("Dictation is simulated in this visual demo.");
          return "A remarkable new product.";
        },
        onAttach: () => {
          onAction("Attachments are simulated in this demo.");
          return "project-brief.pdf";
        },
      };
    case "Stepper":
      return {
        children: labels.slice(0, 3).map((label, i) => (
          <div key={label} title={label} className="lab-sample-card">
            <span>0{i + 1} / THE PROCESS</span>
            <strong>{label}</strong>
            <p>Clear milestones, considered details.</p>
          </div>
        )),
        width: 450,
        onFinalStepCompleted: () =>
          onAction("All demo steps completed. Replay to restart."),
      };
    case "SpecularButton":
    case "FlyingButton":
    case "SlingButton":
    case "HoldButton":
    case "FuseButton":
    case "SlideCommit":
      return {
        children: "Build something great",
        label: "Build something great",
        onClick: () => onAction("Demo action completed."),
        onComplete: () => onAction("Demo action completed."),
        onCommit: () => onAction("Demo action committed."),
      };
    case "ReflectiveCard":
      return {
        name: "TrustCode System",
        role: "Design & Engineering",
        badge: "THE STUDIO",
        webcam: false,
        width: 300,
        height: 360,
      };
    case "SloshGauge":
      return { defaultValue: 65, interactive: true, width: 200, height: 280 };
    case "RefineFrame":
      return {
        status: "refining",
        width: 450,
        children: (
          <img
            src={shots[0]}
            alt="9th Luxe portfolio screenshot"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ),
      };
    case "PaperCrumple":
      return { ...props, width: 300, height: 340 };
    case "MagicBento":
      return {
        enableStars: true,
        enableSpotlight: true,
        enableBorderGlow: true,
        enableTilt: true,
        clickEffect: true,
      };
    default:
      return props;
  }
}
