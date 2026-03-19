# Project mission
Build a production-grade healthy lifestyle web app with meal planning, pantry-aware recommendations, budget-aware planning, shopping list generation, workout planning, gamification, and a bright premium UI.

## Product priorities
1. Clean architecture
2. Strong UX clarity
3. Bright premium UI
4. Reliable core logic
5. Modular code
6. Easy future AI integration

## Non-goals for early implementation
- Do not over-engineer infrastructure.
- Do not depend on external AI APIs for the first working version.
- Do not introduce flashy UI patterns that reduce readability.

## Required working style
- Work in phases: plan, scaffold, implement, integrate, polish.
- Explain major direction changes before large edits.
- Keep domain boundaries explicit.
- Reuse components rather than duplicating them.
- Validate inputs and generated outputs.
- Add loading, error, and empty states.

## Agent roles

### Lead Architect Agent
- Requirements interpretation
- Architecture decisions
- Task sequencing
- Integration oversight
- Cross-domain consistency

### UI / Design Agent
- Visual language
- Premium bright styling
- Responsive layouts
- Shared component refinement
- Motion polish

### Meal Planning Agent
- Pantry mode
- Budget mode
- Meal plan structures
- Recipe rendering
- Shopping list logic
- Pantry reconciliation

### Workout Planning Agent
- Workout generation flow
- Equipment-based filtering
- Workout plan structure
- Exercise rendering
- Substitutions and progression

### Data / Auth / Persistence Agent
- Authentication
- Profile and settings persistence
- Pantry persistence
- Schema design
- Supabase integration

### QA / Integration Agent
- Integration checks
- Typecheck, lint, test execution
- Smoke testing
- Bug fixing
- Quality consistency

## Code quality standards
- TypeScript only
- Prefer explicit types
- Validate external and generated data
- Avoid giant files
- Use composable components
- Keep business logic out of presentational components
- Favor readability over cleverness

## UI standards
- Bright, calm, premium aesthetic
- Spacious layouts
- Soft cards
- Rounded corners
- Subtle glass effects
- Smooth micro-interactions
- Strong contrast and readability
- Mobile-first design

Avoid:
- visual clutter
- excessive gradients
- excessive blur
- inconsistent spacing
- inconsistent button styles

## Product logic standards
Meal planning must support:
- pantry-driven generation
- budget-driven generation
- 7-day plans
- shopping list aggregation
- pantry reconciliation
- ingredient grouping and checklist states

Workout planning must support:
- home and gym selection
- equipment-based personalization
- beginner, intermediate, and advanced logic
- realistic session outputs

Gamification must support:
- streaks
- progress
- tree growth states
- weekly consistency feedback

## Folder strategy
- `app/` route composition
- `components/` shared UI and layout primitives
- `features/` domain UI modules
- `services/` domain logic and planners
- `lib/` shared utilities and infrastructure
- `types/` shared contracts
- `data/` mock catalogs and fixtures
- `supabase/` schema and SQL

## Before finishing any major task
1. Review for consistency
2. Run lint and typecheck if available
3. Check obvious UX issues
4. Check responsive behavior
5. Summarize what changed

## Safety
- Do not make destructive changes without reason.
- Do not refactor broad areas unless the current task requires it.
- Do not add secrets to the repo.
- Use mock services and interfaces when external providers are not configured.

## Default execution order
1. plan
2. schema
3. routes
4. base UI system
5. auth and profile
6. pantry
7. meal planning
8. shopping list
9. workout planning
10. gamification
11. dashboard integration
12. QA polish
