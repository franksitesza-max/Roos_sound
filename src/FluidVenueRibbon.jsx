import * as THREE from 'three';
import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshTransmissionMaterial, Preload, RoundedBox, useTexture } from '@react-three/drei';

const LOGOS = [
  { url: '/assets/venue-met-logo.webp' },
  { url: '/assets/venue-simonsberg-logo.webp' },
  { url: '/assets/venue-stellenbosch-choir-logo.webp' },
  { url: '/assets/venue-huis-marais-logo.webp' },
  { url: '/assets/venue-lavenir-logo.webp' },
  { url: '/assets/venue-zandvliet-logo.webp' },
  { url: '/assets/venue-ashanti-logo.webp' },
  { url: '/assets/venue-idiom-logo.webp', plateOpacity: 0.62, plateColor: '#d9dde2', logoScale: 0.76 },
  { url: '/assets/venue-dylan-lewis-sculpture-logo.webp', plateOpacity: 0.5, plateColor: '#e4e5e2' }
];

function createRibbonTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1400;
  canvas.height = 360;
  const ctx = canvas.getContext('2d');

  const base = ctx.createLinearGradient(0, 0, canvas.width, 0);
  base.addColorStop(0, '#08090d');
  base.addColorStop(0.34, '#10151d');
  base.addColorStop(0.68, '#111827');
  base.addColorStop(1, '#090b10');
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const warm = ctx.createRadialGradient(210, 112, 0, 210, 112, 460);
  warm.addColorStop(0, 'rgba(255, 244, 214, 0.1)');
  warm.addColorStop(1, 'rgba(255, 244, 214, 0)');
  ctx.fillStyle = warm;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const slate = ctx.createRadialGradient(700, 132, 0, 700, 132, 520);
  slate.addColorStop(0, 'rgba(152, 172, 190, 0.1)');
  slate.addColorStop(1, 'rgba(152, 172, 190, 0)');
  ctx.fillStyle = slate;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const pink = ctx.createRadialGradient(1130, 230, 0, 1130, 230, 470);
  pink.addColorStop(0, 'rgba(255, 79, 145, 0.055)');
  pink.addColorStop(1, 'rgba(255, 79, 145, 0)');
  ctx.fillStyle = pink;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const band = ctx.createLinearGradient(0, 0, canvas.width, 0);
  band.addColorStop(0, 'rgba(255,255,255,0)');
  band.addColorStop(0.18, 'rgba(255,255,255,0.06)');
  band.addColorStop(0.22, 'rgba(241,225,190,0.16)');
  band.addColorStop(0.28, 'rgba(255,255,255,0)');
  band.addColorStop(0.48, 'rgba(255,255,255,0.075)');
  band.addColorStop(0.52, 'rgba(184,197,207,0.14)');
  band.addColorStop(0.58, 'rgba(255,255,255,0)');
  band.addColorStop(0.78, 'rgba(255,255,255,0.06)');
  band.addColorStop(0.83, 'rgba(255,79,145,0.07)');
  band.addColorStop(0.9, 'rgba(255,255,255,0)');
  ctx.fillStyle = band;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.globalAlpha = 0.42;
  ctx.lineWidth = 6;
  ctx.strokeStyle = 'rgba(255,250,238,0.62)';
  ctx.beginPath();
  ctx.moveTo(-80, 230);
  ctx.bezierCurveTo(210, 76, 440, 92, 710, 206);
  ctx.bezierCurveTo(910, 290, 1060, 94, 1480, 132);
  ctx.stroke();
  ctx.globalAlpha = 0.26;
  ctx.lineWidth = 3;
  ctx.strokeStyle = 'rgba(203,214,218,0.58)';
  ctx.beginPath();
  ctx.moveTo(-40, 144);
  ctx.bezierCurveTo(280, 245, 500, 28, 760, 126);
  ctx.bezierCurveTo(980, 208, 1140, 236, 1470, 70);
  ctx.stroke();
  ctx.globalAlpha = 0.18;
  ctx.lineWidth = 4;
  ctx.strokeStyle = 'rgba(255,79,145,0.28)';
  ctx.beginPath();
  ctx.moveTo(-80, 302);
  ctx.bezierCurveTo(270, 210, 450, 288, 690, 164);
  ctx.bezierCurveTo(920, 46, 1120, 330, 1480, 214);
  ctx.stroke();
  ctx.restore();

  const shine = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  shine.addColorStop(0.1, 'rgba(255,255,255,0)');
  shine.addColorStop(0.42, 'rgba(255,255,255,0.045)');
  shine.addColorStop(0.58, 'rgba(255,255,255,0.01)');
  shine.addColorStop(0.9, 'rgba(255,255,255,0)');
  ctx.fillStyle = shine;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

