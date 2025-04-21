import { useEffect, useState } from "react";

export default function NextForm() {

  const [progress, setProgress] = useState(0);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    for (let i = 10; i <= 100; i += 10) {
      setTimeout(() => setProgress(i), i * 20);
    }
    const fetchData = async () => {
      setLoading(true);
      
      

      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    setTimeout(()=>{
      fetchData();
    },3000)
  }, []);


  return (
    <div className="min-w-screen min-h-screen  ">
       {/* <div className="flex justify-center items-center h-screen"> Next Form</div> */}

       <div>
      {loading && (
        <div className="w-full bg-grey-800 rounded-md h-4 ">
          <div
            className="bg-blue-500 h-4 rounded-md transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      {!loading && (
        <ul>
          {data.slice(0, 5).map((item) => (
            <li key={item.id} className="p-2 border-b">
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
  );
}