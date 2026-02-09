function RecentlyAddedCars({ cars }) {
  const recentCars = [...cars]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);
  return (
    <div className="dashboard-card">
      <h4>Recently Added Cars</h4>
      <div className="recent-cars-list">
        {recentCars.map(car => (
          <div key={car.id} className="recent-car-item">
            <img src={car.thumbnail} alt={car.model} />
            <div>
              <p className="car-name">
                {car.Brand?.name} {car.model}
              </p>
              <span className="car-date">
                {new Date(car.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentlyAddedCars;