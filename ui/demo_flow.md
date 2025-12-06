# FundLab Demo - Complete User Flow

This document outlines **every click, every interaction** in the FundLab demo, organized by page. This serves as the master reference for writing copy and building the UI.

---

## Page 1: Wow Page (Pre-Login)

### Steps
1. **User lands on homepage**
   - See animated hero headline: "Find Your Perfect Investors in Minutes, Not Months"
   - Headline fades in, subheadline follows, CTA button scales in

2. **User scrolls down**
   - Problem section icons animate in one by one
   - Solution section steps slide in from sides
   - Feature cards flip/scale into view

3. **User hovers over CTA button**
   - Button glows, scales up slightly
   - Shadow effect intensifies

4. **User clicks "Start Fundraising Free" button**
   - Smooth transition/redirect to Login page

---

## Page 2: Login Page

### Steps
5. **Login form appears**
   - Email input field
   - Password input field
   - "Login" button
   - (Optional) "Sign Up" link if new user

6. **User enters credentials**
   - Email: [user input]
   - Password: [user input]

7. **User clicks "Login" button**
   - Supabase Auth validates credentials
   - Loading spinner appears

8. **On successful login**
   - Redirect to `/chat` (Main Chat Page)
   - Session stored in browser cookies

---

## Page 3: Main Chat Page (The Core Experience)

### Initial State (First Visit)

9. **User sees empty chat interface**
   - FundLab logo centered
   - Welcome message: "How can I help you fundraise today?"
   - Search input at bottom: "Search for investors... (e.g., 'Find fintech angels in Madrid')"
   - Toggle buttons above input: **[Angels]** | **[Funds]**
   - **Write Message** button visible (top-right or floating)
   - Sidebar hidden by default (reveals on left edge hover)

### Search Flow - Angels

10. **User selects "Angels" toggle**
    - Angels tab highlights/becomes active

11. **User types search query**
    - Example: "Find SaaS angels in Barcelona"

12. **User presses Enter or clicks search icon**
    - Loading animation: "Thinking..." or "Scanning Database..."
    - Backend: Gemini expands query → Algorithm runs → Results fetched

13. **Results appear in chat stream**
    - Gemini Brief displays first (AI-generated summary)
      - Example: "Found 8 angels passionate about SaaS in Barcelona with strong track records in early-stage investments."
    - Investor cards render below brief (horizontal scroll or grid)

14. **Each Investor Card shows**:
    - Avatar (or initials placeholder if `profilePic` empty)
    - Full Name
    - Headline
    - Angel Score

15. **User clicks on an Investor Card**
    - Card expands to show full details:
      - About section
      - Email, LinkedIn URL
      - Validation reasons
      - All category/stage tags
    - **Actions**visible:
      - "View LinkedIn" (opens new tab)
      - "Copy Email"
- "Draft Message" (triggers message composition modal—see steps 36-48)

16. **Auto-Save triggered**
    - All displayed angels saved to `saved_investors` table (type='angel')
    - All displayed angels added to `seen_investors` (anti-duplication)

### Search Flow - Funds

17. **User selects "Funds" toggle**
    - Funds tab highlights/becomes active

18. **User types search query**
    - Example: "Pre-seed fintech funds in Spain"

19. **User presses Enter**
    - Loading animation
    - Backend runs Fund Matching algorithm

20. **Results appear**
    - Gemini Brief displays
    - Fund cards render

21. **Each Fund Card shows**:
    - Fund Name
    - Short Description
    - Contact Email
    - Phone Number
    - Website link
    - LinkedIn link
    - Location (City, Region, Country)

22. **User clicks on a Fund Card**
    - Card expands to show **Employee Sub-View**

23. **Employee Sub-View displays**:
    - List of all employees for this fund
    - Each employee shows:
      - Avatar (or initials placeholder)
      - Full Name
      - Job Title
      - Score Combinado (primary ranking score)

