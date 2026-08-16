// Single source of truth for brand copy.
// The long bio previously lived in both BioSystem.astro and one-sheet.astro; the two
// drifted apart the first time the claim changed. Import from here, never re-type.

export const CLAIM = ["DRIVE.", "DISTORTION.", "DESTRUCTION."] as const;

export const CLAIM_INLINE = CLAIM.join(" ");

export const BIO_MICRO =
  "DAY SHO delivers merciless Hard Techno and Schranz for the darkest dancefloors.";

export const BIO_SHORT =
  "DAY SHO is a Hard Techno & Schranz DJ dismantling regional dancefloors with industrial precision. Inspired by Svetec, O.B.I., and Golpe, his sound is relentless, raw, and uncompromising.";

// Paragraph without the leading claim — the one-sheet prints the claim separately.
export const BIO_LONG_BODY =
  "For two years, DAY SHO has been dismantling regional dancefloors with a precision that leaves absolutely zero room for compromise. Where others hold back, DAY SHO goes full throttle: delivering Hard Techno and Schranz in their purest, darkest forms. Drawing inspiration from the legacy of heavyweights like Svetec, O.B.I., and Golpe, DAY SHO engineers an atmosphere that is as menacing as it is liberating. Massive industrial kicks and distorted textures forge a sound that doesn't just fill the room—it holds the crowd in a merciless grip until the very last minute. This isn't just spinning tracks; it's heavy labor. No corporate marketing facades, no pointless noise—just sound that cuts straight to the bone. READY FOR THE ASSAULT.";

export const BIO_LONG = `DAY SHO // ${CLAIM_INLINE} ${BIO_LONG_BODY}`;

export const BIOS = [
  { id: "micro", label: "BIO_MICRO // 1_SENTENCE", text: BIO_MICRO },
  { id: "short", label: "BIO_SHORT // 50_WORDS", text: BIO_SHORT },
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
