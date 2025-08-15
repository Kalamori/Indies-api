# Indies Menu Management App

## User Story

- As a customer, I want to browse menus and menu items so I can decide what to order.
- As an admin, I want to create, edit, and delete menus and menu items so I can manage the restaurant’s offerings.
- As a visitor, I want a clean, modern landing page so I know I’m in the right place.
- As a logged-in user, I want to see menu details and prices clearly so I can make informed choices.
- As an admin, I want easy-to-use forms for menu creation and editing so I can manage content efficiently.

## Logo

## Description

Indies is a menu management platform for an Indian takeaway restaurant, designed to handle both customer-facing menu browsing and admin-only menu management.
Customers can view all available menus and menu items, while admins can log in to create, edit, and delete menus or items.

The project implements a React frontend with protected admin routes, styled using custom CSS. It connects to a backend API for data persistence.

## Deployment link

GitHub repo link: https://github.com/Kalamori/Indies-api

Deployed project link:

## Timeframe & Working Team (Solo/Pair/Group)

The time frame given for the project was one week and we were instructed to work indepentently on this task.

## Technologies Used 

- React
- JavaScript
- CSS
- Node.js/Express backend
- MongoDB

## Brief

The app must:
	•	Allow customers to browse menus and items without logging in.
	•	Allow admins to log in and perform full CRUD (create, read, update, delete) operations.
	•	Have clear navigation and a consistent layout.
	•	Use CSS Flexbox/Grid for layout.
	•	Meet accessibility best practices (alt text, readable color contrast, semantic HTML).
	•	Show no console errors during runtime.
	•	Have properly formatted and readable code.

## Planning

- Wireframing: Designed the UI for Home, Menus, Menu Details, Login, and Signup pages.
- Component Breakdown: Identified shared components (NavBar, MenuCard, etc.).
- Routing Plan: Set up public and private routes with role-based access.
- CSS Styling: Defined a consistent color palette and spacing scale in index.css.

## Build/Code Process

- Routing setup using react-router-dom for page navigation.
- Auth flow with login and signup forms, JWT handling (if applicable).
- Admin-only routes protected by PrivateRoute.
- CRUD operations connected to the backend for menus and menu items.
- Styling applied across pages via index.css for a consistent UI.

## Challenges

- Handling role-based access control so that only admins can modify menus.
- Maintaining consistent layout across public and admin pages.
- Ensuring forms handled state updates cleanly without uncontrolled input warnings.

## Wins

- Fully functional admin dashboard for managing menus.
- Clean, modern design with reusable CSS classes.
- Role-protected routes that work reliably.
- Clear and easy customer browsing experience.

## Key Learnings/Takeaways

- Better understanding of React Router and private route patterns.
- Practical experience styling with global CSS and keeping styles consistent.
- Learned to structure form state handling in a clean, reusable way.

## Bugs

...

## Future Improvements

1.	User Experience
- Add search and filter options for menu items.
- Include pagination or infinite scroll for long menus.
- Add item categories with collapsible sections.
2.	Admin Tools
- Rich text editor for menu descriptions.
- Bulk upload of menu items via CSV.
- Menu scheduling (publish/unpublish dates).
3.	Visual Enhancements
- More animations for menu transitions.
- Light/Dark mode toggle.
- Responsive image optimization.
4.	Backend Features
- Store menu images in a cloud storage bucket.
- Audit logs for admin changes.
- Role management (super admin, editor, etc.).
5.	Accessibility
- Full keyboard navigation support.
- Better focus indicators for all interactive elements.

