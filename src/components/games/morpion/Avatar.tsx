
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

  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-yellow-500', 
      'bg-pink-500', 'bg-indigo-500', 'bg-teal-500', 'bg-orange-500'
    ];
    
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };

  const initials = getInitials(name);
  const bgColor = getAvatarColor(name);
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
      ${sizeClasses[size]} ${bgColor} 
      rounded-full flex items-center justify-center 
      text-white font-semibold ring-2 ring-white
    `}>
      {initials}
    </div>
  );
};

export default Avatar;