function RibbonBackdrop() {
  const texture = useMemo(createRibbonTexture, []);
  const { viewport } = useThree();

  return (
    <mesh position={[0, 0, -0.7]} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

function LogoPlane({ logo, cardSize }) {
  const { url, logoScale = 0.66 } = logo;
  const texture = useTexture(url);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;

  const image = texture.image;
  const aspect = image?.width && image?.height ? image.width / image.height : 1;
  const max = cardSize * logoScale;
  const width = aspect >= 1 ? max : max * aspect;
  const height = aspect >= 1 ? max / aspect : max;

  return (
    <mesh position={[0, 0, cardSize * 0.085]} scale={[width, height, 1]}>
      <planeGeometry />
      <meshBasicMaterial map={texture} transparent toneMapped={false} />
    </mesh>
  );
}

function FluidLogoCard({ logo, index, cardSize }) {
  const ref = useRef();
  const { plateOpacity = 0.28, plateColor = '#aeb2b8' } = logo;

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.x = Math.sin(t * 0.8 + index * 0.31) * 0.035;
    ref.current.rotation.y = Math.cos(t * 0.7 + index * 0.27) * 0.08;
  });

  return (
    <group ref={ref}>
      <RoundedBox args={[cardSize, cardSize, cardSize * 0.34]} radius={cardSize * 0.16} smoothness={14}>
        <MeshTransmissionMaterial
          transmission={1}
          roughness={0.025}
          thickness={14}
          ior={1.5}
          chromaticAberration={0.26}
          anisotropy={0.16}
          anisotropicBlur={0.18}
          distortion={0.09}
          distortionScale={0.62}
          temporalDistortion={0.025}
          color="#ffffff"
          attenuationColor="#f7fbff"
          attenuationDistance={1.2}
          samples={20}
          resolution={512}
          backside
          backsideThickness={3.5}
        />
      </RoundedBox>
      <RoundedBox
        args={[cardSize * 0.84, cardSize * 0.84, cardSize * 0.028]}
        radius={cardSize * 0.13}
        smoothness={14}
        position={[0, 0, cardSize * 0.185]}
      >
        <meshBasicMaterial
          transparent
          opacity={plateOpacity}
          color={plateColor}
          depthWrite={false}
        />
      </RoundedBox>
      <RoundedBox
        args={[cardSize * 1.006, cardSize * 1.006, cardSize * 0.035]}
        radius={cardSize * 0.16}
        smoothness={14}
        position={[0, 0, cardSize * 0.19]}
      >
        <meshBasicMaterial
          transparent
          opacity={0.26}
          color="#ffffff"
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </RoundedBox>
      <mesh position={[-cardSize * 0.22, cardSize * 0.23, cardSize * 0.22]} rotation={[0, 0, -0.42]} scale={[cardSize * 0.46, cardSize * 0.075, 1]}>
        <planeGeometry />
        <meshBasicMaterial transparent opacity={0.52} color="#ffffff" blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh position={[cardSize * 0.3, -cardSize * 0.28, cardSize * 0.225]} rotation={[0, 0, -0.42]} scale={[cardSize * 0.32, cardSize * 0.045, 1]}>
        <planeGeometry />
        <meshBasicMaterial transparent opacity={0.34} color="#ffffff" blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <LogoPlane logo={logo} cardSize={cardSize} />
    </group>
  );
}

function MovingCards() {
  const group = useRef();
  const { viewport } = useThree();
  const cardSize = Math.min(Math.max(viewport.height * 0.62, 1.25), 1.85);
  const gap = cardSize * 0.28;
  const step = cardSize + gap;
  const repeatedLogos = useMemo(() => Array.from({ length: 4 }, () => LOGOS).flat(), []);
  const totalWidth = repeatedLogos.length * step;

  useFrame((state) => {
    if (!group.current) return;
    const offset = (state.clock.elapsedTime * 0.72) % totalWidth;
    group.current.children.forEach((child, index) => {
      child.position.x = ((index * step - offset + totalWidth / 2) % totalWidth) - totalWidth / 2;
    });
  });

  return (
    <group ref={group}>
      {repeatedLogos.map((logo, index) => (
        <group key={`${logo.url}-${index}`} position={[index * step - totalWidth / 2, 0, 0]}>
          <FluidLogoCard logo={logo} index={index} cardSize={cardSize} />
        </group>
      ))}
    </group>
  );
}

function RibbonScene() {
  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[2, 3, 4]} intensity={2.4} />
      <pointLight position={[-3, 2, 3]} intensity={0.7} color="#5aa7ff" />
      <pointLight position={[3, -1, 2]} intensity={0.55} color="#ff4f91" />
      <RibbonBackdrop />
      <MovingCards />
      <Preload all />
    </>
  );
}

export default function FluidVenueRibbon() {
  return (
    <div className="fluid-ribbon-stage" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 7.6], fov: 28 }} gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}>
        <Suspense fallback={null}>
          <RibbonScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
