// Single source of truth for brand copy.
// The long bio previously lived in both BioSystem.astro and one-sheet.astro; the two
// drifted apart the first time the claim changed. Import from here, never re-type.

// Read top-down this traces the signal chain backwards: what you hear, how it is
// made, where it comes from. The type scale descends to match — see HeroSection.
export const CLAIM = ["DESTRUCTION.", "DISTORTION.", "DRIVE."] as const;

export const CLAIM_INLINE = CLAIM.join(" ");

// POSITIONING — read before editing any bio below.
// The bios lead with SCHRANZ, not "Hard Techno & Schranz". That is what he actually
// plays, and saying so filters out the neo-rave bookings he does not want. The
// <title>, the meta description and the schema.org genre keep "Hard Techno" because
// that is the search term with volume. Positioning and discoverability are two
// different jobs — do not merge them back together.
//
// Every claim below is his, and checkable: 145-160 BPM, rooms up to 500, the slot
// after the headliner, the venues in STAGES. No adjectives that cannot be verified.

export const BIO_MICRO =
  "DAY SHO is a schranz DJ from Graz, Austria — 145 to 160 BPM, no breaks, and closing tracks that have no business being in a schranz set.";

export const BIO_SHORT =
  "DAY SHO is a schranz DJ from Graz, Austria. He plays 145 to 160 BPM with no breaks and no runways — the older, more relentless end of the genre rather than the current hard techno wave. Into that he folds old records and tracks a room will shout along to, and he usually closes somewhere outside techno entirely. Rooms up to 500. Postgarage, Das Werk, röda.";

// Kept as paragraphs rather than one block: rendered with `whitespace-pre-line`, and
// the copy button hands a promoter real paragraph breaks to paste into an event page.
export const BIO_LONG_PARAGRAPHS = [
  "DAY SHO plays schranz out of Graz, Austria.",

  "Not the current hard techno wave, and he is explicit about why: too many breaks, too little time to lose yourself. His sets run 145 to 160 BPM and stay there. No breakdowns to hide behind, no runways, no drop announced twenty seconds in advance. What pulled him in was the same thing he already knew from metal and punk, which is what he listened to before any of this — the forward pressure, the way it moves a room whether the room agreed to it or not.",

  "What happens inside that is less predictable. He folds in old records, and tracks people will laugh at or shout along to, and none of it lets up. The one that always works is noise not war — Heckmeck. The set often ends on old drum & bass or dubstep, Netsky or Bunt, which has no business in a schranz set and is exactly why it works. What he gets rebooked for is a room that is nostalgic and coming apart at the same time.",

  "That has a specific use, and promoters have worked it out: he plays after the headliner. The slot where the room either stays or goes home.",

  "Rooms up to 500. Postgarage Graz, Das Werk Vienna, Kulturverein röda Steyr, Eventfabrik Niklasdorf, Schloss Mautern. Shared bills with Jan Vanderveigt and 333CXT. Sets of 90 to 120 minutes.",

  "Based in Graz. Replies within 48 hours and turns up on time.",
] as const;

export const BIO_LONG_BODY = BIO_LONG_PARAGRAPHS.join("\n\n");

// The long bio opens with its own subject line, so the claim is no longer prepended
// here — the one-sheet still prints CLAIM_INLINE as a separate header above it.
export const BIO_LONG = BIO_LONG_BODY;

export const BIOS = [
  { id: "micro", label: "BIO_MICRO // LINEUP_POST", text: BIO_MICRO },
  { id: "short", label: "BIO_SHORT // 65_WORDS", text: BIO_SHORT },
  { id: "long", label: "BIO_LONG // FULL_DOSSIER", text: BIO_LONG },
];

export const STAGES = [
  { id: "LOG_06", event: "Trash-O-Ween", venue: "Kulturverein röda // Steyr", tag: "ACTIVE" },
  { id: "LOG_05", event: "Polytox Production Face2Face", venue: "Postgarage // Graz", tag: "LOGGED" },
  { id: "LOG_04", event: "Sauhaufen", venue: "Postgarage // Graz", tag: "LOGGED" },
  { id: "LOG_03", event: "Face2Face", venue: "Das Werk // Wien", tag: "LOGGED" },
  { id: "LOG_02", event: "Noise", venue: "Eventfabrik // Niklasdorf", tag: "LOGGED" },
  { id: "LOG_01", event: "Ehrnau-Rave", venue: "Schloss Mautern // Mautern", tag: "LOGGED" },
];
