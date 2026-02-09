import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useState, useEffect } from "react";

function abbreviate(name) {
  return name
    .split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase();
}

function CarsPerBrandChart({ cars, brands }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const data = brands.map(brand => ({
    name: isMobile ? abbreviate(brand.name) : brand.name,
    fullName: brand.name,
    total: cars.filter(car => car.brand_id === brand.id).length
  }));

  return (
    <div className="dashboard-card">
      <h4>Cars per Brand</h4>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />

          <Tooltip
            formatter={(value) => value}
            labelFormatter={(label, payload) =>
              payload?.[0]?.payload?.fullName || label
            }
          />

          <Bar dataKey="total" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CarsPerBrandChart;