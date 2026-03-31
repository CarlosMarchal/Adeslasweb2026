import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const stats = [
  { value: 50, prefix: "+", suffix: " años", label: "de experiencia" },
  { value: 40000, prefix: "+", suffix: "", label: "especialistas" },
  { value: 18, prefix: "", suffix: "", label: "hospitales propios" },
  { value: 1000, prefix: "+", suffix: "", label: "centros médicos" },
];

const CountUp = ({ target, prefix, suffix }: { target: number; prefix: string; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1500;
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  const format = (n: number) => n >= 1000 ? n.toLocaleString("es-ES") : n.toString();

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-black text-primary-foreground mb-1">
        {prefix}{format(count)}{suffix}
      </div>
    </div>
  );
};

const StatsSection = () => (
  <section className="py-16 px-4" style={{ backgroundColor: "#003087" }}>
    <div className="container mx-auto">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((s) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <CountUp target={s.value} prefix={s.prefix} suffix={s.suffix} />
            <p className="text-center text-sm mt-1" style={{ color: "rgba(255,255,255,0.7)" }}>{s.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection;
