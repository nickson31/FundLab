# UI Specification: Main Chat Interface

This document defines the visual design and functionality of the primary interface.

## 1. Design Philosophy
*   **Reference**: ChatGPT / Gemini / Claude.
*   **Vibe**: Clean, minimalist, text-first.
*   **Focus**: The conversation is the product. No clutter.

## 2. Layout Structure
*   **Header**:
    *   **Title**: "FundLab" (Centered or Top-Left).
    *   **Model Selector**: (Optional) "Gemini Pro".
    *   **User Avatar**: Top-Right (Click to open Settings).
*   **Main Content Area**:
    *   **Empty State**:
        *   Logo in center.
        *   Suggested Prompts: "Find Fintech Angels in Spain", "Draft email to Sequoia".
    *   **Conversation Stream**:
        *   User Bubbles: Right-aligned.
        *   AI Bubbles: Left-aligned.
        *   **Investor Cards**: Embedded directly in the stream (Horizontal scroll or Grid).
*   **Input Area (Bottom)**:
    *   Textarea (Auto-expanding).
    *   Send Button (Icon).
    *   Attachment Icon (Paperclip - for future use).
*   **Sidebar (Hidden/Hover)**:
    *   **Trigger**: Hover over the left 50px of the screen.
    *   **Animation**: Slides in smoothly (Framer Motion).
    *   **Content**: Links defined in `ui_pages.md` (Angels, Funds, Memory...).

## 3. Functional Components
*   **Search Functionality**:
    *   The Chat Input **IS** the Search Bar.
    *   **Toggle**: User can switch between searching "Angels" or "Funds" (toggle buttons above input or tabs)
    *   User types natural language → Gemini expands query → Results appear in chat.
    *   **Auto-Save**: All search results are automatically saved to `saved_investors` table
    *   **Anti-Duplication**: Previously shown investors/funds (stored in `seen_investors`) won't appear in new search results
*   **Investor Cards (UI Element)**:
    *   **Compact View**: Avatar, Name, Headline, Score.
    *   **Avatar Fallback**: If `profilePic` is empty or missing, display initials-based placeholder (first letter of first and last name on colored background).
    *   **Action**: Click to expand details or "Draft Message".
*   **Gemini Brief**:
    *   Appears as a standard AI text message *before* the cards.
    *   *Style*: Markdown text.
*   **Write Message Button**:
    *   **Location**: Fixed button in header or bottom-right corner (always visible)
    *   **Action**: Opens Message Composition Modal

## 4. Message Composition Flow (Modal)

### Step 1: Recipient Selection
*   **Trigger**: User clicks "Write Message" button
*   **UI**: Modal/Overlay opens
*   **Content**: Organized grid/list of all saved angels and employees
    *   **Angels Section**: Shows avatar, name, headline
    *   **Employees Section**: Shows avatar, name, job title, fund name
    *   **Search/Filter**: Optional search bar to find specific investor
*   **Action**: User selects ONE recipient → Proceed to Step 2

### Step 2: Company Context Input
*   **UI**: After selecting recipient, show:
    *   **Recipient Confirmation**: "Drafting message to [Name] - [Headline/Job Title]"
    *   **Company Description Field**: Large text area
        *   **Placeholder**: "Tell us about your company... (e.g., We're building a mobile fintech app for Gen Z users in Spain...)"
        *   **Purpose**: This replaces stored user context—user provides company info inline
*   **Action**: User writes company description → Click "Generate Message"

### Step 3: Message Generation & Display
*   **Loading State**: "Crafting personalized message..." animation
*   **Generated Message**: Displays AI-drafted message in preview box
*   **Actions**:
    *   **Copy to Clipboard**: One-click copy button
    *   **Save as Draft**: Saves to `messages` table with status='draft'
    *   **Edit**: Allows user to tweak message before saving
    *   **Regenerate**: Generate new message with same inputs
*   **Storage**: Message saved with `company_context` (user's input) and `content` (AI output)

## 5. Interactions
*   **Loading State**:
    *   While searching: "Thinking..." or "Scanning Database..." animation.
*   **Error States**:
    *   **No Results Found**: "No investors match your search. Try broadening your criteria."
    *   **Search Error**: "Oops! Something went wrong. Please try again."
    *   **Message Generation Failed**: "Unable to generate message. Please try again."
    *   **Empty Saved List**:  When user clicks "Write Message" but has no saved investors: "Search for investors first before drafting messages."

## 6. Copy & Tone (ChatGPT Clone)
*   **Welcome**: "How can I help you fundraise today?"
*   **Input Placeholder**: "Search for investors... (e.g., 'Find fintech angels in Madrid')"
*   **Search Toggle**: "Angels" / "Funds" (pill-style toggle buttons)
*   **Disclaimer**: "FundLab can make mistakes. Consider checking important info." (Small text at bottom).
*   **Sidebar Header**: "History" (or "Menu").

> [!IMPORTANT]
> **Message Drafting**: Messages are **NOT** drafted from search results directly. User must click dedicated "Write Message" button → select recipient from saved list → provide company context → generate message.
