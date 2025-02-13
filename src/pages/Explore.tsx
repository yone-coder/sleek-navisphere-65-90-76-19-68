
import { useNavigate } from "react-router-dom";

const games = [
  {
    id: 1,
    title: "Chess",
    description: "A strategic board game where two players move pieces with the goal of checkmating the opponent's king.",
    image: "https://storage.googleapis.com/a1aa/image/A0tRiJ6w8HZujXs2A-4XYcnReWkJ1hU6JyQbw-55BIE.jpg",
    profileImage: "https://storage.googleapis.com/a1aa/image/NfjObQXeS07bJ0o5j5OGJdMQYaLuQKhxEVvfei-LEAI.jpg",
    verified: true,
    stats: {
      likes: "3.2K",
      comments: "600",
      shares: "1.1K"
    }
  },
  {
    id: 2,
    title: "Dominoes",
    description: "A family of tile-based games played with rectangular \"domino\" tiles.",
    image: "https://storage.googleapis.com/a1aa/image/U9cxiKWRsMwBdP7GKinlUOUdzMsKzRiFuAfG1-PCvAg.jpg",
    profileImage: "https://storage.googleapis.com/a1aa/image/NfjObQXeS07bJ0o5j5OGJdMQYaLuQKhxEVvfei-LEAI.jpg",
    verified: true,
    stats: {
      likes: "1.1K",
      comments: "180",
      shares: "250"
    }
  },
  {
    id: 3,
    title: "Morpion (Tic-Tac-Toe)",
    description: "A simple strategy game for two players, who take turns marking the spaces in a 3×3 grid.",
    image: "https://storage.googleapis.com/a1aa/image/ILaOkYoR7hDayBWLOW1hj6X9ZkaT-UcZm24KX8P1jDY.jpg",
    profileImage: "https://storage.googleapis.com/a1aa/image/NfjObQXeS07bJ0o5j5OGJdMQYaLuQKhxEVvfei-LEAI.jpg",
    verified: true,
    stats: {
      likes: "900",
      comments: "150",
      shares: "200"
    }
  },
  {
    id: 4,
    title: "Shogi",
    description: "A Japanese strategy board game for two players, similar to chess.",
    image: "https://storage.googleapis.com/a1aa/image/URT1V_NcnrlLxnJWpP80Ej-uYh8hMuDel6e7Pxqs_eo.jpg",
    profileImage: "https://storage.googleapis.com/a1aa/image/NfjObQXeS07bJ0o5j5OGJdMQYaLuQKhxEVvfei-LEAI.jpg",
    verified: true,
    stats: {
      likes: "1.5K",
      comments: "250",
      shares: "400"
    }
  }
];

export default function Explore() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 p-4">
      {/* Header */}
      <header className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <button className="text-xl" onClick={() => navigate(-1)}>
            <i className="fas fa-arrow-left"></i>
          </button>
          <h1 className="text-2xl font-bold ml-4">Explore</h1>
        </div>
        <button className="text-xl">
          <i className="fas fa-search"></i>
        </button>
      </header>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section: Board Games */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-xl font-bold">Board Games</h1>
            <i className="fas fa-arrow-right text-xl"></i>
          </div>
          <div className="flex space-x-2 overflow-x-auto">
            {games.map((game) => (
              <div key={game.id} className="bg-white rounded-lg shadow-md overflow-hidden w-60 flex-shrink-0">
                <div className="relative">
                  <img 
                    src={game.image} 
                    alt={`${game.title} board`} 
                    className="h-32 w-full object-cover"
                  />
                  <img 
                    src={game.profileImage} 
                    alt="Profile picture of the user" 
                    className="absolute bottom-0 left-2 transform translate-y-1/2 h-10 w-10 rounded-full border-2 border-white"
                  />
                </div>
                <div className="p-2 pt-6">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h2 className="text-sm font-bold">
                        {game.title}
                        {game.verified && (
                          <span className="text-green-500">
                            <i className="fas fa-check-circle"></i>
                          </span>
                        )}
                      </h2>
                    </div>
                    <button className="bg-blue-500 text-white text-xs px-2 py-1 rounded-md">
                      + Follow
                    </button>
                  </div>
                  <p className="text-gray-500 text-xs truncate-2-lines">
                    {game.description}
                  </p>
                  <div className="mt-2 flex items-center justify-between text-gray-500 text-xs">
                    <span>
                      <i className="fas fa-heart"></i> {game.stats.likes}
                    </span>
                    <span>
                      <i className="fas fa-comment"></i> {game.stats.comments}
                    </span>
                    <span>
                      <i className="fas fa-share"></i> {game.stats.shares}
                    </span>
                  </div>
                  <button className="mt-2 w-full bg-blue-500 text-white py-1 rounded-md text-sm">
                    Play Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .truncate-2-lines {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
