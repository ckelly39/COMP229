export default function Project() {
  const projects = [
    {
      id: 1,
      title: "LoanLink",
      image: "./public/loanlink.png",
      link: "https://preview--loanlink-ai-connect.lovable.app/",
      description:
        "FinTech MVP to streamline loan processing between borrowers and lenders using no-code tools (Glide, Airtable).",
      timeframe: "2024",
      role: "Co-founder & Developer â€” built MVP and pitched during ALX Ventures Founder Academy.",
      outcome: "Demo streamlined loan approvals, making processes faster and more transparent for SMEs.",
    },
    {
      id: 2,
      title: "To-Do List app",
      image: "./public/todolist.jpeg",
      link: "#",
      description:
        "Desktop task management app built with C# and Oracle SQL, featuring CRUD operations and persistent storage.",
      timeframe: "2024",
      role: "Developer ” designed schema, implemented core features, and integrated SQL queries with C#.",
      outcome: "Delivered a functional productivity tool used as part of coursework to demonstrate database integration.",
    },
    {
      id: 3,
      title: "Weather Prediction AI",
      image: "./public/weather.png",
      link: "#",
      description:
        "AI prototype built with Python, NumPy, and Pandas to predict climate trends for agricultural insights.",
      timeframe: "2024",
      role: "Data Scientist â€” handled preprocessing, analysis, and model prototyping.",
      outcome: "Predicted weather trends with improved accuracy for local testing datasets.",
    },
  ];

  const styles = {
    container: {
      display: "flex",
      flexWrap: "wrap",
      gap: 16,
      justifyContent: "flex-start",
    },
    card: {
      border: "1px solid #e5e5e5",
      borderRadius: 12,
      padding: 20,
      margin: 8,
      maxWidth: 360,
      boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
      transition: "transform 0.2s ease",
    },
    image: {
      width: "100%",
      height: "auto",
      borderRadius: 8,
    },
    title: {
      margin: "0 0 8px 0",
      fontSize: "1.2rem",
    },
  };

  return (
    <>
      <h2>Projects</h2>
      <div style={styles.container}>
        {projects.map((p) => (
          <article
            key={p.id}
            style={styles.card}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-4px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            <h3 style={styles.title}>
              <a href={p.link} target="_blank" rel="noopener noreferrer">
                {p.title}
              </a>
            </h3>
            <a href={p.link} target="_blank" rel="noopener noreferrer">
              <img src={p.image} alt={p.title} style={styles.image} />
            </a>
            <p>{p.description}</p>
            <ul style={{ paddingLeft: 18, margin: "8px 0" }}>
              <li>
                <strong>Timeframe:</strong> {p.timeframe}
              </li>
              <li>
                <strong>Role:</strong> {p.role}
              </li>
              <li>
                <strong>Outcome:</strong> {p.outcome}
              </li>
            </ul>
          </article>
        ))}
      </div>
    </>
  );
}