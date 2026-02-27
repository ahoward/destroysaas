# Feature Specification: Soft Gate — Lobby Dashboard + Cabal Application

**Feature Branch**: `027-lobby-gate`
**Created**: 2026-02-27
**Status**: Ready
**Priority**: P0

## Summary

Gate the platform so anyone can sign up (real Supabase auth accounts, real user counts) but only inner circle members (cabal/admin/sudo) can act — submit ideas, pledge, comment, upvote. Non-inner users land on a lobby dashboard showing stats, roadmap progress, and a CTA to apply for the inner cabal. Application form captures name, reason, and what they can contribute. Admin reviews and approves/denies.

## User Scenarios & Testing

### User Story 1 — New User Signup (Priority: P0)

New user creates account and lands on the lobby.

**Acceptance Scenarios**:

1. **Given** a new user signs up, **When** they are authenticated, **Then** they are redirected to `/lobby` (not `/dashboard`)
2. **Given** a non-inner user visits `/dashboard`, **When** the page loads, **Then** they are redirected to `/lobby`
3. **Given** a non-inner user visits `/ideas/new`, **When** the page loads, **Then** they are redirected to `/lobby`

### User Story 2 — Lobby Dashboard (Priority: P0)

Authenticated non-inner users see a read-only view of platform activity.

**Acceptance Scenarios**:

1. **Given** a non-inner user visits `/lobby`, **When** the page loads, **Then** they see: stats bar (ideas, pledged, sponsors), roadmap/progress section, recent activity feed, and "apply for the inner cabal" CTA
2. **Given** a user who is inner (cabal/admin/sudo) visits `/lobby`, **When** the page loads, **Then** they are redirected to `/dashboard`

### User Story 3 — Cabal Application (Priority: P0)

Non-inner users can apply for inner cabal access.

**Acceptance Scenarios**:

1. **Given** a non-inner user visits `/lobby/apply`, **When** they fill out name/reason/contribution and submit, **Then** a row is created in `cabal_applications` with status 'pending'
2. **Given** a user with a pending application visits `/lobby`, **When** the page loads, **Then** they see "your application is pending review" instead of the apply CTA

### User Story 4 — Admin Review (Priority: P0)

Admins can approve or deny cabal applications.

**Acceptance Scenarios**:

1. **Given** an admin visits `/admin/applications`, **When** they see pending applications, **Then** they can approve or deny each one
2. **Given** an admin approves an application, **When** the action completes, **Then** the user is added to the 'cabal' group and their application status is set to 'approved'

### User Story 5 — Write Action Gating (Priority: P0)

Non-inner users cannot perform write actions even if they reach the UI.

**Acceptance Scenarios**:

1. **Given** a non-inner user attempts to pledge, **When** the server action runs, **Then** it returns an error
2. **Given** a non-inner user views an idea, **When** the page loads, **Then** the pledge panel shows "join the inner circle" CTA instead of the pledge form, and the comment form is hidden
3. **Given** a non-inner user browses `/ideas`, **When** the board loads, **Then** ideas are fully visible (read-only access is unrestricted)

### User Story 6 — Inner Users Unaffected (Priority: P0)

Existing cabal/admin/sudo users have exactly the same experience as before.

**Acceptance Scenarios**:

1. **Given** a cabal member visits `/dashboard`, **When** the page loads, **Then** they see the full dashboard as before
2. **Given** an admin visits `/ideas/new`, **When** the page loads, **Then** they can submit ideas as before