24. **User clicks on an Employee**
    - Employee card expands to show:
      - Relevancia dentro del fondo (0-10)
      - Mira pitch decks (0-10)
      - Probabilidad respuesta (0-10)
      - Score combinado (0-10) - highlighted as primary metric
      - Email, LinkedIn
      - About section
    - **Actions**:
      - "View LinkedIn"
      - "Copy Email"
      - "Draft Message" (triggers message composition modal)

25. **Auto-Save triggered**
    - All displayed funds saved to `saved_investors` (type='fund')
    - All displayed employees saved to `saved_investors` (type='employee')
    - Funds added to `seen_investors` (anti-duplication)

### Sidebar Navigation

26. **User hovers over left edge of screen**
    - Sidebar slides in smoothly (Framer Motion animation)

27. **Sidebar displays links**:
    - **Angels** (badge showing count of saved angels)
    - **Funds** (badge showing count of saved funds)
    - **Documentation** (placeholder)
    - **Settings**

28. **User moves mouse away from sidebar**
    - Sidebar slides out/hides automatically

---

## Page 4: Angels Page (Sidebar)

29. **User clicks "Angels" in sidebar**
    - Navigate to `/angels` page
    - Sidebar remains accessible

30. **Angels Page displays**:
    - Header: "Angel Investors"
    - Search bar (local filter): "Search saved angels..."
    - List of saved angels (cards showing avatar, name, headline, score)

31. **User types in search bar**
    - List filters in real-time (client-side filter by name/headline)

32. **User clicks on an angel card**
    - Expands to show full details (same as main chat card expansion)

33. **User clicks "Draft Message" button**
    - Opens Message Composition Modal (see steps 36-48)

34. **User clicks "Remove" button**
    - Confirmation prompt: "Remove [Name] from saved list?"
    - On confirm: Delete from `saved_investors` table
    - Card disappears from list with fade-out animation

---

## Page 5: Funds Page (Sidebar)

35. **User clicks "Funds" in sidebar**
    - Navigate to `/funds` page

36. **Funds Page displays**:
    - Header: "Investment Funds"
    - Search bar (local filter): "Search funds..."
    - List view of saved funds (name, description, contact info, location)

37. **User clicks on a Fund Card**
    - Expands to show Employee Sub-View (same as main chat)

38. **User interacts with employees**
    - Can expand employee cards
    - Can click "Draft Message" (opens modal)

---

## Page 6: Message Composition Modal (Core Feature)

### Trigger Points
- User clicks "Write Message" button (main chat page - floating/header button)
- User clicks "Draft Message" on any investor/employee card

### Step 1: Recipient Selection (if triggered from "Write Message" button)

39. **Modal opens**
    - Overlay dims background
    - Modal centers with smooth scale-in animation

40. **Modal displays**:
    - Title: "Select Recipient"
    - **Two sections**:
      - **Angels**: Grid/list of saved angels (avatar, name, headline)
      - **Employees**: Grid/list of saved employees (avatar, name, job title, fund name)
    - Search bar: "Find an investor..."

41. **User types in search bar**
    - List filters in real-time

42. **User selects ONE recipient**
    - Click on card
    - Card highlights
    - "Continue" button becomes active

43. **User clicks "Continue"**
    - Proceed to Step 2

### Step 2: Company Context Input

44. **Modal updates**:
    - Title changes to: "Drafting message to [Recipient Name] - [Headline/Job Title]"
    - Large text area appears:
      - Label: "Tell us about your company"
      - Placeholder: "e.g., We're building a mobile fintech app for Gen Z users in Spain. We've built an MVP with 500 beta users and are raising €300K pre-seed..."
    - Character count (optional): Shows remaining/total characters

45. **User types company description**
    - Real-time character count updates

46. **User clicks "Generate Message" button**
    - Button shows loading spinner: "Crafting personalized message..."
    - Backend: Gemini receives company context + full investor JSON → generates message
    - Typical wait: 3-8 seconds

### Step 3: Message Preview & Actions

47. **Generated message displays**:
    - Message preview box with formatted text
    - Scroll if message is long

