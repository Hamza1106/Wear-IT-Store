import { useEffect, useMemo, useRef, useState, Suspense } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Float, ContactShadows, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useNavigate } from "@tanstack/react-router";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import shadowImg from "@/assets/p-shadow-runner.jpg";

const SHOE_MODEL_URL = "/models/shoe_model.glb";

const CustomShoeModel = () => {
  const group = useRef(null);
  const { scene } = useGLTF(SHOE_MODEL_URL);
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.35;
  });
  const { object, scale } = useMemo(() => {
    const cloned = scene.clone(true);
    const box = new THREE.Box3().setFromObject(cloned);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const s = 2.6 / maxDim; // fit largest dimension to ~2.6 units
    cloned.position.sub(center);
    cloned.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
      }
    });
    return { object: cloned, scale: s };
  }, [scene]);
  return (
    <group ref={group} position={[0, -0.4, 0]}>
      <primitive object={object} scale={scale} />
    </group>
  );
};
useGLTF.preload(SHOE_MODEL_URL);

/* ---------------- Shoe geometry helpers ---------------- */

// Foot-shaped 2D outline used to extrude the sole/upper.
const footShape = () => {
  const s = new THREE.Shape();
  // Heel -> outer side -> toe -> inner side -> heel
  s.moveTo(-1.6, -0.5);
  s.bezierCurveTo(-2.0, -0.55, -2.05, 0.35, -1.55, 0.55);
  s.bezierCurveTo(-1.0, 0.7, 0.4, 0.72, 1.35, 0.55);
  s.bezierCurveTo(1.9, 0.45, 2.15, 0.1, 2.1, -0.15);
  s.bezierCurveTo(2.0, -0.55, 1.2, -0.62, 0.4, -0.6);
  s.bezierCurveTo(-0.6, -0.6, -1.2, -0.6, -1.6, -0.5);
  return s;
};

const ShoeModel = () => {
  const group = useRef(null);
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.35;
  });

  const shape = useMemo(() => footShape(), []);
  const soleExtrude = useMemo(
    () => ({ depth: 0.35, bevelEnabled: true, bevelSize: 0.08, bevelThickness: 0.08, bevelSegments: 4, steps: 1 }),
    []
  );
  const midExtrude = useMemo(
    () => ({ depth: 0.12, bevelEnabled: true, bevelSize: 0.05, bevelThickness: 0.05, bevelSegments: 3, steps: 1 }),
    []
  );
  const upperExtrude = useMemo(
    () => ({ depth: 0.55, bevelEnabled: true, bevelSize: 0.18, bevelThickness: 0.18, bevelSegments: 6, steps: 1 }),
    []
  );

  return (
    <group ref={group} rotation={[Math.PI / 2, 0, 0]} position={[0, -0.2, 0]}>
      {/* Outsole (black rubber) */}
      <mesh castShadow receiveShadow position={[0, 0, -0.5]}>
        <extrudeGeometry args={[shape, soleExtrude]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.9} metalness={0.05} />
      </mesh>

      {/* Midsole (glowing accent) */}
      <mesh castShadow position={[0, 0, -0.12]} scale={[1.02, 1.02, 1]}>
        <extrudeGeometry args={[shape, midExtrude]} />
        <meshStandardMaterial
          color="#ff6a2b"
          emissive="#ff6a2b"
          emissiveIntensity={1.4}
          roughness={0.4}
        />
      </mesh>

      {/* Foam layer (white midsole) */}
      <mesh castShadow position={[0, 0, 0]} scale={[0.98, 0.98, 1]}>
        <extrudeGeometry args={[shape, { ...midExtrude, depth: 0.18 }]} />
        <meshStandardMaterial color="#f2f2f2" roughness={0.5} />
      </mesh>

      {/* Upper (knit body) — extruded up from foot shape, scaled to taper */}
      <group position={[0, 0, 0.2]}>
        <mesh castShadow scale={[0.9, 0.85, 1]}>
          <extrudeGeometry args={[shape, upperExtrude]} />
          <meshStandardMaterial color="#151515" roughness={0.75} metalness={0.15} />
        </mesh>
      </group>

      {/* Toe cap (rounded) */}
      <mesh castShadow position={[-1.35, 0, 0.45]} rotation={[Math.PI / 2, 0, 0]}>
        <sphereGeometry args={[0.55, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.6} metalness={0.2} />
      </mesh>

      {/* Heel counter */}
      <mesh castShadow position={[1.75, 0, 0.55]} rotation={[Math.PI / 2, 0, 0]}>
        <sphereGeometry args={[0.55, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#0f0f0f" roughness={0.4} metalness={0.35} />
      </mesh>

      {/* Tongue */}
      <mesh castShadow position={[0.4, 0, 0.85]} rotation={[-0.2, 0, 0]}>
        <boxGeometry args={[1.1, 0.7, 0.2]} />
        <meshStandardMaterial color="#1c1c1c" roughness={0.8} />
      </mesh>

      {/* Collar (ankle opening trim) */}
      <mesh castShadow position={[1.15, 0, 0.95]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.42, 0.09, 16, 32]} />
        <meshStandardMaterial color="#ff6a2b" emissive="#ff6a2b" emissiveIntensity={0.6} />
      </mesh>

      {/* Laces — series of thin bars */}
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh key={i} castShadow position={[0.9 - i * 0.28, 0, 0.9]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.05, 0.55, 0.05]} />
          <meshStandardMaterial color="#e8e8e8" roughness={0.4} />
        </mesh>
      ))}

      {/* Side swoosh / accent stripe */}
      <mesh castShadow position={[0.1, 0.62, 0.5]} rotation={[0, 0, -0.35]}>
        <boxGeometry args={[1.9, 0.04, 0.28]} />
        <meshStandardMaterial
          color="#ff6a2b"
          emissive="#ff6a2b"
          emissiveIntensity={0.9}
          metalness={0.4}
          roughness={0.3}
        />
      </mesh>
      <mesh castShadow position={[0.1, -0.62, 0.5]} rotation={[0, 0, 0.35]}>
        <boxGeometry args={[1.9, 0.04, 0.28]} />
        <meshStandardMaterial
          color="#ff6a2b"
          emissive="#ff6a2b"
          emissiveIntensity={0.9}
          metalness={0.4}
          roughness={0.3}
        />
      </mesh>

      {/* Heel logo tab */}
      <mesh castShadow position={[1.85, 0, 0.4]}>
        <boxGeometry args={[0.05, 0.4, 0.2]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={1.1} />
      </mesh>
    </group>
  );
};

