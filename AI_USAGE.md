# AI usage log

## Week 1

- Tool(s): Gemini
- What I asked for: why I cannot run "npm create vite@latest hello-react -- --template react".
- What I kept, changed or rejected, and why: Ai told me to changed the command to "npx create-vite@latest hello-react --template react".
- One thing the AI got wrong and how I fixed it:

## Week 2

- Tool(s): Gemini
- What I asked for: explanation about reflection questions.
- What I kept, changed or rejected, and why: I kept all the explanations and answer the reflection questions.
- One thing the AI got wrong and how I fixed it:

## Week 3

- no AI usage

## Week 4

- Tool(s): Gemini
- What I asked for: how to add a 600 ms delay before fetch (with setTimeout, cleared in the cleanup)
- What I kept, changed or rejected, and why:

I add

useEffect(() => {
const controller = new AbortController();
setLoading(true);
setError(null);

    // Start the 600ms delay
    const timeoutId = setTimeout(() => {
      fetch("/api/vendors.json", { signal: controller.signal })
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        })
        .then((data) => {
          setVendors(data);
          if (data.length > 0) setSelectedVendorId(data[0].id);
        })
        .catch((err) => {
          if (err.name !== "AbortError") setError(err.message);
        })
        .finally(() => {
          if (!controller.signal.aborted) setLoading(false);
        });
    }, 600); // 600ms timer

    // Cleanup function clears the timeout AND aborts the fetch
    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };

}, [reloadKey]);

and update the loading state

} else if (loading) {
content = (

<section>
<h2 className="section-title" style={{ color: "transparent", backgroundColor: "#e4e7eb", width: "150px", borderRadius: "4px" }}>Loading</h2>
<div className="vendor-grid">
{/_ Skeleton Cards _/}
<div className="card" style={{ height: "140px", backgroundColor: "#e4e7eb" }}></div>
<div className="card" style={{ height: "140px", backgroundColor: "#e4e7eb" }}></div>
<div className="card" style={{ height: "140px", backgroundColor: "#e4e7eb" }}></div>
</div>
</section>
);
}

- One thing the AI got wrong and how I fixed it:
