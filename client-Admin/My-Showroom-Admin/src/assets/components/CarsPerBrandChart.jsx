import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function CarsPerBrandChart({ cars, brands }) {
  const data = brands.map(brand => ({
    name: brand.name,
    total: cars.filter(car => car.brand_id === brand.id).length
  }));
  return (
    <div className="dashboard-card">
      <h4>Cars per Brand</h4>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="total" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
export default CarsPerBrandChart;