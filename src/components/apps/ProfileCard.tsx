
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const ProfileCard = () => {
  const navigate = useNavigate();
  // This should be replaced with your actual auth check
  const isAuthenticated = false;
  const user = isAuthenticated ? {
    name: "Danny Rico",
    email: "danny@example.com",
    subtitle: "Apple Account, iCloud, and more",
    avatar: "https://github.com/shadcn.png",
  } : null;

  return (
    <div className="container px-4 py-2">
      <button 
        onClick={() => navigate('/login')} 
        className="flex items-center gap-3 w-full py-2 hover:bg-muted/60 transition-colors duration-200 rounded-lg"
      >
        <Avatar className="h-10 w-10">
          {isAuthenticated && user ? (
            <AvatarImage src={user.avatar} alt={user.name} />
          ) : (
            <AvatarFallback className="bg-muted-foreground/10">
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="text-muted-foreground/60"
              >
                <path 
                  d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path 
                  d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </AvatarFallback>
          )}
        </Avatar>
        <div className="flex flex-col items-start">
          {isAuthenticated && user ? (
            <>
              <span className="text-sm font-medium">{user.name}</span>
              <span className="text-xs text-muted-foreground">{user.subtitle}</span>
            </>
          ) : (
            <>
              <span className="text-sm font-medium">Sign in</span>
              <span className="text-xs text-muted-foreground">Access your account and data</span>
            </>
          )}
        </div>
        <div className="ml-auto">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-muted-foreground/70"
            >
              <path 
                d="M9 18L15 12L9 6" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </div>
      </button>
    </div>
  );
};