const Featured3D = () => {
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => setMounted(true), []);

  const shopProduct = {
    id: 1,
    name: "Shadow Runner X",
    price: 179,
    image: shadowImg,
    category: "Men",
  };

  const handleShop = () => {
    addToCart(shopProduct);
    toast.success("Shadow Runner X added to cart");
    navigate({ to: "/products" });
  };

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden gradient-hero">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 3D Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/3] lg:aspect-[5/4] rounded-3xl overflow-hidden border border-border bg-gradient-to-br from-card to-background order-2 lg:order-1"
          >
            {mounted && (
              <Canvas
                shadows
                dpr={[1, 1.5]}
                gl={{ antialias: true, powerPreference: "high-performance" }}
                performance={{ min: 0.5 }}
                camera={{ position: [0, 2, 6.5], fov: 38 }}
              >
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={1.3} castShadow />
                <pointLight position={[-5, 3, -5]} intensity={0.9} color="#22d3ee" />
                <pointLight position={[3, -2, 4]} intensity={0.7} color="#ff6a2b" />
                <Suspense fallback={null}>
                  <Float speed={1.3} rotationIntensity={0.15} floatIntensity={0.5}>
                    <CustomShoeModel />
                  </Float>
                  <ContactShadows
                    position={[0, -1.1, 0]}
                    opacity={0.55}
                    scale={9}
                    blur={2.6}
                    far={2.2}
                  />
                  <Environment preset="city" />
                </Suspense>
                <OrbitControls
                  enablePan={false}
                  enableZoom={false}
                  autoRotate={false}
                  minPolarAngle={Math.PI / 3}
                  maxPolarAngle={Math.PI / 1.8}
                />
              </Canvas>
            )}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground pointer-events-none">
              <span>◉ Drag to rotate</span>
              <span>3D preview</span>
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <span className="text-primary font-medium tracking-widest uppercase text-sm">
              Signature Drop
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-display mt-4 mb-6 leading-none">
              THE <span className="text-gradient">SHADOW</span>
              <br />
              RUNNER X
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-md">
              Rotate. Zoom. Explore every angle of our most requested silhouette.
              Carbon-plate midsole. Reflective mesh upper. Built for the runners
              who never stop moving.
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8 max-w-md">
              {[
                { k: "Weight", v: "248g" },
                { k: "Drop", v: "8mm" },
                { k: "Rebound", v: "94%" },
              ].map((s) => (
                <div key={s.k} className="border-l-2 border-primary pl-3">
                  <div className="text-2xl font-display">{s.v}</div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    {s.k}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <motion.button
                onClick={handleShop}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="gradient-neon text-primary-foreground px-8 py-4 font-semibold uppercase tracking-wide rounded-full neon-glow"
              >
                Shop $179
              </motion.button>
              <span className="text-sm text-muted-foreground">
                Only <span className="text-primary font-semibold">12</span> left
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Featured3D;
