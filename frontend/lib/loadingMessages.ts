/**
 * Intelligent Loading Message Generator
 * Adapts messages to ANY user input, even vague or incomplete prompts
 */

export interface LoadingMessageSet {
    messages: string[];
    duration: number; // ms per message
}

/**
 * Generate 5 personalized loading messages based on user query
 * Works with ANY input - extracts keywords intelligently
 */
export function generateLoadingMessages(userQuery: string): LoadingMessageSet {
    const query = userQuery.toLowerCase().trim();

    // Extract potential keywords (simple but robust)
    const words = query.split(/\s+/).filter(w => w.length > 3);
    const hasLocation = /\b(sf|nyc|london|berlin|paris|madrid|barcelona|silicon valley|bay area|europe|us|usa)\b/i.test(query);
    const hasStage = /\b(seed|series a|series b|early|late|growth|pre-seed)\b/i.test(query);
    const hasSector = /\b(ai|fintech|saas|crypto|web3|biotech|healthtech|edtech|climate|hardware)\b/i.test(query);

    // Category 1: Query Analysis (always relevant)
    const analysisMessages = [
        `Analyzing your search: "${userQuery.slice(0, 40)}${userQuery.length > 40 ? '...' : ''}"`,
        "Understanding your investment criteria...",
        "Parsing key requirements from your query...",
        "Identifying target investor profile..."
    ];

    // Category 2: Database Scanning (always relevant)
    const scanMessages = [
        "Scanning 500+ investors in our database...",
        "Reviewing angel investor profiles...",
        "Checking venture capital funds...",
        "Analyzing investment firm portfolios..."
    ];

    // Category 3: Matching (adapt based on query)
    const matchMessages = [];
    if (hasSector) {
        const sector = query.match(/\b(ai|fintech|saas|crypto|web3|biotech|healthtech|edtech|climate|hardware)\b/i)?.[0] || "sector";
        matchMessages.push(`Finding investors with ${sector} expertise...`);
        matchMessages.push(`Matching ${sector} focus with your needs...`);
    } else if (words.length > 0) {
        matchMessages.push(`Matching "${words[0]}" expertise with your needs...`);
        matchMessages.push(`Finding specialists in your domain...`);
    } else {
        matchMessages.push("Matching investment thesis...");
        matchMessages.push("Finding relevant investors...");
    }
    matchMessages.push("Identifying industry specialists...");
    matchMessages.push("Locating sector experts...");

    // Category 4: Stage/Geography (adapt based on query)
    const contextMessages = [];
    if (hasStage) {
        contextMessages.push("Evaluating investment stage alignment...");
        contextMessages.push("Checking stage preferences...");
    }
    if (hasLocation) {
        contextMessages.push("Checking geographic preferences...");
        contextMessages.push("Analyzing location compatibility...");
    }
    if (!hasStage && !hasLocation) {
        contextMessages.push("Analyzing ticket size compatibility...");
        contextMessages.push("Reviewing portfolio stage distribution...");
    }
    contextMessages.push("Evaluating investment criteria...");
    contextMessages.push("Checking portfolio fit...");

    // Category 5: Deep Analysis (always relevant)
    const deepMessages = [
        "Reading recent investment activity...",
        "Analyzing portfolio company patterns...",
        "Evaluating investment thesis alignment...",
        "Checking co-investor networks..."
    ];

    // Category 6: Finalization (always relevant)
    const finalMessages = [
        "Finalizing top matches...",
        "Ranking by relevance score...",
        "Preparing detailed insights...",
        "Generating match explanations..."
    ];

    // Select 5 messages (one from each category, intelligently)
    const selected = [
        analysisMessages[Math.floor(Math.random() * analysisMessages.length)],
        scanMessages[Math.floor(Math.random() * scanMessages.length)],
        matchMessages[Math.floor(Math.random() * matchMessages.length)],
        contextMessages[Math.floor(Math.random() * contextMessages.length)],
        deepMessages[Math.floor(Math.random() * deepMessages.length)]
    ];

    return {
        messages: selected,
        duration: 2000 // 2s per message = 10s total
    };
}

/**
 * Fallback messages for empty or very short queries
 */
export const FALLBACK_MESSAGES = [
    "Analyzing your request...",
    "Scanning investor database...",
    "Finding relevant matches...",
    "Evaluating compatibility...",
    "Preparing results..."
];
