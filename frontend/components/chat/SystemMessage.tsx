import { Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SystemMessageProps {
    content: string;
    isLoading: boolean;
}

export function SystemMessage({ content, isLoading }: SystemMessageProps) {
    return (
        <div className="flex items-start gap-4 animate-[fadeIn_0.5s_ease-out_forwards]">
            <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 shadow-lg shadow-indigo-500/20",
                "bg-indigo-600"
            )}>
                <Zap className="w-4 h-4 text-white fill-white" />
            </div>
            <div className="space-y-2 flex-1 max-w-3xl">
                <div className="flex items-baseline gap-2">
                    <span className="text-sm font-semibold text-white">FundLab AI</span>
                    <span className="text-xs text-gray-500">Just now</span>
                </div>

                <div className="prose prose-invert max-w-none">
                    <div className="bg-white/5 border border-white/5 rounded-2xl rounded-tl-sm p-4 text-gray-200 text-sm md:text-base leading-relaxed shadow-sm">
                        {isLoading ? (
                            <div className="flex items-center gap-2 text-gray-400 italic">
                                <span>Thinking...</span>
                            </div>
                        ) : (
                            <div className="whitespace-pre-wrap">{content}</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
