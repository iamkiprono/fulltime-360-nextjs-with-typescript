const getVisits = async () => {
  const res = await fetch("https://blog-api-kiprono.onrender.com/visits", {
    next: {
      tags: ["visits"],
      revalidate: 0,
    },
  });

  const data = await res.json();
  return data;
};

const Dashboard = async () => {
  const visits = await getVisits();

  return <div>Total Visits: {visits?.length}</div>;
};

export default Dashboard;
