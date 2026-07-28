import {
  Github,
  GitBranch,
  ChevronDown,
  Code,
  Users,
  BookOpen,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { GitHubCalendar } from "react-github-calendar";

export default function GitHubStats() {
  const [isVisible, setIsVisible] = useState(false);
  const [githubData, setGithubData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [animatedStats, setAnimatedStats] = useState({});
  const [statClicks, setStatClicks] = useState(0);

  const sectionRef = useRef(null);
  const githubUsername = "adarsh-raj04";

  // Visibility observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsVisible(true),
      { threshold: 0.2 },
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => el && observer.unobserve(el);
  }, []);

  // Fetch GitHub data
  useEffect(() => {
    fetch(`https://api.github.com/users/${githubUsername}`)
      .then((res) => res.json())
      .then((data) => {
        setGithubData(data);
        setLoading(false);
      });
  }, []);

  // Animate numbers
  useEffect(() => {
    if (!githubData) return;

    const targets = {
      repos: githubData.public_repos,
      followers: githubData.followers,
      following: githubData.following,
      gists: githubData.public_gists,
    };

    Object.entries(targets).forEach(([key, value]) => {
      let start = 0;
      const step = Math.ceil(value / 40);

      const interval = setInterval(() => {
        start += step;
        if (start >= value) {
          start = value;
          clearInterval(interval);
        }

        setAnimatedStats((prev) => ({ ...prev, [key]: start }));
      }, 25);
    });
  }, [githubData]);

  // Hidden dev easter egg
  const handleStatClick = () => {
    const newCount = statClicks + 1;
    setStatClicks(newCount);

    if (newCount === 5) {
      const msg = document.createElement("div");
      msg.innerText = "👀 Dev detected";
      msg.style.position = "fixed";
      msg.style.top = "50%";
      msg.style.left = "50%";
      msg.style.transform = "translate(-50%, -50%)";
      msg.style.padding = "15px 25px";
      msg.style.background = "black";
      msg.style.color = "#0ff";
      msg.style.borderRadius = "12px";
      msg.style.zIndex = "9999";

      document.body.appendChild(msg);
      setTimeout(() => msg.remove(), 2000);
      setStatClicks(0);
    }
  };

  const stats = [
    {
      icon: Code,
      label: "Public Repos",
      value: animatedStats.repos || 0,
      color: "text-cyan-400",
    },
    {
      icon: Users,
      label: "Followers",
      value: animatedStats.followers || 0,
      color: "text-purple-400",
    },
    {
      icon: GitBranch,
      label: "Following",
      value: animatedStats.following || 0,
      color: "text-pink-400",
    },
    {
      icon: BookOpen,
      label: "Public Gists",
      value: animatedStats.gists || 0,
      color: "text-green-400",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="github"
      className="py-32 relative overflow-hidden"
    >
      <div className="absolute inset-0 data-grid opacity-20" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <h2 className="font-orbitron text-5xl font-bold mb-4 text-center holographic flex justify-center gap-3">
          <Github className="w-12 h-12" />
          GITHUB STATS
        </h2>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="space-y-12">
            {/* PROFILE CARD */}
            <div
              className={`gradient-border rounded-xl p-8 ${isVisible ? "fade-in-up" : "opacity-0"}`}
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                <img
                  src={githubData.avatar_url}
                  alt={githubData.name}
                  onClick={() =>
                    window.open(`https://github.com/${githubUsername}`)
                  }
                  className="w-32 h-32 rounded-full border-4 cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-3"
                />

                <div>
                  <h3 className="font-orbitron text-3xl font-bold">
                    {githubData.name}
                  </h3>
                  <p>@{githubData.login}</p>
                  <p className="mt-2">{githubData.bio}</p>
                </div>
              </div>
            </div>

            {/* STATS GRID */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  onClick={handleStatClick}
                  className="gradient-border rounded-xl p-6 text-center transition-all duration-300 hover:scale-110 cursor-pointer"
                >
                  <stat.icon
                    className={`w-12 h-12 mx-auto mb-4 ${stat.color}`}
                  />
                  <p className="font-orbitron text-4xl font-bold">
                    {stat.value}
                  </p>
                  <p className="text-sm">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* 🔥 HEATMAP */}
            <div className="gradient-border rounded-xl p-8 text-center">
              <h3 className="font-orbitron text-2xl mb-6">
                Contribution Activity
              </h3>

              <div className="flex justify-center">
                <GitHubCalendar
                  username={githubUsername}
                  colorScheme="dark"
                  blockSize={15}
                  blockMargin={5}
                />
              </div>
            </div>

            {/* PROFILE LINK */}
            <div className="text-center">
              <a
                href={`https://github.com/${githubUsername}`}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-lg font-bold transition-all duration-300 hover:scale-105"
              >
                <Github className="w-6 h-6" />
                VIEW FULL PROFILE
              </a>
            </div>
          </div>
        )}
      </div>

      <a
        href="#contact"
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        onClick={(e) => {
          e.preventDefault();
          document
            .getElementById("contact")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <ChevronDown className="w-8 h-8" />
      </a>
    </section>
  );
}
