# QuillFire Case Study: TypeScript Migration

### Entry: Jan 2026 – Migrating QuillFire from JavaScript to TypeScript

---

## Problem

The original QuillFire codebase was written in JavaScript. As the application grew, this made it harder to:

- Reason about **data flow** and **API contracts** (e.g. topic, comment, user shapes).
- Enforce **component boundaries** (required vs optional props, event types).
- Refactor with confidence (rename/change types without breaking call sites).
- Onboard new contributors (no single source of truth for domain types).

---

## Decision

We migrated the application **incrementally** to TypeScript:

1. **Configuration and types first**  
   - Added `tsconfig.json` with strict mode.  
   - Introduced shared types in `types/` (User, Topic, Comment, FormErrors) aligned with Mongoose models and UI usage.  
   - Extended NextAuth session type in `types/next-auth.d.ts` to match our custom session callback.

2. **Core UI and validation**  
   - Converted all components in `components/` to TypeScript (`.tsx`).  
   - Converted `utils/validations.js` to `utils/validations.ts` and split into `validateTopic`, `validateSignIn`, and `validateSignUp` for clearer, type-safe APIs.  
   - Kept app routes, API routes, and Mongoose models in JavaScript to limit scope and risk.

3. **Path and tooling consistency**  
   - Aligned `jsconfig.json` with `tsconfig.json` (path alias `@/*`) so both JS and TS files resolve `@/components`, `@/utils`, `@/types` the same way.

---

## What Was Done (Concrete)

- **Types:** Centralized `User`, `Topic`, `Comment`, `FormErrors` in `types/index.ts`; added NextAuth and Quill module declarations.  
- **Components:** All 10 components in `components/` are now typed (props, event handlers, state).  
- **Validations:** Three typed validation functions and exported content types (`TopicContent`, `SignInContent`, `SignUpContent`) replace the single untyped `FormValidations(content, formType)`.  
- **Fixes surfaced by types:** Corrected `setPost` (Topic setter) in Form, `useRouter` import in login page, `signOut`/onClick usage in Nav, and various event handler types (e.g. MouseEvent vs ChangeEvent in LikeDislike).

---

## Tradeoffs

- **Initial slowdown:** Migration required fixing type errors and tightening loosely structured code (e.g. validation return shape, prop types).  
- **Dual config:** Both `tsconfig.json` and `jsconfig.json` are maintained so JS and TS coexist.  
- **Mixed codebase:** App and API layers remain in JavaScript until a later phase; shared types are used only where TS is adopted.

---

## Outcome

- **Clearer data contracts:** Topic, Comment, User, and FormErrors are defined in one place and reused across components and validation.  
- **Better reliability:** Stricter typing caught incorrect event types, missing imports, and wrong prop types before runtime.  
- **Easier evolution:** New features (e.g. new form fields or API fields) can be reflected in types first, then implemented.  
- **Foundation for next steps:** Remaining app pages, API routes, and utils can be migrated in follow-up work without big-bang rewrites.

---

## References

- **PR-level summary:** See repo root `PULL_REQUEST.md` for a detailed list of files and changes.  
- **Project setup and scripts:** See `README.md`.
