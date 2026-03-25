# Web Automation Framework: Selenium → Playwright

 A progressive framework evolution from raw procedural scripts to a fully abstracted, design-pattern-driven architecture.

---

## Overview

This repository documents the full journey of building a production-grade web automation framework in five distinct phases. Each phase is **self-contained and independently runnable**, solving a real engineering problem introduced by the previous one.

**Target Application:** [SauceDemo (Swag Labs)](https://www.saucedemo.com)  
**Tech Stack:** Node.js · JavaScript · Selenium WebDriver · Playwright · Jest  
**Design Patterns Applied:** Page Object Model (POM) · Facade / Adapter · Factory · Polymorphism

---

## Core Test Suite

Three test cases are used consistently across all phases to make the architectural evolution tangible and comparable:

| ID | Name | Scenario |
|----|------|----------|
| TC_01 | Happy Path — Login | Login as `standard_user` → Assert redirect to `/inventory.html` |
| TC_02 | Negative Path — Locked Out | Login as `locked_out_user` → Assert error message appears |
| TC_03 | State Change — Add to Cart | Login → Add "Sauce Labs Backpack" → Assert cart badge shows `1` |

---

## Repository Structure 

```
web-automation-framework/
│
├── phase1-raw-scripts/             # Pure Selenium, no test runner
├── phase2-jest-runner/             # Selenium + Jest lifecycle management
├── phase3-page-object-model/       # Page Object Model abstraction
├── phase4-abstraction-layer/       # Facade pattern — tool isolation
├── phase5-multi-tool-framework/    # Factory pattern — Selenium ↔ Playwright swap
│
└── README.md
```

---

### Phase 1 — Raw Scripts (Pure Selenium)

**Concept:** Procedural scripts. No abstraction. No test runner. Feel the pain of duplication firsthand.

**Execution:**
```bash
cd web-automation-architecture 
npm install
node phase1-foundation/login.js
node phase1-foundation/addToCart.js
node phase1-foundation/lockedOutLogin.js
```

**What to observe:** Driver setup and teardown is copied into every file. Logs are plain `console.log` with no summary.

---

### Phase 2 — Test Runner (Jest)

**Concept:** Introduce Jest to manage lifecycle (`beforeAll`/`afterAll`) and provide structured assertions.

**Execution:**
```bash
cd web-automation-architecture 
npm install
npx jest phase2-test-runner
```

**What to observe:** All three tests run from a single file with a clean pass/fail summary. But test blocks are still cluttered with Selenium-specific syntax.

---

### Phase 3 — Page Object Model (POM)

**Concept:** Move locators and actions into dedicated Page classes. Tests read like business requirements.

**Execution:**
```bash
cd web-automation-architecture 
npm install
npx jest phase3-page-object-model
```

**What to observe:** `saucedemo.test.js` is now clean and readable:
```js
await loginPage.login('standard_user', 'secret_sauce');
await homePage.addToCart('Sauce Labs Backpack');
```

---

### Phase 4 — Facade Pattern (Tool Isolation)

**Concept:** Page Objects no longer import Selenium directly. All Selenium calls are routed through a `SeleniumActions` wrapper — an internal framework language.

**Execution:**
```bash
cd web-automation-architecture 
npm install
npx jest phase4-abstraction-layer
```

**What to observe:** No Selenium import exists in any Page Object or test file. Only `SeleniumActions` knows about the underlying tool.

---

### Phase 5 — Factory Pattern (Plug-and-Play Selenium ↔ Playwright)

**Concept:** A `DriverFactory` reads `process.env.TOOL` and returns either `SeleniumActions` or `PlaywrightActions` — both with identical method signatures. Zero test code changes required.

**Execution:**
```bash
cd web-automation-architecture 
npm install

# Run with Selenium
TOOL=selenium npx jest phase5-multi-tool-framework

# Run with Playwright
TOOL=playwright npx jest phase5-multi-tool-framework  
```

**What to observe:** The same tests, the same Page Objects, a completely different browser automation engine — switched entirely via an environment variable.

---

## Architectural Evolution at a Glance

```
Phase 1 → No structure. Code duplicated in every file.
Phase 2 → Jest manages lifecycle. Tests are grouped. Assertions are proper.
Phase 3 → POM separates "What" (tests) from "How" (browser interactions).
Phase 4 → Facade isolates the tool. Page Objects are tool-agnostic.
Phase 5 → Factory + Polymorphism. Swap tools at runtime. Zero test changes.
```

---

## Design Patterns Reference

### Page Object Model (POM)
Encapsulates web elements and interactions into dedicated classes per page. Eliminates brittle locator references from test files and centralizes UI change maintenance to a single location.

### Facade / Adapter Pattern
`SeleniumActions` and `PlaywrightActions` both expose the same internal API (`clickElement`, `typeText`, `waitForElement`), hiding tool-specific complexity. The rest of the framework speaks only the internal language.

### Factory Pattern
`DriverFactory.create()` centralizes instance creation and resolves which implementation to return based on runtime configuration (`process.env.TOOL`). Consumers never need to know which concrete class they receive.

### Polymorphism
Both action wrappers honour the same interface contract. This makes them interchangeable without any conditional logic leaking into Page Objects or tests.

---

## Prerequisites

- Node.js v18+
- Google Chrome (for Selenium phases)
- ChromeDriver matching your Chrome version (Phase 1–4)
- Playwright installs its own browsers automatically (Phase 5)

---

## Key Takeaways

- **Maintainability:** A locator change requires editing one Page Object — not every test file.
- **Scalability:** Adding new pages or tests never touches existing infrastructure.
- **Tool flexibility:** The framework is not tied to any single browser automation library.
- **Readability:** Test cases read like plain English acceptance criteria.

---
