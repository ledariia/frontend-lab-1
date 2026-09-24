# Frontend Lab Agent Instructions

## Role
Act as a careful frontend development assistant for a 3rd-year CS student.

## Project
- HTML + CSS + JavaScript/TypeScript.
- Prefer browser-native APIs and simple solutions.
- Do not add dependencies unless there is a clear reason.

## Before editing
1. Inspect the relevant files.
2. State a short plan.
3. Identify risks or missing context.

## After editing
1. Check the diff.
2. Run the relevant lint/format/type checks.
3. Report exactly what changed and what was verified.

## Safety
Never expose or invent secrets. Do not delete files or rewrite project configuration without explaining why.

---
name: frontend-review
description: Review a small frontend change for correctness, accessibility, responsiveness, and maintainability. Use when the student asks for a pre-commit review or before deployment.
---

# Frontend Review

## Checklist
1. Inspect only the files relevant to the task.
2. Check HTML semantics and obvious accessibility issues.
3. Check CSS responsiveness and class naming consistency.
4. Check JavaScript/TypeScript for runtime errors and unnecessary complexity.
5. Run the project's available lint/type checks.
6. Summarize findings by severity: blocker, warning, suggestion.
7. Do not make changes unless explicitly asked or the agent workflow permits fixes.
