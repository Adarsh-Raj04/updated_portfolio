import { useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Github,
  Linkedin,
  Loader,
  Mail,
  Send,
  User,
  FileText,
} from "lucide-react";
import { contactData } from "../data/portfolioData";

const iconMap = {
  Email: Mail,
  LinkedIn: Linkedin,
  GitHub: Github,
  Portfolio: User,
  Resume: FileText,
};

export default function Contact() {
  const [formState, setFormState] = useState("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormState("sending");

    try {
      const response = await fetch(contactData.formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormState("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.14),transparent_32%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-14 max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/5 px-3 py-1.5">
            <Mail className="h-4 w-4 text-cyan-300" />
            <span className="font-space text-[11px] uppercase tracking-[0.16em] text-cyan-200">
              Let&apos;s Connect
            </span>
          </div>

          <h2 className="mb-5 font-orbitron text-4xl font-bold md:text-5xl">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
              {contactData.title}
            </span>
          </h2>
          <p
            className="mb-4 font-space text-sm md:text-base"
            style={{ color: "var(--text-tertiary)" }}
          >
            {contactData.subtitle}
          </p>
          <p
            className="mx-auto max-w-3xl font-jetbrains text-sm md:text-base"
            style={{ color: "var(--text-secondary)" }}
          >
            {contactData.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-[28px] border border-white/10 bg-slate-950/60 p-6 md:p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
            <h3 className="mb-6 font-orbitron text-2xl text-cyan-200">
              Connect
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              {contactData.channels.map((channel) => {
                const Icon = iconMap[channel.label] ?? ExternalLink;
                const isExternal = channel.href.startsWith("http");

                return (
                  <a
                    key={channel.label}
                    href={channel.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/45"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-500/10">
                        <Icon className="h-5 w-5 text-cyan-300" />
                      </div>
                      <div className="min-w-0">
                        <p className="mb-1 font-space text-[11px] uppercase tracking-[0.14em] text-cyan-200">
                          {channel.label}
                        </p>
                        <p
                          className="break-all font-jetbrains text-sm"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {channel.value}
                        </p>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </article>

          <article className="rounded-[28px] border border-white/10 bg-slate-950/60 p-6 md:p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
            <h3 className="mb-6 font-orbitron text-2xl text-cyan-200">
              Send a Message
            </h3>

            {formState === "success" ? (
              <div className="flex h-[20rem] flex-col items-center justify-center gap-4 text-center">
                <CheckCircle2 className="h-14 w-14 text-green-400" />
                <p className="font-orbitron text-lg text-green-300">
                  Message Sent
                </p>
                <p
                  className="font-jetbrains text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Thanks for reaching out. I will get back to you soon.
                </p>
                <button
                  onClick={() => setFormState("idle")}
                  className="rounded-lg border border-cyan-400/30 px-4 py-2 font-space text-xs transition-all duration-300 hover:scale-105"
                  style={{ color: "var(--accent-cyan)" }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block font-space text-xs uppercase tracking-[0.14em]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    autoComplete="name"
                    className="w-full rounded-xl border px-4 py-3 font-jetbrains text-sm focus:outline-none"
                    style={{
                      color: "var(--text-primary)",
                      background: "rgba(15,23,42,0.5)",
                      borderColor: "rgba(71,85,105,0.8)",
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block font-space text-xs uppercase tracking-[0.14em]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    autoComplete="email"
                    className="w-full rounded-xl border px-4 py-3 font-jetbrains text-sm focus:outline-none"
                    style={{
                      color: "var(--text-primary)",
                      background: "rgba(15,23,42,0.5)",
                      borderColor: "rgba(71,85,105,0.8)",
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-2 block font-space text-xs uppercase tracking-[0.14em]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Share your project or role details"
                    autoComplete="off"
                    className="w-full resize-none rounded-xl border px-4 py-3 font-jetbrains text-sm focus:outline-none"
                    style={{
                      color: "var(--text-primary)",
                      background: "rgba(15,23,42,0.5)",
                      borderColor: "rgba(71,85,105,0.8)",
                    }}
                  />
                </div>

                {formState === "error" && (
                  <div className="flex items-center gap-2 font-jetbrains text-sm text-red-400">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    Something went wrong. Please try again or use a direct
                    channel.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formState === "sending"}
                  className="flex items-center justify-center gap-3 rounded-xl border border-cyan-400/30 bg-gradient-to-r from-cyan-500/15 via-blue-500/10 to-purple-500/10 px-6 py-3 font-space text-sm transition-all duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                >
                  {formState === "sending" ? (
                    <>
                      <Loader className="h-4 w-4 animate-spin" />
                      SENDING...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      SEND MESSAGE
                    </>
                  )}
                </button>
              </form>
            )}
          </article>
        </div>
      </div>
    </section>
  );
}
