# Major principles for organizing code in a React project

Defines where a file belongs. Read it before adding a component, a hook or a stylesheet.

## 1. Avoid code duplication

As soon as two parts of the codebase need the same piece of logic, TSX, or styling, a second version should not be copied: instead, create a reusable component and import it wherever needed.

The question to ask before writing code is not "where should I put this file?" but rather "who else needs what I am currently writing?". The answer to that question determines the file's location, and that is what the following sections describe.

## 2. Global components

Reserved for the application chrome: elements that frame every page and live outside the page content itself, such as the navigation bar and the footer. These live in a shared folder at the root of the source code, outside of any specific page.

```text
src/
  components/
    Navbar/
      Navbar.tsx
      Navbar.css
    Footer/
      Footer.tsx
      Footer.css
```

## 3. Components shared between several pages

Building blocks used to compose the content of more than one page (sections, buttons, generic layouts) live in a `components/` folder at the root of `pages/`, next to the page folders. They differ from global components: they are part of the page content, not of the application chrome.

```text
src/
  pages/
    components/
      Card.tsx
      Card.css
      Button.tsx
      Button.css
    dashboard/
      DashboardPage.tsx
```

A component only belongs in this shared folder once it is actually used by at least two different pages. The goal is not to anticipate future reuse: as long as a component is only used in one place, it remains local to that place.

## 4. Components belonging to a page or feature

Each page (or major feature) has its own folder containing:

* an entry file for the page itself (general structure and internal routing between subviews if the page contains several)
* a style file associated with this entry point
* a subfolder containing all components that only make sense for this specific page

```text
src/
  pages/
    dashboard/
      DashboardPage.tsx
      DashboardPage.css
      components/
        ...
```

A component that is only used by a single page should never live in the shared or global components folders, even if it is well designed and cleanly implemented. Its scope of use should remain visible through its location.

## 5. Subcomponents specific to a component

If a component requires a subcomponent that is only used by it, that subcomponent should be placed in a dedicated subfolder inside the parent component's folder.

```text
components/
  ProfileCard/
    ProfileCard.tsx
    components/
      ProfileAvatar.tsx
```

A component that has no private subcomponents does not need its own folder: it remains directly inside the folder that contains it, alongside its siblings.

```text
components/
  ProfileCard/
    ProfileCard.tsx
    components/
      ProfileAvatar.tsx
  SimpleBanner.tsx
```

This rule applies recursively: a subcomponent may itself have its own private subcomponents following the same logic.

## 6. Components shared between several elements of the same page

When a component, utility function, or style is used by at least two components on the same page, but neither component is its natural owner, it should be placed in a shared folder specific to that page (for example named `shared`), separate from the application's global components.

```text
pages/
  dashboard/
    DashboardPage.tsx
    components/
      RevenueSection.tsx
      UsersSection.tsx
      shared/
        StatBadge.tsx
        StatBadge.css
```

This shared folder may itself contain a subfolder dedicated to style files that are not associated with a component (layout classes or visual patterns reused across several different files). This avoids mixing actual components and simple stylesheets within the same folder: otherwise, one naturally expects to find a component file for every file in the folder and is surprised not to find one.

```text
shared/
  StatBadge.tsx
  StatBadge.css
  styles/
    layout.css
    table.css
```

## 7. Style organization

Each component owns its own style file, imported directly by that component. A single monolithic stylesheet containing all the CSS for an entire page should be avoided.

This rule provides two benefits. First, it makes it immediately clear which class belongs to which component, without having to search through a file containing hundreds of lines. Second, it prevents dead styles from accumulating over time: when a component is removed, its style file disappears with it instead of remaining orphaned inside a global stylesheet that nobody cleans up.

## 8. Example of a complete structure

```text
src/
  components/
    Navbar/
      Navbar.tsx
      Navbar.css
    Footer/
      Footer.tsx
      Footer.css
  pages/
    components/
      Card.tsx
      Card.css
      Button.tsx
      Button.css
    dashboard/
      DashboardPage.tsx
      DashboardPage.css
      components/
        RevenueSection/
          RevenueSection.tsx
          RevenueSection.css
          components/
            RevenueChart.tsx
        UsersSection/
          UsersSection.tsx
          components/
            UserRow.tsx
        shared/
          StatBadge.tsx
          StatBadge.css
          styles/
            layout.css
```
