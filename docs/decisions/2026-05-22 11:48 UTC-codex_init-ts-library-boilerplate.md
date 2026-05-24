- Context: Dependency additions change project maintenance cost, security posture, and package surface.
- Decision: Require explicit user permission before adding any new dependency.
- Consequences: Agents must ask before installing or adding dependencies, even when the dependency would otherwise fit
  the exact-version policy.
- Status: accepted
