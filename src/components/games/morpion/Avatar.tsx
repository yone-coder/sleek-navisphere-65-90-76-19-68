
import React from 'react';

interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  hasPhoto?: boolean;
}

export const Avatar = ({ name, size = 'md', hasPhoto = false }: AvatarProps) => {
  const getInitials = (name: string) => {
    if (!name) return '?';
    const words = name.split(' ');
    if (words.length >= 2) {
      return `${words[0][0]}${words[1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const getAvatarGradient = (name: string) => {
    const gradients = [
      'from-blue-400 via-cyan-500 to-sky-500',
      'from-green-400 via-emerald-500 to-teal-400',
      'from-purple-400 via-fuchsia-500 to-pink-500',
      'from-yellow-300 via-amber-400 to-orange-400',
      'from-indigo-400 via-blue-500 to-violet-500',
      'from-pink-400 via-rose-500 to-red-400',
      'from-teal-400 via-cyan-500 to-emerald-400',
      'from-orange-400 via-amber-500 to-yellow-400'
    ];
    
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return gradients[Math.abs(hash) % gradients.length];
  };

  const initials = getInitials(name);
  const gradientClass = getAvatarGradient(name);
  
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-lg'
  };

  if (hasPhoto) {
    return (
      <img
        src={`/api/placeholder/64/64`}
        alt={`${name}'s avatar`}
        className={`${sizeClasses[size]} rounded-full object-cover ring-2 ring-white`}
      />
    );
  }

  return (
    <div className={`
      ${sizeClasses[size]} bg-gradient-to-br ${gradientClass}
      rounded-full flex items-center justify-center 
      text-white font-semibold ring-2 ring-white
    `}>
      {initials}
    </div>
  );
};

export default Avatar;
