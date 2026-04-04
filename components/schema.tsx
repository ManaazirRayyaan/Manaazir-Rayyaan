export function PersonSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Manaazir Rayyaan",
          url: "https://manaazirrayyaan.in",
          jobTitle: "Full Stack Developer",
          sameAs: [
            "https://github.com/ManaazirRayyaan",
            "https://www.linkedin.com/in/manaazir-rayyaan-0311b5361/",
            "https://www.instagram.com/rayyaanmanaazirpro/",
          ],
        }),
      }}
    />
  );
}
