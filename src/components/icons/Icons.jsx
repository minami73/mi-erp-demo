const Icon = ({ name, size = 18, stroke = 1.6, style }) => {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style,
  };
  switch (name) {
    case "calendar":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 9h18" />
          <path d="M8 3v4M16 3v4" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case "doc":
      return (
        <svg {...common}>
          <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
          <path d="M14 3v5h5" />
          <path d="M9 13h6M9 17h4" />
        </svg>
      );
    case "user":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c1-4 4.5-6 8-6s7 2 8 6" />
        </svg>
      );
    case "users":
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3.2" />
          <path d="M3 20c.8-3.2 3.2-5 6-5s5.2 1.8 6 5" />
          <circle cx="17" cy="9" r="2.5" />
          <path d="M15.5 14.5c2.4.4 4.2 2 5 5" />
        </svg>
      );
    case "car":
      return (
        <svg {...common}>
          <path d="M3 13l2-5a3 3 0 0 1 2.8-2h8.4A3 3 0 0 1 19 8l2 5" />
          <path d="M3 13h18v5a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H6v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
          <circle cx="7.5" cy="15.5" r=".8" fill="currentColor" stroke="none" />
          <circle
            cx="16.5"
            cy="15.5"
            r=".8"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      );
    case "book":
      return (
        <svg {...common}>
          <path d="M4 4h6a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4z" />
          <path d="M20 4h-6a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h7z" />
        </svg>
      );
    case "utensils":
      return (
        <svg {...common}>
          <path d="M7 3v9a2 2 0 0 0 2 2v7" />
          <path d="M11 3v5" />
          <path d="M5 3v5" />
          <path d="M17 3c-2 0-3 2-3 5s1 4 3 4v9" />
        </svg>
      );
    case "plus":
      return (
        <svg {...common}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      );
    case "search":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
      );
    case "filter":
      return (
        <svg {...common}>
          <path d="M4 5h16l-6 8v6l-4-2v-4z" />
        </svg>
      );
    case "download":
      return (
        <svg {...common}>
          <path d="M12 4v12" />
          <path d="M7 11l5 5 5-5" />
          <path d="M4 20h16" />
        </svg>
      );
    case "chevron-left":
      return (
        <svg {...common}>
          <path d="M14 6l-6 6 6 6" />
        </svg>
      );
    case "chevron-right":
      return (
        <svg {...common}>
          <path d="M10 6l6 6-6 6" />
        </svg>
      );
    case "chevron-down":
      return (
        <svg {...common}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      );
    case "close":
      return (
        <svg {...common}>
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="M4 12l5 5L20 6" />
        </svg>
      );
    case "grip":
      return (
        <svg {...common} stroke="none" fill="currentColor">
          <circle cx="9" cy="6" r="1.3" />
          <circle cx="15" cy="6" r="1.3" />
          <circle cx="9" cy="12" r="1.3" />
          <circle cx="15" cy="12" r="1.3" />
          <circle cx="9" cy="18" r="1.3" />
          <circle cx="15" cy="18" r="1.3" />
        </svg>
      );
    case "logout":
      return (
        <svg {...common}>
          <path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3" />
          <path d="M10 17l-5-5 5-5" />
          <path d="M15 12H5" />
        </svg>
      );
    case "bell":
      return (
        <svg {...common}>
          <path d="M6 16v-5a6 6 0 1 1 12 0v5l1 2H5z" />
          <path d="M10 21a2 2 0 0 0 4 0" />
        </svg>
      );
    case "settings":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1A1.7 1.7 0 0 0 4.6 9 1.7 1.7 0 0 0 4.3 7.2l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9c.2.6.7 1 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 6 9-6" />
        </svg>
      );
    case "lock":
      return (
        <svg {...common}>
          <rect x="4" y="11" width="16" height="10" rx="2" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </svg>
      );
    case "eye":
      return (
        <svg {...common}>
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "wrench":
      return (
        <svg {...common}>
          <path d="M14.7 6.3a4 4 0 1 0 5 5L21 13l-2 2-1.8-1.3-1.4 1.4 1.3 1.8-2 2-1.7-1.3-7 7a2.1 2.1 0 1 1-3-3l7-7L9.1 13l1.4-1.4L12 13l2-2-1.7-1.7z" />
        </svg>
      );
    case "arrow-up-down":
      return (
        <svg {...common}>
          <path d="M7 4v16M3 8l4-4 4 4" />
          <path d="M17 20V4M21 16l-4 4-4-4" />
        </svg>
      );
    case "sparkle":
      return (
        <svg {...common}>
          <path d="M12 3l1.6 4.5L18 9l-4.4 1.5L12 15l-1.6-4.5L6 9l4.4-1.5z" />
        </svg>
      );
    case "alert-triangle":
      return (
        <svg {...common}>
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <path d="M12 9v4" />
          <path d="M12 17h.01" strokeWidth={2.5} />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
        </svg>
      );
    case "coffee":
      return (
        <svg {...common}>
          <path d="M3 8h13v6a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z" />
          <path d="M16 9h2a3 3 0 0 1 0 6h-2" />
          <path d="M7 4v1M10 4v1M13 4v1" />
        </svg>
      );
    case "user":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c1.5-4 5-6 8-6s6.5 2 8 6" />
        </svg>
      );
    case "edit":
      return (
        <svg {...common}>
          <path d="M4 20h4l10-10-4-4L4 16z" />
          <path d="M14 6l4 4" />
        </svg>
      );
    case "trash":
      return (
        <svg {...common}>
          <path d="M4 7h16" />
          <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
          <path d="M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13" />
        </svg>
      );
    case "map":
      return (
        <svg {...common}>
          <path d="M12 22s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      );
    case "tag":
      return (
        <svg {...common}>
          <path d="M3 12V4h8l10 10-8 8z" />
          <circle cx="7" cy="8" r="1.4" fill="currentColor" stroke="none" />
        </svg>
      );
    case "menu":
      return (
        <svg {...common}>
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      );
    case "spinner":
      return (
        <svg
          {...common}
          strokeWidth={2}
          style={{ ...style, animation: "spin .6s linear infinite" }}
        >
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
      );
    case "clipboard":
      return (
        <svg {...common}>
          <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
          <rect x="9" y="3" width="6" height="4" rx="1" />
          <path d="M9 12h6M9 16h4" />
        </svg>
      );
    case "sitemap":
      return (
        <svg {...common}>
          <rect x="9" y="2" width="6" height="5" rx="1" />
          <path d="M12 7v3M5 10H19" />
          <rect x="2" y="10" width="6" height="5" rx="1" />
          <rect x="9" y="10" width="6" height="5" rx="1" />
          <rect x="16" y="10" width="6" height="5" rx="1" />
          <path d="M5 15v2M12 15v2M19 15v2" />
          <rect x="2" y="17" width="6" height="5" rx="1" />
          <rect x="9" y="17" width="6" height="5" rx="1" />
          <rect x="16" y="17" width="6" height="5" rx="1" />
        </svg>
      );
    case "chart":
      return (
        <svg {...common}>
          <path d="M3 3v18h18" />
          <path d="M7 16l4-4 4 4 4-6" />
        </svg>
      );
    case "menu":
      return (
        <svg {...common}>
          <path d="M3 6h18M3 12h18M3 18h18" />
        </svg>
      );
    default:
      return null;
  }
};

window.Icon = Icon;
