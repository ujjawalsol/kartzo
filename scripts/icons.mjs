/**
 * KARTZO SVG Icon System
 * Standardized icon set matching the locked master index.html design language.
 * Consistent 24x24 viewBox, stroke-width="1.75", round linecap/linejoin.
 */

export function icon(name, className = "h-4 w-4", ariaHidden = true) {
  const aria = ariaHidden ? 'aria-hidden="true"' : "";
  const base = `class="${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" ${aria}`;

  switch (name) {
    case "truck":
      return `<svg ${base}><path d="M2 5h13v10H2zM15 9h4l3 3v3h-7z"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></svg>`;
    
    case "clock":
      return `<svg ${base}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`;

    case "home":
      return `<svg ${base}><path d="m3 9.5 9-7 9 7v10a1.5 1.5 0 0 1-1.5 1.5H15v-6a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v6H4.5A1.5 1.5 0 0 1 3 19.5z"/></svg>`;

    case "grid":
      return `<svg ${base}><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></svg>`;

    case "flame":
      return `<svg ${base}><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`;

    case "zap":
      return `<svg ${base}><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z"/></svg>`;

    case "search":
      return `<svg ${base}><circle cx="11" cy="11" r="7.5"/><path d="m20 20-3.8-3.8"/></svg>`;

    case "cart":
      return `<svg ${base}><path d="M3 4h2l2.2 11h11.3l1.8-7H7"/><circle cx="9" cy="20" r="1.2"/><circle cx="18" cy="20" r="1.2"/></svg>`;

    case "heart":
      return `<svg ${base}><path d="M12 20s-7-4.4-7-9a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4.6-7 9-7 9z"/></svg>`;

    case "user":
      return `<svg ${base}><circle cx="12" cy="8" r="3.2"/><path d="M5 19c1.4-3 3.8-4.5 7-4.5S17.6 16 19 19"/></svg>`;

    case "menu":
      return `<svg ${base}><path d="M4 6.5h16M4 12h16M4 17.5h16"/></svg>`;

    case "close":
      return `<svg ${base}><path d="M18 6 6 18M6 6l12 12"/></svg>`;

    case "chevron-down":
      return `<svg ${base}><path d="m6 9 6 6 6-6"/></svg>`;

    case "chevron-right":
      return `<svg ${base}><path d="m9 18 6-6-6-6"/></svg>`;

    case "chevron-left":
      return `<svg ${base}><path d="m15 18-6-6-6-6"/></svg>`;

    case "arrow-right":
      return `<svg ${base}><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;

    case "arrow-left":
      return `<svg ${base}><path d="M19 12H5M11 18l-6-6 6-6"/></svg>`;

    case "check":
      return `<svg ${base}><path d="M20 6 9 17l-5-5"/></svg>`;

    case "star-filled":
      return `<svg class="${className} text-amber-400 fill-amber-400" viewBox="0 0 24 24" ${aria}><path d="m12 2.5 3.09 6.26 6.91 1-5 4.87 1.18 6.88L12 18.25l-6.18 3.26L7 14.63l-5-4.87 6.91-1L12 2.5z"/></svg>`;

    case "star-empty":
      return `<svg class="${className} text-slate-200 fill-slate-200" viewBox="0 0 24 24" ${aria}><path d="m12 2.5 3.09 6.26 6.91 1-5 4.87 1.18 6.88L12 18.25l-6.18 3.26L7 14.63l-5-4.87 6.91-1L12 2.5z"/></svg>`;

    case "shield-check":
      return `<svg ${base}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>`;

    case "refresh":
      return `<svg ${base}><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/></svg>`;

    case "lock":
      return `<svg ${base}><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>`;

    case "mail":
      return `<svg ${base}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>`;

    case "phone":
      return `<svg ${base}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`;

    case "map-pin":
      return `<svg ${base}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>`;

    case "package":
      return `<svg ${base}><path d="m16.5 9.4-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.27 6.96 12 12.01l8.73-5.05M12 22.08V12"/></svg>`;

    case "filter":
      return `<svg ${base}><path d="M4 6h16M7 12h10m-8 6h6"/></svg>`;

    case "trash":
      return `<svg ${base}><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14zM10 11v6M14 11v6"/></svg>`;

    case "eye":
      return `<svg ${base}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>`;

    case "plus":
      return `<svg class="${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ${aria}><path d="M12 5v14M5 12h14"/></svg>`;

    case "minus":
      return `<svg class="${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ${aria}><path d="M5 12h14"/></svg>`;

    case "share":
      return `<svg ${base}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98"/></svg>`;

    case "download":
      return `<svg ${base}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>`;

    case "sparkles":
      return `<svg ${base}><path d="m12 3 1.91 5.82a2 2 0 0 0 1.27 1.27L21 12l-5.82 1.91a2 2 0 0 0-1.27 1.27L12 21l-1.91-5.82a2 2 0 0 0-1.27-1.27L3 12l5.82-1.91a2 2 0 0 0 1.27-1.27L12 3z"/></svg>`;

    case "tag":
      return `<svg ${base}><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2z"/><circle cx="7" cy="7" r=".5" fill="currentColor"/></svg>`;

    case "help":
      return `<svg ${base}><circle cx="12" cy="12" r="9"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/></svg>`;

    default:
      return `<svg ${base}><circle cx="12" cy="12" r="9"/></svg>`;
  }
}

export function stars(ratingVal = 4.8) {
  const fullStars = Math.floor(ratingVal);
  const starsArr = [];
  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      starsArr.push(icon("star-filled", "h-3.5 w-3.5"));
    } else {
      starsArr.push(icon("star-empty", "h-3.5 w-3.5"));
    }
  }
  return `<span class="inline-flex items-center gap-0.5" aria-hidden="true">${starsArr.join("")}</span>`;
}
