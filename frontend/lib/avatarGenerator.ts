
/**
 * Generates a deterministic but distinct premium gradient based on a string input (name).
 * Used to "program the photos" when no image is available.
 */
export function generateAvatarGradient(name: string): string {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Curated premium color pairs (From -> To)
    const gradients = [
        ['from-indigo-500', 'to-purple-600'],
        ['from-blue-600', 'to-indigo-600'],
        ['from-violet-600', 'to-fuchsia-600'],
        ['from-emerald-500', 'to-teal-600'],
        ['from-cyan-500', 'to-blue-600'],
        ['from-rose-500', 'to-orange-600'],
        ['from-amber-500', 'to-orange-600'],
        ['from-fuchsia-600', 'to-pink-600'],
        ['from-slate-600', 'to-slate-800'],
        ['from-indigo-400', 'to-cyan-400']
    ];

    // Select gradient based on hash
    const index = Math.abs(hash) % gradients.length;
    const [from, to] = gradients[index];

    return `bg-gradient-to-br ${from} ${to}`;
}
