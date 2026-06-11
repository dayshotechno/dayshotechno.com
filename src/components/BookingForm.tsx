import { useState } from "react";
import type { FormEvent } from "react";
import GlitchButton from "./GlitchButton";

const BOOKING_EMAIL = "booking@dayshotechno.com";

const BUDGET_RANGES = [
  "< 500 EUR",
  "500 - 1.000 EUR",
  "1.000 - 2.500 EUR",
  "> 2.500 EUR",
  "TBD / NEGOTIABLE",
];

// Static site, no backend: the form composes a structured booking request
// and hands it to the promoter's own mail client via mailto.
export default function BookingForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "").trim();

    const subject = `Booking Request: DAY SHO - ${get("date") || "[DATE]"} / ${get("city") || "[CITY]"}`;
    const body = [
      "BOOKING REQUEST // DAY SHO",
      "----------------------------------------",
      `NAME:      ${get("name")}`,
      `VENUE:     ${get("venue")}`,
      `CITY:      ${get("city")}`,
      `DATE:      ${get("date")}`,
      `CAPACITY:  ${get("capacity")}`,
      `BUDGET:    ${get("budget")}`,
      "----------------------------------------",
      "MESSAGE:",
      get("message"),
    ].join("\n");

    window.location.href = `mailto:${BOOKING_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <label className="block">
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted">NAME *</span>
          <input name="name" required autoComplete="name" className="field-raw mt-1" placeholder="YOUR NAME" />
        </label>
        <label className="block">
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted">VENUE *</span>
          <input name="venue" required className="field-raw mt-1" placeholder="CLUB / FESTIVAL" />
        </label>
        <label className="block">
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted">CITY *</span>
          <input name="city" required className="field-raw mt-1" placeholder="CITY" />
        </label>
        <label className="block">
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted">DATE *</span>
          <input name="date" type="date" required className="field-raw mt-1" />
        </label>
        <label className="block">
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted">ESTIMATED CAPACITY</span>
          <input name="capacity" type="number" min="0" className="field-raw mt-1" placeholder="e.g. 800" />
        </label>
        <label className="block">
          <span className="font-mono text-[11px] uppercase tracking-widest text-muted">BUDGET RANGE</span>
          <select name="budget" className="field-raw mt-1" defaultValue="">
            <option value="" disabled>
              SELECT RANGE
            </option>
            {BUDGET_RANGES.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="block">
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted">MESSAGE</span>
        <textarea name="message" rows={4} className="field-raw mt-1 resize-y" placeholder="EVENT DETAILS, LINE-UP, SET LENGTH..." />
      </label>

      <GlitchButton type="submit" label="TRANSMIT_REQUEST" />

      <p className="font-mono text-[11px] uppercase leading-relaxed tracking-wider text-muted" aria-live="polite">
        {sent ? (
          <>REQUEST HANDED TO YOUR MAIL CLIENT. NO CLIENT? WRITE DIRECTLY TO </>
        ) : (
          <>OPENS YOUR MAIL CLIENT. DIRECT LINE: </>
        )}
        <a href={`mailto:${BOOKING_EMAIL}`} className="text-primary underline underline-offset-4">
          {BOOKING_EMAIL}
        </a>
      </p>
    </form>
  );
}
