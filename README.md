# Web Automation Framework: Selenium → Playwright

A progressive framework evolution from raw procedural scripts to a fully abstracted, design-pattern-driven architecture.

---

## Overview

This repository documents the full journey of building a production-grade web automation framework in nine distinct phases. Each phase is **self-contained and independently runnable**, solving a real engineering problem introduced by the previous one.

**Target Application:** [SauceDemo (Swag Labs)](https://www.saucedemo.com)
**Tech Stack:** Node.js · JavaScript · Selenium WebDriver · Playwright · Playwright MCP · Jest · Cucumber · AI/LLM
**Design Patterns Applied:** Page Object Model (POM) · Facade / Adapter · Factory · Polymorphism · AI Agent Pattern · Autonomous QA

https://github.com/user-attachments/assets/86829299-2125-4b1b-9b26-0744a4836169




## Core Test Suite

Three test cases are used consistently across all phases to make the architectural evolution tangible and comparable:

| ID    | Name                       | Scenario                                                        |
| ----- | -------------------------- | --------------------------------------------------------------- |
| TC_01 | Happy Path — Login         | Login as `standard_user` → Assert redirect to `/inventory.html` |
| TC_02 | Negative Path — Locked Out | Login as `locked_out_user` → Assert error message appears       |
| TC_03 | State Change — Add to Cart | Login → Add "Sauce Labs Backpack" → Assert cart badge shows `1` |

---

## Repository Structure

```
web-automation-framework/
│
├── phase1-foundation/             # Pure Selenium, no test runner
├── phase2-test-runner/             # Selenium + Jest lifecycle management
├── phase3-page-object-model/       # Page Object Model abstraction
├── phase4-abstraction-layer/       # Facade pattern — tool isolation
├── phase5-multi-tool-framework/    # Factory pattern — Selenium ↔ Playwright swap
├── phase6-ai-driven/             # AI-powered natural language automation
├── phase7-bdd-layer/             # Cucumber/Gherkin business-readable tests
├── phase8-agentic-interpreter/    # AI agent that maps Gherkin to Page Objects
├── phase9-autonomus-qa-mcp/       # Autonomous QA agent with self-healing tests
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
await loginPage.login("standard_user", "secret_sauce");
await homePage.addToCart("Sauce Labs Backpack");
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

### Phase 6 — AI-Driven Automation (Natural Language)

**Concept:** Abstract explicit locator management through natural language interaction. Tests use natural language descriptions that AI translates into browser actions.

**Execution:**

```bash
cd web-automation-architecture
npm install
TOOL=playwright npm run test:ai
```

**What to observe:** No more CSS selectors or XPath. Tests read like plain English instructions:

```js
await aiActions.clickElement("the login button");
await aiActions.typeText("the username input field", "standard_user");
```

---

### Phase 7 — BDD Layer (Cucumber/Gherkin)

**Concept:** Bridge the gap between business requirements and technical implementation using Behavior-Driven Development syntax that non-technical stakeholders can understand and validate.

**Execution:**

```bash
cd web-automation-architecture
npm install
TOOL=playwright npm run test:bdd
```

**What to observe:** Test cases are pure business language in `.feature` files:

```gherkin
Scenario: Successful login with valid credentials 
Given Launch Saucelabs login page
When Login with username "standard_user" and password "secret_sauce"
Then Home page should be loaded
```

---

### Phase 8 — Agentic Interpreter (AI Step Mapping)

**Concept:** No manual step definitions needed. An AI agent dynamically maps Gherkin steps to appropriate Page Object methods at runtime, eliminating the step definition maintenance burden.

**Execution:**

```bash
cd web-automation-architecture
npm install
TOOL=playwright npm run test:agentic
```

**What to observe:** A single universal step handler interprets any Gherkin step:

```js
defineStep(/^(.*)$/, universalHandler)
```

The AI agent maps `"Launch Saucelabs login page"` → `LoginPage.open()` automatically, with caching to optimize API calls.

---

### Phase 9 — Autonomous QA Agent (Playwright MCP)

**Concept:** An autonomous QA agent powered by Playwright MCP (Model Context Protocol) that can explore applications, identify user flows, execute comprehensive test scenarios, and self-heal broken selectors. This phase demonstrates the future of autonomous testing where AI agents perform end-to-end QA with minimal human intervention.

**Execution:**

```bash
cd web-automation-architecture
cd phase9-autonomus-qa-mcp
npx playwright test
```

**What to observe:** The test suite was generated by an autonomous QA agent that:
- Explored the entire application and mapped all pages and user flows
- Identified edge cases and special user accounts (locked_out_user, problem_user)
- Created comprehensive test coverage including login, cart operations, checkout flows, and form validation
- Detected intentional bugs like form field scrambling for problem_user
- Used robust `data-test` selectors that work reliably across all scenarios

**Key Features:**
- **Autonomous Exploration:** Agent maps application structure without prior knowledge
- **Self-Healing Tests:** Uses stable selectors that adapt to UI changes
- **Comprehensive Coverage:** 15 tests covering happy paths, negative cases, and edge scenarios
- **Real-World Bug Detection:** Identifies intentional test user behaviors and actual issues
- **POM Structure:** Clean Page Object Model with reusable page classes
- **Zero Configuration:** Uses existing repo dependencies, no duplicate node_modules

**Test Coverage:**
- Valid/invalid login scenarios
- Multiple user account types (standard_user, locked_out_user, problem_user)
- Cart operations (add, remove, count updates)
- Complete checkout flow with validation
- Empty cart checkout
- Form field validation (all required fields)
- Form field scrambling detection

---

## Architectural Evolution at a Glance

```
Phase 1 → No structure. Code duplicated in every file.
Phase 2 → Jest manages lifecycle. Tests are grouped. Assertions are proper.
Phase 3 → POM separates "What" (tests) from "How" (browser interactions).
Phase 4 → Facade isolates the tool. Page Objects are tool-agnostic.
Phase 5 → Factory + Polymorphism. Swap tools at runtime. Zero test changes.
Phase 6 → AI-driven automation. Natural language eliminates explicit locators.
Phase 7 → BDD layer. Business-readable Gherkin scenarios bridge gap to stakeholders.
Phase 8 → Agentic interpreter. AI dynamically maps steps to methods, no manual definitions needed.
Phase 9 → Autonomous QA agent. Self-healing tests with comprehensive coverage via Playwright MCP.
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

### AI Agent Pattern

An intelligent agent interprets natural language or Gherkin steps and dynamically maps them to appropriate framework methods. This eliminates the need for manual step definitions and reduces maintenance overhead as test requirements evolve.

### Autonomous QA Pattern

An AI-powered QA agent explores applications autonomously, identifies user flows, generates comprehensive test suites, and self-heals broken selectors. This represents the future of testing where minimal human intervention is required to achieve comprehensive coverage.

---

## Prerequisites

- Node.js v18+
- Google Chrome (for Selenium phases)
- ChromeDriver matching your Chrome version (Phase 1–4)
- Playwright installs its own browsers automatically (Phase 5, 9)
- ZeroStep API token for Phase 6 (AI-driven automation)
- Gemini API key for Phase 8 (Agentic interpreter)
- Phase 9 uses existing Playwright installation, no additional setup required

---

## Key Takeaways

- **Maintainability:** A locator change requires editing one Page Object — not every test file.
- **Scalability:** Adding new pages or tests never touches existing infrastructure.
- **Tool flexibility:** The framework is not tied to any single browser automation library.
- **Readability:** Test cases read like plain English acceptance criteria.
- **AI-enhanced:** Natural language automation eliminates brittle locator maintenance.
- **Business alignment:** BDD syntax bridges gap between technical and non-technical stakeholders.
- **Zero-maintenance steps:** AI agents dynamically interpret requirements without manual step definitions.
- **Autonomous QA:** AI agents explore applications, generate comprehensive test suites, and self-heal broken selectors.
- **Self-healing tests:** Robust selectors adapt to UI changes, reducing maintenance overhead.

**Framework demonstrates transition from deterministic automation
to probabilistic AI-assisted testing strategies and fully autonomous QA.**

---
