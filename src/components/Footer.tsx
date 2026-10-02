import { profile } from "@/content/data";

export function Footer() {
  return (
    <footer>
      <div className="rule" />
      <div className="col flex items-center justify-between gap-6 px-4 py-8 sm:px-8">
        <p className="label">© 2026 {profile.name}</p>
        <p className="label">{profile.location}</p>
      </div>
    </footer>
  );
}
