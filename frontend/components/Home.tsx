import React, { useEffect, useRef, useState, type FormEvent} from "react";
import axios from "axios"

type TerminalEntry = {
    kind: 'input' | 'output' | 'error' | 'system';
    text: string;
    timestamp?: string;
};

function Home(){
    const [currentInput, setCurrentInput] = useState('');
    const [history, setHistory] = useState<TerminalEntry[]>([
        {
            kind: 'system',
            text: 'Termina v1.0.0 - AI Terminal Assistant',
            timestamp: new Date().toLocaleTimeString()
        },
        {
            kind: 'system',
            text: 'Type your request and press Enter. Use Ctrl+C to clear.',
            timestamp: new Date().toLocaleTimeString()
        }
    ]);
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
    }, [history, loading]);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const runQuery = async (query: string) => {
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:3000/api/generate', { prompt: query });
            const data = res.data as { Command: string };
            const outputText = data.Command?.trim() || '';
            setHistory(prev => [...prev, { 
                kind: 'output', 
                text: outputText,
                timestamp: new Date().toLocaleTimeString()
            }]);
        } catch (err) {
            console.error(err);
            setHistory(prev => [...prev, { 
                kind: 'error', 
                text: '❌ Failed to generate command. Is the backend running?',
                timestamp: new Date().toLocaleTimeString()
            }]);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const trimmed = currentInput.trim();
        if (!trimmed || loading) return;
        setHistory(prev => [...prev, { 
            kind: 'input', 
            text: trimmed,
            timestamp: new Date().toLocaleTimeString()
        }]);
        setCurrentInput('');
        await runQuery(trimmed);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.ctrlKey && e.key === 'c') {
            e.preventDefault();
            setHistory([{
                kind: 'system',
                text: 'Terminal cleared.',
                timestamp: new Date().toLocaleTimeString()
            }]);
        }
    };

    return (
        <main className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-200 min-h-screen flex items-center justify-center font-mono">
            <div className="container mx-auto p-6 max-w-5xl">
                <div className="bg-gray-900 border border-gray-600 rounded-lg shadow-2xl overflow-hidden">
                    <div className="bg-gradient-to-r from-gray-700 to-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-600">
                        <div className="flex items-center space-x-2">
                            <div className="flex space-x-1">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            </div>
                            <span className="text-gray-300 text-sm font-medium">termina@localhost</span>
                        </div>
                        <div className="text-gray-400 text-xs">
                            {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
                        </div>
                    </div>

                    <div className="h-[75vh] flex flex-col bg-black">
                        <div 
                            ref={scrollRef} 
                            className="flex-1 overflow-auto p-4 space-y-1 text-sm"
                            style={{
                                background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)'
                            }}
                        >
                            {history.map((entry, idx) => (
                                <div key={idx} className="font-mono whitespace-pre-wrap">
                                    {entry.kind === 'system' && (
                                        <div className="text-cyan-400 mb-2">
                                            <span className="text-gray-500">[{entry.timestamp}]</span> {entry.text}
                                        </div>
                                    )}
                                    {entry.kind === 'input' && (
                                        <div className="mb-2">
                                            <span className="text-gray-500">[{entry.timestamp}]</span>{' '}
                                            <span className="text-green-400 font-bold">$</span>{' '}
                                            <span className="text-white">{entry.text}</span>
                                        </div>
                                    )}
                                    {entry.kind === 'output' && (
                                        <div className="text-gray-300 mb-2 pl-4 border-l-2 border-gray-700">
                                            {entry.text}
                                        </div>
                                    )}
                                    {entry.kind === 'error' && (
                                        <div className="text-red-400 mb-2 pl-4 border-l-2 border-red-600">
                                            {entry.text}
                                        </div>
                                    )}
                                </div>
                            ))}
                            {loading && (
                                <div className="text-yellow-400 mb-2">
                                    <span className="text-gray-500">[{new Date().toLocaleTimeString()}]</span>{' '}
                                    <span className="animate-pulse">⏳ Processing request...</span>
                                </div>
                            )}
                        </div>

                        
                        <form onSubmit={handleSubmit} className="border-t border-gray-700 bg-gray-900 p-3">
                            <div className="flex items-center space-x-2">
                                <span className="text-gray-500 text-sm">
                                    [{new Date().toLocaleTimeString()}]
                                </span>
                                <span className="text-green-400 font-bold">$</span>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={currentInput}
                                    onChange={(e) => setCurrentInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Describe what you want to do..."
                                    className="flex-1 bg-transparent outline-none text-white placeholder-gray-500 font-mono text-sm"
                                    disabled={loading}
                                    autoFocus
                                />
                                {loading && (
                                    <div className="text-yellow-400 text-xs animate-pulse">
                                        Processing...
                                    </div>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
                <div className="text-center mt-4 text-gray-500 text-xs">
                    <p>Press Enter to submit • Ctrl+C to clear • Powered by AI</p>
                </div>
            </div>
        </main>
    )
}
export default Home;