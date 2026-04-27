import React from 'react';

interface FooterProps {
    isDark: boolean;
}

export default function Footer({ isDark }: FooterProps) {
    return (
        <footer className={`w-full py-8 px-10 mt-16 border-t ${isDark ? 'border-zinc-800 bg-zinc-900' : 'border-zinc-200 bg-zinc-100'}`}>
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <p className={`text-sm ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>© 2026 Movie Finder. All rights reserved.</p>
                <div className="flex gap-6">
                    <a href="https://www.instagram.com/_.g.o.n._/" target="_blank" rel="noopener noreferrer" className={`text-sm hover:underline ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>Instagram</a>
                    <a href="https://mail.google.com/mail/u/0/#inbox?compose=CllgCJZdBnqPZkRvRnJRSdcpbsHGSQsKnSJcgkSjwMfrQvQLlJvxNddBHRcHGJCbVvKCfSSWwSV" target="_blank" rel="noopener noreferrer" className={`text-sm hover:underline ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>Gmail</a>
                    <a href="#" className={`text-sm hover:underline ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>Privacy</a>
                    <a href="#" className={`text-sm hover:underline ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>(+38)098 996 90 30</a>
                </div>
            </div>
        </footer>
    );
}
