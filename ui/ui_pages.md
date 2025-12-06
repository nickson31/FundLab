# UI Sidebar Pages

This document defines the layout and functionality of the pages accessible via the Left Sidebar.

## 1. Angels Page
*   **Purpose**: Manage and view Angel Investors.
*   **Layout**:
    *   **Header**: "Angel Investors" + Search Bar (filters saved list locally by name/headline).
    *   **List View**: Cards showing `profilePic` (avatar), `fullName`, `headline`, `angel_score`.
        *   **Avatar Fallback**: If `profilePic` is empty, display initials-based placeholder.
    *   **Actions**:
        *   "Draft Message" opens message composition modal (see `chat.md`).
        *   "Remove" (Deletes from Saved).
*   **Data Source**: `saved_investors` table (filtered by type='angel').

## 2. Funds Page
*   **Purpose**: Manage Funds and drill down to Employees.
*   **Layout**:
    *   **Header**: "Investment Funds"  + Search Bar (filters saved list locally by name).
   *   **List View**: Cards showing:
        *   Fund `name`
        *   `short_description` or `description` (truncated)
        *   Contact info: `contact_email`, `phone_number`
        *   `website/value` link
        *   `linkedin/value` link
        *   Location: Display location_identifiers as "City, Region, Country"
    *   **Interaction**: Clicking a Fund Card expands it to show **Employees**.
    *   **Employee Sub-View**:
        *   List of employees linked to this fund.
        *   Shows `profilePic` (avatar), `fullName`, `jobTitle`, `score_combinado`.
        *   **Avatar Fallback**: If `profilePic` is empty, display initials-based placeholder.
        *   **Display All Metrics**: Show all individual scores in employee card detail:
            *   `relevancia_dentro_del_fondo` (Hierarchy)
            *   `mira_pitch_decks` (Reviews Decks)
            *   `probabilidad_respuesta` (Reply Likelihood)  
            *   `score_combinado` (Combined Score - used for ranking)
        *   **Action**: "Draft Message" opens message composition modal (see `chat.md`).

## 3. Documentation
*   **Status**: Placeholder.
*   **Content**: "Coming Soon - Guide to Fundraising".

## 4. Settings
*   **Purpose**: Account management.
*   **Content**:
    *   Profile Picture.
    *   Email/Password change.
    *   **Supabase Cleanup**: (Admin only) Button to flush unused tables.
