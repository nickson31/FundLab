# Data Dictionary: Investor JSONs

This document details the schema and content of the source JSON files used by the algorithm and message generator.

## 1. Angel Investors (`angel_investors_rows.json`)
*   **`idx`**: Integer index. Internal use.
*   **`fullName`**: Name of the investor. Used for display and addressing.
*   **`headline`**: LinkedIn headline. Critical for finding "Gold Nuggets" (e.g., "Fatherhood x5", "Sports & Health").
*   **`email`**: Contact email. Used for outreach.
*   **`linkedinUrl`**: Profile link. Used for "View Profile" actions.
*   **`about`**: Long-form bio. Rich source of personal details and investment philosophy.
*   **`addressWithCountry`**: Location string (e.g., "Boadilla del Monte, Community of Madrid, Spain"). Used for Location Weight.
*   **`profilePic`**: URL to image. **Used to display the investor's avatar in the UI**.
*   **`angel_score`**: String (e.g., "64.0"). Primary ranking metric for Angels.
*   **`validation_reasons_spanish`**: Text explaining score (ES). Used for context/reasoning.
*   **`validation_reasons_english`**: Text explaining score (EN). Used for context/reasoning.
*   **`categories_general_es`**: Comma-separated list of broad sectors (ES).
*   **`categories_general_en`**: Comma-separated list of broad sectors (EN).
*   **`categories_strong_es`**: Comma-separated list of *primary* sectors (ES). **High Weight**.
*   **`categories_strong_en`**: Comma-separated list of *primary* sectors (EN). **High Weight**.
*   **`stages_general_es`**: Comma-separated list of stages (ES).
*   **`stages_general_en`**: Comma-separated list of stages (EN).
*   **`stages_strong_es`**: Comma-separated list of *primary* stages (ES). **High Weight**.
*   **`stages_strong_en`**: Comma-separated list of *primary* stages (EN). **High Weight**.
*   **`id`**: UUID. Unique Identifier.
*   **`created_at`**: Timestamp.
*   **`last_updated`**: Timestamp.

## 2. Fund Employees (`fund_employees_rows.json`)
*   **`idx`**: Integer index.
*   **`fullName`**: Name of the employee.
*   **`headline`**: LinkedIn headline.
*   **`jobTitle`**: Role (e.g., "Managing Partner"). Used to gauge decision-making power.
*   **`about`**: Bio.
*   **`email`**: Contact email.
*   **`linkedinUrl`**: Profile link.
*   **`profilePic`**: URL to image. **Used to display the employee's avatar in the UI**.
*   **`addressWithCountry`**: Location.
*   **`companyLinkedin`**: Fund's LinkedIn.
*   **`companyName`**: Fund's Name (as listed on LinkedIn).
*   **`companyWebsite`**: Fund's Website.
*   **`fund_name`**: **CRITICAL JOIN KEY**. Links this employee to `investment_funds_rows.json`.
*   **`relevancia_dentro_del_fondo`**: (0-10) Hierarchy score.
*   **`mira_pitch_decks`**: (0-10) Likelihood of reviewing deals.
*   **`probabilidad_respuesta`**: (0-10) Likelihood of replying.
*   **`score_combinado`**: (0-10) Aggregate score. **Primary Ranking Metric**.
*   **`razonamiento`**: Text explaining the scores.
*   **`id`**: UUID.
*   **`created_at`**: Timestamp.
*   **`last_updated`**: Timestamp.

## 3. Investment Funds (`investment_funds_rows.json`)
*   **`idx`**: Integer index.
*   **`name`**: Fund name.
*   **`description`**: Long description. Rich source for "Bag of Words" matching.
*   **`short_description`**: Brief summary.
*   **`contact_email`**: Generic fund email.
*   **`phone_number`**: Contact phone.
*   **`linkedin/value`**: LinkedIn URL.
*   **`website/value`**: Website URL.
*   **`location_identifiers/0/value`**: City. Used for Location Weight.
*   **`location_identifiers/1/value`**: Region. Used for Location Weight.
*   **`location_identifiers/2/value`**: Country. Used for Location Weight.
*   **Note**: Location identifiers are variable-length. Some funds may have more or fewer than 3 location entries. Backend must iterate through all available indices.
*   **`category_keywords`**: **Stringified List** (e.g., "['Fintech', 'SaaS']"). Must be parsed. **Primary Category Weight**.
*   **`stage_keywords`**: **Stringified List**. **Primary Stage Weight**.
*   **`id`**: UUID.
*   **`created_at`**: Timestamp.
*   **`last_updated`**: Timestamp.
