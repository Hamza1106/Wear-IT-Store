import { useEffect, useRef, useState, Suspense } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Float, ContactShadows } from "@react-three/drei";

const ShoeModel = () => {
  const group = useRef(null);
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.35;
  });

  return (
    <group ref={group}>
      {/* Sole */}
      <mesh position={[0, -0.6, 0]} castShadow>
        <boxGeometry args={[3, 0.35, 1.2]} />
        <meshStandardMaterial color="#0f0f0f" roughness={0.4} metalness={0.2} />
      </mesh>
      {/* Midsole glow */}
      <mesh position={[0, -0.4, 0]}>
        <boxGeometry args={[3.02, 0.08, 1.22]} />
        <meshStandardMaterial
          color="#ff6a2b"
          emissive="#ff6a2b"
          emissiveIntensity={1.5}
        />
      </mesh>
      {/* Upper body (main) */}
      <mesh position={[0.3, 0, 0]} castShadow>
        <boxGeometry args={[2.4, 0.9, 1.05]} />
        <meshStandardMaterial color="#ff6a2b" roughness={0.35} metalness={0.35} />
      </mesh>
      {/* Toe */}
      <mesh position={[-1.15, -0.15, 0]} castShadow>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshStandardMaterial color="#ff6a2b" roughness={0.35} metalness={0.35} />
      </mesh>
      {/* Heel */}
      <mesh position={[1.35, 0.15, 0]} castShadow>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial color="#141414" roughness={0.4} metalness={0.3} />
      </mesh>
      {/* Tongue / collar */}
      <mesh position={[0.7, 0.55, 0]} castShadow>
        <boxGeometry args={[0.9, 0.5, 0.9]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.6} />
      </mesh>
      {/* Laces panel */}
      <mesh position={[0.1, 0.4, 0]} castShadow>
        <boxGeometry args={[1.2, 0.1, 0.6]} />
        <meshStandardMaterial color="#f5f5f5" roughness={0.5} />
      </mesh>
      {/* Swoosh accent */}
      <mesh position={[0, 0.05, 0.55]} rotation={[0, 0, -0.25]} castShadow>
        <boxGeometry args={[1.6, 0.18, 0.05]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={0.8}
        />
      </mesh>
    </group>
  );
};

const Featured3D = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

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
            className="relative aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden border border-border bg-gradient-to-br from-card to-background order-2 lg:order-1"
          >
            {mounted && (
              <Canvas
                shadows
                dpr={[1, 2]}
                camera={{ position: [0, 1.5, 6], fov: 40 }}
              >
                <ambientLight intensity={0.4} />
                <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
                <pointLight position={[-5, 3, -5]} intensity={0.8} color="#22d3ee" />
                <Suspense fallback={null}>
                  <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.6}>
                    <ShoeModel />
                  </Float>
                  <ContactShadows
                    position={[0, -1.1, 0]}
                    opacity={0.5}
                    scale={8}
                    blur={2.5}
                    far={2}
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
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground">
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
