const getVisits = async () => {
  const res = await fetch("https://blog-api-kiprono.onrender.com/visits", {
    next: {
      tags: ["visits"],
      revalidate: 0,
    },
  });

  const data = await res.json();
  console.log(data);
  return data;
};

const Dashboard = async () => {
  const visits: {
    _id: string;
    hometeam: string;
    awayteam: string;
    createdAt: Date;
  }[] = await getVisits();

  return (
    <div>
      Total Visits: {visits?.length}
      {/* @ts-ignore */}
      {[...new Set(visits)].map((visit, i) => {
        return (
          <button key={i} className="border p-2 m-2">
            {new Date(visit.createdAt).toLocaleDateString()}
          </button>
        );
      })}
      {visits
        ?.filter(
          (visit) =>
            new Date(visit.createdAt).toLocaleDateString() ===
            new Date().toLocaleDateString()
        )
        .map((visit) => {
          return (
            <div key={visit._id}>
              <p>{new Date(visit.createdAt).toLocaleDateString()}</p>
              <div className="border p-4">
                <p>{visit.hometeam}</p>
                vs
                <p>{visit.awayteam}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Dashboard;
