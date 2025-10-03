document.addEventListener("DOMContentLoaded", () => {

  /* -------------------------
     HTTP fetch demo
     ------------------------- */
  const fetchBtn = document.getElementById("fetchBtn");
  const fetchOutput = document.getElementById("fetchOutput");

  if (fetchBtn && fetchOutput) {
    fetchBtn.addEventListener("click", async () => {
      fetchOutput.textContent = "Fetching...";
      console.log("Fetching data...");
      try {
        const resp = await fetch("https://jsonplaceholder.typicode.com/todos/1");
        const data = await resp.json();
        console.log("Data received:", data);
        fetchOutput.textContent = JSON.stringify(data, null, 2);
      } catch (err) {
        console.error("Fetch error:", err);
        fetchOutput.textContent = "Error fetching data: " + err;
      }
    });
  }

});
   
