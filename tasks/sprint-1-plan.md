---
sprint: 1
theme: "Make it Piyush's site"
status: COMPLETE — plan written retroactively 2026-06-18
dates: 2026-05-31 → 2026-06-02
---

# Sprint 1 Plan — piyush-portfolio

> **Note:** This plan was written retroactively on 2026-06-18. No upfront plan existed; this documents what was committed and delivered. Retros begin at Sprint 3.

## Sprint goal

Replace all template placeholder content (aaabad's identity, generic copy, dummy projects) with Piyush's real content, branding, and security baseline. By end of sprint, the site is unambiguously Piyush's portfolio — live, linkable, and not embarrassing.

---

## Scope

### Delivered (11 PRs, May 31 – Jun 2)

| PR | What shipped |
|----|-------------|
| #8 | About section: replace placeholder bio with Piyush's content |
| #9 | Experience section: Slice + jumpingMinds (real roles) |
| #10 | Contact section: Piyush's real links (LinkedIn, GitHub, email) |
| #11 | Site metadata: title, OG description set for piyushgupta27 |
| #12 | Projects section: replace 5 placeholder cards with Piyush's real projects (ai-sdlc, trip-research, career-automation, ai-finance-tracker, ai-health-agent) |
| #17 | Deps: move shadcn to devDependencies; upgrade Next.js to latest 16.x |
| #18 | Security: add security headers to `next.config.ts` (CSP, HSTS, X-Frame-Options) |
| #19 | Gitignore: add `.audit/` and `.sdlc-queue/` (ai-sdlc pipeline artifacts) |
| #20 | Branding: replace aaabad PII in footer, navbar, and socials |
| #21 | Security: tighten `.claude/settings.json` subagent permissions (from CSO audit #7) |
| #22 | Content: real blog posts + real headshot (replaces aaabad placeholder images and posts) |

### What was explicitly not done
- No formal sprint plan or AC checklist upfront
- No retro (retroactive plan only; retros start Sprint 3)
- No Lighthouse baseline or analytics
- No mobile nav
- CI / test gate not yet established (added Sprint 2)

---

## Acceptance criteria (as-shipped)

### Content replacement (#8, #9, #10, #12, #20, #22)
- [x] Zero instances of "aaabad" or template owner identity in rendered site
- [x] About, Experience, Projects, Contact all show Piyush's real content
- [x] Real headshot replaces placeholder avatar
- [x] Footer/navbar/socials show Piyush's handles

### Metadata + security (#11, #18)
- [x] `<title>` and meta description reflect Piyush's name and role
- [x] Security headers present in `next.config.ts` (CSP, HSTS, X-Frame-Options, etc.)

### Platform hygiene (#17, #19, #21)
- [x] shadcn in devDependencies (not prod)
- [x] Next.js on latest 16.x
- [x] Pipeline artifacts gitignored
- [x] Claude settings scoped to minimum required subagent permissions

---

## Sprint outcome

All 11 PRs merged to main. Site was publicly linkable as Piyush's portfolio by Jun 2.

**Known gaps carried forward:**
- OG image not yet generated (meta description set but no `og:image`)
- Project card descriptions were 1-liners (addressed in Sprint 3)
- About copy was basic (addressed in Sprint 3)
- No CI gate (added Sprint 2)
