# Application Logic: FundLab Flow

## 1. The "Wow" Homepage (Pre-Login)
*   **Visuals**: High-end animations (Framer Motion). Text fades in, buttons glow.
*   **Copy**: "Copy de locos" (Crazy good copy) explaining the value prop.
*   **Action**: "Start Fundraising" button -> Redirects to Login.

## 2. Authentication (Supabase)
*   **Login**: Simple Email/Password form.
*   **Logic**:
    *   User enters credentials.
    *   Supabase validates.
    *   **On Success**: Redirect to `/chat` (The Main Stage).
    *   **Persistence**: Session is stored in browser cookies.

## 3. The Main Stage: Chat Interface
*   **Layout**: Full-screen chat. No visible dashboard initially.
*   **Sidebar (The "Vault")**:
    *   **Behavior**: Hidden by default. Reveals on **Hover** over the left edge.
    *   **Links**:
        *   **Angels**: List of saved/matched Angels.
        *   **Funds**: List of saved/matched Funds (Click to see Employees).
        *   **Documentation**: (Placeholder).
        *   **Settings**: Profile & Preferences.

## 4. The Search Loop (The Core Magic)
1.  **User Input**: User types "Busco inversores fintech en España" (Chat).
    *   **Toggle**: User can select "Angels" or "Funds" search mode
2.  **Gemini Query Expansion (The "Brain")**:
    *   **Input**: User Prompt.
    *   **Action**: Gemini generates "Ultra-Specific Keywords" for each weight category (Category, Stage, Location).
    *   *Goal*: Avoid overfitting. Generate synonyms and related terms (e.g., "Fintech" → "Payments", "Neobank", "DeFi").
    *   **Output**: Expanded JSON Intent.
3.  **Algorithm & Database Query**:
    *   Backend receives Expanded JSON.
    *   **Query**: weighted search against Supabase rows.
    *   **Anti-Duplication**: Filter out investors/funds in `seen_investors` (prevents showing previously displayed results).
4.  **Update History**:
    *   Add new IDs to `seen_investors` table with type (angel/fund).
    *   **Auto-Save**: Add all results to `saved_investors` table (no manual like/save button).
5.  **Gemini Brief**:
    *   Gemini reads the *raw results* (all columns) + User Prompt.
    *   Generates a hyper-personalized 1-sentence summary.
6.  **UI Render**:
    *   Display Brief + Investor Cards in the chat stream.

## 5. The Drill-Down (Funds -> Employees)
*   **Location**: Inside the **Funds** page (Sidebar) or via Fund Card click.
*   **Action**: Clicking a Fund reveals its Employees.

## 6. Message Generation
*   **Location**: Message Composition Modal (see `chat.md`).
*   **Trigger**: User clicks "Write Message" button in main chat page.
*   **Flow**:
    1.  **Select Recipient**: User chooses from saved angels/employees
    2.  **Provide Company Context**: User types company description inline
    3.  **Generate**: Gemini creates personalized message using company context + full investor data
*   **Input**: Inline Company Description + Full Investor/Employee/Fund Row (Gold Mining).
*   **Output**: Personalized draft saved to `messages` table with status='draft'.

## Database Schema (Simplified for Supabase)
*   `users`: Auth data.
*   `company_context`: JSONB (The user's pitch/info).
*   `seen_investors`: Table linking `user_id` to `investor_id` (to prevent duplicates).
*   `saved_investors`: Table for "favorites".
*   `messages`: Table for generated drafts.
