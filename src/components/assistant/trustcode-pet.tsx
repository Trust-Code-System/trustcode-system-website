"use client";
export function TrustCodePet({
  thinking = false,
  small = false,
}: {
  thinking?: boolean;
  small?: boolean;
}) {
  return (
    <span
      className={`trustcode-pet ${thinking ? "pet-thinking" : ""} ${small ? "pet-small" : ""}`}
      aria-hidden
    >
      <svg viewBox="0 0 100 112" fill="none">
        <ellipse
          className="pet-shadow"
          cx="50"
          cy="103"
          rx="24"
          ry="4"
          fill="#78A8ED"
          opacity=".16"
        />
        <g className="pet-character">
          <path
            className="pet-antenna"
            d="M50 25V15"
            stroke="#7DABEF"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle className="pet-light" cx="50" cy="11" r="4" fill="#C4E6FF" />
          <path
            className="pet-arm pet-arm-left"
            d="M24 57L15 65L18 73"
            stroke="#7AA8EB"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            className="pet-arm pet-arm-right"
            d="M77 58L86 52L86 42"
            stroke="#7AA8EB"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="23" y="26" width="54" height="59" rx="22" fill="#91B8F4" />
          <path
            d="M25 49C25 36 35 28 49 28H57"
            stroke="#D8EAFF"
            strokeWidth="2"
            strokeLinecap="round"
            opacity=".75"
          />
          <rect x="29" y="39" width="42" height="24" rx="12" fill="#10213C" />
          <g className="pet-eyes">
            <rect x="38" y="46" width="5" height="9" rx="2.5" fill="#DAEFFF" />
            <rect x="57" y="46" width="5" height="9" rx="2.5" fill="#DAEFFF" />
          </g>
          <path
            className="pet-smile"
            d="M47 57Q50 59 53 57"
            stroke="#87B7F1"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M44 73L48 77L56 68"
            stroke="#F2F7FF"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            className="pet-foot pet-foot-left"
            d="M36 83V92H43"
            stroke="#5B86C5"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            className="pet-foot pet-foot-right"
            d="M63 83V92H56"
            stroke="#5B86C5"
            strokeWidth="8"
            strokeLinecap="round"
          />
        </g>
        <path
          className="pet-spark"
          d="M85 21V29M81 25H89"
          stroke="#A6CAFA"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