48. **User sees action buttons**:
    - **Copy to Clipboard**: One-click copy (shows "Copied!" toast)
    - **Save as Draft**: Saves to `messages` table (status='draft', includes company_context + content)
    - **Edit**: Makes message editable (user can tweak)
    - **Regenerate**: Generates new message with same inputs
    - **Close**: Cancelsdismisses modal

49. **User clicks "Copy to Clipboard"**
    - Message copied
    - Toast notification: "Message copied!"

50. **User clicks "Save as Draft"**
    - Message saved to database
    - Success toast: "Draft saved!"

51. **User clicks "Close"**
    - Modal fades out
    - Returns to previous page

---

## Page 7: Documentation Page (Placeholder)

52. **User clicks "Documentation" in sidebar**
    - Navigate to `/documentation`

53. **Page displays**:
    - Placeholder content: "Coming Soon - Guide to Fundraising"
    - Back to chat link

---

## Page 8: Settings Page

54. **User clicks "Settings" in sidebar**
    - Navigate to `/settings`

55. **Settings Page displays**:
    - **Profile Section**:
      - Profile picture upload
      - Email display (read-only)
    - **Account Section**:
      - "Change Password" button
    - **Admin Tools** (if user is admin):
      - "Supabase Cleanup" button (flush unused tables)

56. **User clicks "Change Password"**
    - Modal or inline form appears
    - Old password + New password fields
    - Confirm button triggers Supabase Auth update

57. **User uploads profile picture**
    - File picker opens
    - After selection: Image crops/previews
    - "Save" button uploads to Supabase Storage
    - Success toast

---

## Error States & Edge Cases

### Search Errors

58. **No results found**
    - Message in chat: "No investors match your search. Try broadening your criteria."
    - Suggested prompts appear (e.g., "Try searching for 'fintech angels' or 'seed funds'")

59. **API/Backend error**
    - Message: "Oops! Something went wrong. Please try again."
    - Retry button appears

60. **Empty saved list (Angels/Funds page)**
    - Empty state illustration
    - Message: "You haven't saved any [angels/funds] yet. Start searching!"
    - CTA button: "Go to Search"

### Message Composition Errors

61. **User clicks "Write Message" but has no saved investors**
    - Modal shows: "Search for investors first before drafting messages."
    - "Go to Search" button closes modal and focuses chat input

62. **Message generation fails**
    - Error message: "Unable to generate message. Please try again."
    - "Retry" button appears

63. **User closes modal before saving draft**
    - Confirmation prompt: "Discard unsaved message?"
    - "Discard" / "Cancel" buttons

---

## Summary: Total Interaction Count

- **Pre-Login**: 4 steps (landing, scroll, hover, click CTA)
- **Login**: 4 steps (view form, enter data, submit, redirect)
- **Main Chat**: 26 steps (empty state, 2 search flows, sidebar)
- **Angels Page**: 6 steps
- **Funds Page**: 4 steps
- **Message Modal**: 13 steps (selection, input, generation, actions)
- **Documentation**: 2 steps
- **Settings**: 4 steps
- **Error States**: 6 scenarios

**Total Core Flow Steps: ~60**

---

## Notes for Copy Writing

- **Every step** should have clear, concise copy
- **Placeholders** should guide user intent (not just "Enter text here")
- **Loading states** should be reassuring ("Scanning 500+ investors..." not just "Loading...")
- **Error messages** should be helpful, not technical ("Oops! Can't find that investor" vs. "404 investor_id not found")
- **Success toasts** should celebrate micro-wins ("Draft saved! Ready to reach out?" vs. "Record inserted")

---

## Framer Motion Animation Timeline (Summary)

| Page/Component | Animation | Trigger |
|---|---|---|
| Wow Page Hero | Headline fade-in from top | Page load |
| Wow Page Features | Card scale-in stagger | Scroll (whileInView) |
| Chat Results | Investor cards slide up | Search complete |
| Sidebar | Slide in from left | Hover left edge |
| Message Modal | Scale-in from center | Button click |
| Toasts | Slide in from top-right | Action success/error |

All animations should use **easeInOut** or **spring** physics for natural feel.
