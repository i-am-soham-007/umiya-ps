import React from 'react';
import { INSTAGRAM_POSTS } from '../../data/mockData';
import { Instagram, Heart, MessageCircle, ExternalLink } from 'lucide-react';

export const InstagramFeed: React.FC = () => {
  return (
    <section className="py-20 bg-[#F3EFE9] text-[#1E293B] border-t border-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#D62828] flex items-center gap-1.5">
              <Instagram className="w-4 h-4" />
              @UMIYA_STUDIO_USA
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900 mt-1">
              Live Social Journal
            </h2>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="bg-white hover:bg-[#1E3A8A] hover:text-white text-slate-900 border border-slate-300 font-bold text-xs px-6 py-3 rounded-2xl shadow-sm transition-all duration-300 flex items-center gap-2"
          >
            <span>Follow On Instagram</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noreferrer"
              className="group relative h-52 rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-md block"
            >
              <img
                src={post.image}
                alt="Instagram post"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />

              <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-between text-white text-xs">
                <div className="flex items-center gap-3 font-semibold">
                  <span className="flex items-center gap-1 text-rose-400">
                    <Heart className="w-3.5 h-3.5 fill-rose-400" /> {post.likes}
                  </span>
                  <span className="flex items-center gap-1 text-slate-300">
                    <MessageCircle className="w-3.5 h-3.5" /> {post.comments}
                  </span>
                </div>

                <p className="text-[10px] text-slate-200 line-clamp-3 leading-tight">{post.caption}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
