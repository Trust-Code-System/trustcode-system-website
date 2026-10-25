"use client";
import dynamic from "next/dynamic";
import type { ComponentType } from "react";
// Component adapters supply component-specific props; upstream signatures vary.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const bitComponents: Record<string, ComponentType<any>> = {
  AccordionGallery: dynamic(
    () => import("../react-bits/AccordionGallery/AccordionGallery"),
    {
      ssr: false,
      loading: () => <div className="lab-loading">Loading experiment…</div>,
    },
  ),
  AcidSquares: dynamic(() => import("../react-bits/AcidSquares/AcidSquares"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  AeroShards: dynamic(() => import("../react-bits/AeroShards/AeroShards"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  AnimatedContent: dynamic(
    () => import("../react-bits/AnimatedContent/AnimatedContent"),
    {
      ssr: false,
      loading: () => <div className="lab-loading">Loading experiment…</div>,
    },
  ),
  AnimatedList: dynamic(
    () => import("../react-bits/AnimatedList/AnimatedList"),
    {
      ssr: false,
      loading: () => <div className="lab-loading">Loading experiment…</div>,
    },
  ),
  Antigravity: dynamic(() => import("../react-bits/Antigravity/Antigravity"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  ASCIIText: dynamic(() => import("../react-bits/ASCIIText/ASCIIText"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  Aurora: dynamic(() => import("../react-bits/Aurora/Aurora"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  Balatro: dynamic(() => import("../react-bits/Balatro/Balatro"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  Ballpit: dynamic(() => import("../react-bits/Ballpit/Ballpit"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  Beams: dynamic(() => import("../react-bits/Beams/Beams"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  BellToggle: dynamic(() => import("../react-bits/BellToggle/BellToggle"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  BlobCursor: dynamic(() => import("../react-bits/BlobCursor/BlobCursor"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  BlurText: dynamic(() => import("../react-bits/BlurText/BlurText"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  BorderGlow: dynamic(() => import("../react-bits/BorderGlow/BorderGlow"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  BounceCards: dynamic(() => import("../react-bits/BounceCards/BounceCards"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  BranchedMenu: dynamic(
    () => import("../react-bits/BranchedMenu/BranchedMenu"),
    {
      ssr: false,
      loading: () => <div className="lab-loading">Loading experiment…</div>,
    },
  ),
  BubbleMenu: dynamic(() => import("../react-bits/BubbleMenu/BubbleMenu"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  CallChip: dynamic(() => import("../react-bits/CallChip/CallChip"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  CardNav: dynamic(() => import("../react-bits/CardNav/CardNav"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  CardSwap: dynamic(() => import("../react-bits/CardSwap/CardSwap"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  Carousel: dynamic(() => import("../react-bits/Carousel/Carousel"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  ChromaGrid: dynamic(() => import("../react-bits/ChromaGrid/ChromaGrid"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  CircularCarousel: dynamic(
    () => import("../react-bits/CircularCarousel/CircularCarousel"),
    {
      ssr: false,
      loading: () => <div className="lab-loading">Loading experiment…</div>,
    },
  ),
  CircularGallery: dynamic(
    () => import("../react-bits/CircularGallery/CircularGallery"),
    {
      ssr: false,
      loading: () => <div className="lab-loading">Loading experiment…</div>,
    },
  ),
  CircularText: dynamic(
    () => import("../react-bits/CircularText/CircularText"),
    {
      ssr: false,
      loading: () => <div className="lab-loading">Loading experiment…</div>,
    },
  ),
  ClickSpark: dynamic(() => import("../react-bits/ClickSpark/ClickSpark"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  CodeSlots: dynamic(() => import("../react-bits/CodeSlots/CodeSlots"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  ColorBends: dynamic(() => import("../react-bits/ColorBends/ColorBends"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  CometDial: dynamic(() => import("../react-bits/CometDial/CometDial"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  Counter: dynamic(() => import("../react-bits/Counter/Counter"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  CountUp: dynamic(() => import("../react-bits/CountUp/CountUp"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  Crosshair: dynamic(() => import("../react-bits/Crosshair/Crosshair"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  CRTWarp: dynamic(() => import("../react-bits/CRTWarp/CRTWarp"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  CrystalizedBall: dynamic(
    () => import("../react-bits/CrystalizedBall/CrystalizedBall"),
    {
      ssr: false,
      loading: () => <div className="lab-loading">Loading experiment…</div>,
    },
  ),
  Cubes: dynamic(() => import("../react-bits/Cubes/Cubes"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  CursorGrid: dynamic(() => import("../react-bits/CursorGrid/CursorGrid"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  CurvedInput: dynamic(() => import("../react-bits/CurvedInput/CurvedInput"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  CurvedLoop: dynamic(() => import("../react-bits/CurvedLoop/CurvedLoop"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  DarkVeil: dynamic(() => import("../react-bits/DarkVeil/DarkVeil"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  DecayCard: dynamic(() => import("../react-bits/DecayCard/DecayCard"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  DecryptedText: dynamic(
    () => import("../react-bits/DecryptedText/DecryptedText"),
    {
      ssr: false,
      loading: () => <div className="lab-loading">Loading experiment…</div>,
    },
  ),
  DepthCarousel: dynamic(
    () => import("../react-bits/DepthCarousel/DepthCarousel"),
    {
      ssr: false,
      loading: () => <div className="lab-loading">Loading experiment…</div>,
    },
  ),
  DepthText: dynamic(() => import("../react-bits/DepthText/DepthText"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  Dither: dynamic(() => import("../react-bits/Dither/Dither"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  DitherVeil: dynamic(() => import("../react-bits/DitherVeil/DitherVeil"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  Dock: dynamic(() => import("../react-bits/Dock/Dock"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  DodgeField: dynamic(() => import("../react-bits/DodgeField/DodgeField"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  DomeGallery: dynamic(() => import("../react-bits/DomeGallery/DomeGallery"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  DotField: dynamic(() => import("../react-bits/DotField/DotField"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  DotGrid: dynamic(() => import("../react-bits/DotGrid/DotGrid"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  DriftWall: dynamic(() => import("../react-bits/DriftWall/DriftWall"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  EchoText: dynamic(() => import("../react-bits/EchoText/EchoText"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  ElasticMesh: dynamic(() => import("../react-bits/ElasticMesh/ElasticMesh"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  ElasticSlider: dynamic(
    () => import("../react-bits/ElasticSlider/ElasticSlider"),
    {
      ssr: false,
      loading: () => <div className="lab-loading">Loading experiment…</div>,
    },
  ),
  ElectricBorder: dynamic(
    () => import("../react-bits/ElectricBorder/ElectricBorder"),
    {
      ssr: false,
      loading: () => <div className="lab-loading">Loading experiment…</div>,
    },
  ),
  ElectricLogo: dynamic(
    () => import("../react-bits/ElectricLogo/ElectricLogo"),
    {
      ssr: false,
      loading: () => <div className="lab-loading">Loading experiment…</div>,
    },
  ),
  EvilEye: dynamic(() => import("../react-bits/EvilEye/EvilEye"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  FadeContent: dynamic(() => import("../react-bits/FadeContent/FadeContent"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  FallingText: dynamic(() => import("../react-bits/FallingText/FallingText"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  FaultyTerminal: dynamic(
    () => import("../react-bits/FaultyTerminal/FaultyTerminal"),
    {
      ssr: false,
      loading: () => <div className="lab-loading">Loading experiment…</div>,
    },
  ),
  Ferrofluid: dynamic(() => import("../react-bits/Ferrofluid/Ferrofluid"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  FlexCarousel: dynamic(
    () => import("../react-bits/FlexCarousel/FlexCarousel"),
    {
      ssr: false,
      loading: () => <div className="lab-loading">Loading experiment…</div>,
    },
  ),
  FlipCard: dynamic(() => import("../react-bits/FlipCard/FlipCard"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  FloatingLines: dynamic(
    () => import("../react-bits/FloatingLines/FloatingLines"),
    {
      ssr: false,
      loading: () => <div className="lab-loading">Loading experiment…</div>,
    },
  ),
  FlowingMenu: dynamic(() => import("../react-bits/FlowingMenu/FlowingMenu"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  FluidGlass: dynamic(() => import("../react-bits/FluidGlass/FluidGlass"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  FluxLines: dynamic(() => import("../react-bits/FluxLines/FluxLines"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  FlyingButton: dynamic(
    () => import("../react-bits/FlyingButton/FlyingButton"),
    {
      ssr: false,
      loading: () => <div className="lab-loading">Loading experiment…</div>,
    },
  ),
  FlyingPosters: dynamic(
    () => import("../react-bits/FlyingPosters/FlyingPosters"),
    {
      ssr: false,
      loading: () => <div className="lab-loading">Loading experiment…</div>,
    },
  ),
  Folder: dynamic(() => import("../react-bits/Folder/Folder"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  FolderFloat: dynamic(() => import("../react-bits/FolderFloat/FolderFloat"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  FoldText: dynamic(() => import("../react-bits/FoldText/FoldText"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  FuseButton: dynamic(() => import("../react-bits/FuseButton/FuseButton"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  FuzzyText: dynamic(() => import("../react-bits/FuzzyText/FuzzyText"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  Galaxy: dynamic(() => import("../react-bits/Galaxy/Galaxy"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  GhostCursor: dynamic(() => import("../react-bits/GhostCursor/GhostCursor"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  GhostFibers: dynamic(() => import("../react-bits/GhostFibers/GhostFibers"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  GlareHover: dynamic(() => import("../react-bits/GlareHover/GlareHover"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  GlassIcons: dynamic(() => import("../react-bits/GlassIcons/GlassIcons"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  GlassSurface: dynamic(
    () => import("../react-bits/GlassSurface/GlassSurface"),
    {
      ssr: false,
      loading: () => <div className="lab-loading">Loading experiment…</div>,
    },
  ),
  GlideSelect: dynamic(() => import("../react-bits/GlideSelect/GlideSelect"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  GlitchText: dynamic(() => import("../react-bits/GlitchText/GlitchText"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  GlowCursor: dynamic(() => import("../react-bits/GlowCursor/GlowCursor"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  GooeyNav: dynamic(() => import("../react-bits/GooeyNav/GooeyNav"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  GradientASCII: dynamic(
    () => import("../react-bits/GradientASCII/GradientASCII"),
    {
      ssr: false,
      loading: () => <div className="lab-loading">Loading experiment…</div>,
    },
  ),
  GradientBlinds: dynamic(
    () => import("../react-bits/GradientBlinds/GradientBlinds"),
    {
      ssr: false,
      loading: () => <div className="lab-loading">Loading experiment…</div>,
    },
  ),
  GradientText: dynamic(
    () => import("../react-bits/GradientText/GradientText"),
    {
      ssr: false,
      loading: () => <div className="lab-loading">Loading experiment…</div>,
    },
  ),
  GradientWaves: dynamic(
    () => import("../react-bits/GradientWaves/GradientWaves"),
    {
      ssr: false,
      loading: () => <div className="lab-loading">Loading experiment…</div>,
    },
  ),
  GradualBlur: dynamic(() => import("../react-bits/GradualBlur/GradualBlur"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  Grainient: dynamic(() => import("../react-bits/Grainient/Grainient"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  GridDistortion: dynamic(
    () => import("../react-bits/GridDistortion/GridDistortion"),
    {
      ssr: false,
      loading: () => <div className="lab-loading">Loading experiment…</div>,
    },
  ),
  GridMotion: dynamic(() => import("../react-bits/GridMotion/GridMotion"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  GridScan: dynamic(() => import("../react-bits/GridScan/GridScan"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  HalftoneReveal: dynamic(
    () => import("../react-bits/HalftoneReveal/HalftoneReveal"),
    {
      ssr: false,
      loading: () => <div className="lab-loading">Loading experiment…</div>,
    },
  ),
  HoldButton: dynamic(() => import("../react-bits/HoldButton/HoldButton"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  HoloCard: dynamic(() => import("../react-bits/HoloCard/HoloCard"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  Hyperspeed: dynamic(() => import("../react-bits/Hyperspeed/Hyperspeed"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  ImageTrail: dynamic(() => import("../react-bits/ImageTrail/ImageTrail"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  InfiniteMenu: dynamic(
    () => import("../react-bits/InfiniteMenu/InfiniteMenu"),
    {
      ssr: false,
      loading: () => <div className="lab-loading">Loading experiment…</div>,
    },
  ),
  InfiniteSpiral: dynamic(
    () => import("../react-bits/InfiniteSpiral/InfiniteSpiral"),
    {
      ssr: false,
      loading: () => <div className="lab-loading">Loading experiment…</div>,
    },
  ),
  Iridescence: dynamic(() => import("../react-bits/Iridescence/Iridescence"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  JellyRadio: dynamic(() => import("../react-bits/JellyRadio/JellyRadio"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  Lanyard: dynamic(() => import("../react-bits/Lanyard/Lanyard"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  LaserFlow: dynamic(() => import("../react-bits/LaserFlow/LaserFlow"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  LatticeLoader: dynamic(
    () => import("../react-bits/LatticeLoader/LatticeLoader"),
    {
      ssr: false,
      loading: () => <div className="lab-loading">Loading experiment…</div>,
    },
  ),
  LetterGlitch: dynamic(
    () => import("../react-bits/LetterGlitch/LetterGlitch"),
    {
      ssr: false,
      loading: () => <div className="lab-loading">Loading experiment…</div>,
    },
  ),
  Lightfall: dynamic(() => import("../react-bits/Lightfall/Lightfall"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  Lightning: dynamic(() => import("../react-bits/Lightning/Lightning"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  LightPillar: dynamic(() => import("../react-bits/LightPillar/LightPillar"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  LightRays: dynamic(() => import("../react-bits/LightRays/LightRays"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  LightTunnel: dynamic(() => import("../react-bits/LightTunnel/LightTunnel"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  LineSidebar: dynamic(() => import("../react-bits/LineSidebar/LineSidebar"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  LineWaves: dynamic(() => import("../react-bits/LineWaves/LineWaves"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  LiquidChrome: dynamic(
    () => import("../react-bits/LiquidChrome/LiquidChrome"),
    {
      ssr: false,
      loading: () => <div className="lab-loading">Loading experiment…</div>,
    },
  ),
  LiquidEther: dynamic(() => import("../react-bits/LiquidEther/LiquidEther"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  LogoLoop: dynamic(() => import("../react-bits/LogoLoop/LogoLoop"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  MagicBento: dynamic(() => import("../react-bits/MagicBento/MagicBento"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  MagicRings: dynamic(() => import("../react-bits/MagicRings/MagicRings"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  Magnet: dynamic(() => import("../react-bits/Magnet/Magnet"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  MagnetLines: dynamic(() => import("../react-bits/MagnetLines/MagnetLines"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  MaskedHeading: dynamic(
    () => import("../react-bits/MaskedHeading/MaskedHeading"),
    {
      ssr: false,
      loading: () => <div className="lab-loading">Loading experiment…</div>,
    },
  ),
  Masonry: dynamic(() => import("../react-bits/Masonry/Masonry"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  MetaBalls: dynamic(() => import("../react-bits/MetaBalls/MetaBalls"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  MetallicPaint: dynamic(
    () => import("../react-bits/MetallicPaint/MetallicPaint"),
    {
      ssr: false,
      loading: () => <div className="lab-loading">Loading experiment…</div>,
    },
  ),
  MicroSlats: dynamic(() => import("../react-bits/MicroSlats/MicroSlats"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  ModelViewer: dynamic(() => import("../react-bits/ModelViewer/ModelViewer"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  MoltenMetal: dynamic(() => import("../react-bits/MoltenMetal/MoltenMetal"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  MorphSlider: dynamic(() => import("../react-bits/MorphSlider/MorphSlider"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  Noise: dynamic(() => import("../react-bits/Noise/Noise"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  OptionWheel: dynamic(() => import("../react-bits/OptionWheel/OptionWheel"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  Orb: dynamic(() => import("../react-bits/Orb/Orb"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  OrbitImages: dynamic(() => import("../react-bits/OrbitImages/OrbitImages"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  PaperCrumple: dynamic(
    () => import("../react-bits/PaperCrumple/PaperCrumple"),
    {
      ssr: false,
      loading: () => <div className="lab-loading">Loading experiment…</div>,
    },
  ),
  Particles: dynamic(() => import("../react-bits/Particles/Particles"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  ParticleText: dynamic(
    () => import("../react-bits/ParticleText/ParticleText"),
    {
      ssr: false,
      loading: () => <div className="lab-loading">Loading experiment…</div>,
    },
  ),
  PatternWaves: dynamic(
    () => import("../react-bits/PatternWaves/PatternWaves"),
    {
      ssr: false,
      loading: () => <div className="lab-loading">Loading experiment…</div>,
    },
  ),
  PeekRating: dynamic(() => import("../react-bits/PeekRating/PeekRating"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  PillNav: dynamic(() => import("../react-bits/PillNav/PillNav"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  PixelBlast: dynamic(() => import("../react-bits/PixelBlast/PixelBlast"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  PixelCard: dynamic(() => import("../react-bits/PixelCard/PixelCard"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  PixelSnow: dynamic(() => import("../react-bits/PixelSnow/PixelSnow"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  PixelSwap: dynamic(() => import("../react-bits/PixelSwap/PixelSwap"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  PixelTrail: dynamic(() => import("../react-bits/PixelTrail/PixelTrail"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  PixelTransition: dynamic(
    () => import("../react-bits/PixelTransition/PixelTransition"),
    {
      ssr: false,
      loading: () => <div className="lab-loading">Loading experiment…</div>,
    },
  ),
  Plasma: dynamic(() => import("../react-bits/Plasma/Plasma"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  PlasmaWave: dynamic(() => import("../react-bits/PlasmaWave/PlasmaWave"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  Prism: dynamic(() => import("../react-bits/Prism/Prism"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  PrismaticBurst: dynamic(
    () => import("../react-bits/PrismaticBurst/PrismaticBurst"),
    {
      ssr: false,
      loading: () => <div className="lab-loading">Loading experiment…</div>,
    },
  ),
  ProfileCard: dynamic(() => import("../react-bits/ProfileCard/ProfileCard"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  PromptBar: dynamic(() => import("../react-bits/PromptBar/PromptBar"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  PulseHeart: dynamic(() => import("../react-bits/PulseHeart/PulseHeart"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  Radar: dynamic(() => import("../react-bits/Radar/Radar"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  RefineFrame: dynamic(() => import("../react-bits/RefineFrame/RefineFrame"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  ReflectiveCard: dynamic(
    () => import("../react-bits/ReflectiveCard/ReflectiveCard"),
    {
      ssr: false,
      loading: () => <div className="lab-loading">Loading experiment…</div>,
    },
  ),
  Ribbons: dynamic(() => import("../react-bits/Ribbons/Ribbons"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  RippleDistortion: dynamic(
    () => import("../react-bits/RippleDistortion/RippleDistortion"),
    {
      ssr: false,
      loading: () => <div className="lab-loading">Loading experiment…</div>,
    },
  ),
  RippleGrid: dynamic(() => import("../react-bits/RippleGrid/RippleGrid"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  RotatingText: dynamic(
    () => import("../react-bits/RotatingText/RotatingText"),
    {
      ssr: false,
      loading: () => <div className="lab-loading">Loading experiment…</div>,
    },
  ),
  RubberSegment: dynamic(
    () => import("../react-bits/RubberSegment/RubberSegment"),
    {
      ssr: false,
      loading: () => <div className="lab-loading">Loading experiment…</div>,
    },
  ),
  Scanner: dynamic(() => import("../react-bits/Scanner/Scanner"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  ScrambledText: dynamic(
    () => import("../react-bits/ScrambledText/ScrambledText"),
    {
      ssr: false,
      loading: () => <div className="lab-loading">Loading experiment…</div>,
    },
  ),
  ScrollExpand: dynamic(
    () => import("../react-bits/ScrollExpand/ScrollExpand"),
    {
      ssr: false,
      loading: () => <div className="lab-loading">Loading experiment…</div>,
    },
  ),
  ScrollFloat: dynamic(() => import("../react-bits/ScrollFloat/ScrollFloat"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  ScrollReveal: dynamic(
    () => import("../react-bits/ScrollReveal/ScrollReveal"),
    {
      ssr: false,
      loading: () => <div className="lab-loading">Loading experiment…</div>,
    },
  ),
  ScrollStack: dynamic(() => import("../react-bits/ScrollStack/ScrollStack"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  ScrollVelocity: dynamic(
    () => import("../react-bits/ScrollVelocity/ScrollVelocity"),
    {
      ssr: false,
      loading: () => <div className="lab-loading">Loading experiment…</div>,
    },
  ),
  ScrubField: dynamic(() => import("../react-bits/ScrubField/ScrubField"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  ShapeBlur: dynamic(() => import("../react-bits/ShapeBlur/ShapeBlur"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  ShapeGrid: dynamic(() => import("../react-bits/ShapeGrid/ShapeGrid"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  ShapeWaves: dynamic(() => import("../react-bits/ShapeWaves/ShapeWaves"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  ShinyText: dynamic(() => import("../react-bits/ShinyText/ShinyText"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  Shredder: dynamic(() => import("../react-bits/Shredder/Shredder"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  Shuffle: dynamic(() => import("../react-bits/Shuffle/Shuffle"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  SideRays: dynamic(() => import("../react-bits/SideRays/SideRays"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  Silk: dynamic(() => import("../react-bits/Silk/Silk"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  SlicedWaves: dynamic(() => import("../react-bits/SlicedWaves/SlicedWaves"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  SlideCommit: dynamic(() => import("../react-bits/SlideCommit/SlideCommit"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  SlingButton: dynamic(() => import("../react-bits/SlingButton/SlingButton"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  SloshGauge: dynamic(() => import("../react-bits/SloshGauge/SloshGauge"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  SoftAurora: dynamic(() => import("../react-bits/SoftAurora/SoftAurora"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  SpecularButton: dynamic(
    () => import("../react-bits/SpecularButton/SpecularButton"),
    {
      ssr: false,
      loading: () => <div className="lab-loading">Loading experiment…</div>,
    },
  ),
  SplashCursor: dynamic(
    () => import("../react-bits/SplashCursor/SplashCursor"),
    {
      ssr: false,
      loading: () => <div className="lab-loading">Loading experiment…</div>,
    },
  ),
  SplitFlapText: dynamic(
    () => import("../react-bits/SplitFlapText/SplitFlapText"),
    {
      ssr: false,
      loading: () => <div className="lab-loading">Loading experiment…</div>,
    },
  ),
  SplitText: dynamic(() => import("../react-bits/SplitText/SplitText"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  SpotlightCard: dynamic(
    () => import("../react-bits/SpotlightCard/SpotlightCard"),
    {
      ssr: false,
      loading: () => <div className="lab-loading">Loading experiment…</div>,
    },
  ),
  SpringCheck: dynamic(() => import("../react-bits/SpringCheck/SpringCheck"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  SquishSwitch: dynamic(
    () => import("../react-bits/SquishSwitch/SquishSwitch"),
    {
      ssr: false,
      loading: () => <div className="lab-loading">Loading experiment…</div>,
    },
  ),
  Stack: dynamic(() => import("../react-bits/Stack/Stack"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  StaggeredMenu: dynamic(
    () => import("../react-bits/StaggeredMenu/StaggeredMenu"),
    {
      ssr: false,
      loading: () => <div className="lab-loading">Loading experiment…</div>,
    },
  ),
  StarBorder: dynamic(() => import("../react-bits/StarBorder/StarBorder"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  StatusMark: dynamic(() => import("../react-bits/StatusMark/StatusMark"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  Stepper: dynamic(() => import("../react-bits/Stepper/Stepper"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  StickerPeel: dynamic(() => import("../react-bits/StickerPeel/StickerPeel"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  Strands: dynamic(() => import("../react-bits/Strands/Strands"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  StrokeText: dynamic(() => import("../react-bits/StrokeText/StrokeText"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  SwarmCursor: dynamic(() => import("../react-bits/SwarmCursor/SwarmCursor"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  SwipeRow: dynamic(() => import("../react-bits/SwipeRow/SwipeRow"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  SwipeToast: dynamic(() => import("../react-bits/SwipeToast/SwipeToast"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  TargetCursor: dynamic(
    () => import("../react-bits/TargetCursor/TargetCursor"),
    {
      ssr: false,
      loading: () => <div className="lab-loading">Loading experiment…</div>,
    },
  ),
  TearTicket: dynamic(() => import("../react-bits/TearTicket/TearTicket"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  TechText: dynamic(() => import("../react-bits/TechText/TechText"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  TextCursor: dynamic(() => import("../react-bits/TextCursor/TextCursor"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  TextLoop: dynamic(() => import("../react-bits/TextLoop/TextLoop"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  TextPressure: dynamic(
    () => import("../react-bits/TextPressure/TextPressure"),
    {
      ssr: false,
      loading: () => <div className="lab-loading">Loading experiment…</div>,
    },
  ),
  TextType: dynamic(() => import("../react-bits/TextType/TextType"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  ThoughtLine: dynamic(() => import("../react-bits/ThoughtLine/ThoughtLine"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  Threads: dynamic(() => import("../react-bits/Threads/Threads"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  TiltedCard: dynamic(() => import("../react-bits/TiltedCard/TiltedCard"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  Topography: dynamic(() => import("../react-bits/Topography/Topography"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  TrueFocus: dynamic(() => import("../react-bits/TrueFocus/TrueFocus"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  VariableProximity: dynamic(
    () => import("../react-bits/VariableProximity/VariableProximity"),
    {
      ssr: false,
      loading: () => <div className="lab-loading">Loading experiment…</div>,
    },
  ),
  VoicePill: dynamic(() => import("../react-bits/VoicePill/VoicePill"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  WakeSlider: dynamic(() => import("../react-bits/WakeSlider/WakeSlider"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  WarmTooltip: dynamic(() => import("../react-bits/WarmTooltip/WarmTooltip"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  WarpText: dynamic(() => import("../react-bits/WarpText/WarpText"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  Waves: dynamic(() => import("../react-bits/Waves/Waves"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
  WebThreads: dynamic(() => import("../react-bits/WebThreads/WebThreads"), {
    ssr: false,
    loading: () => <div className="lab-loading">Loading experiment…</div>,
  }),
};
