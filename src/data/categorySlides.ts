
export interface Slide {
  id: number;
  image: string;
  title: string;
  description: string;
}

export const categorySlides: Record<string, Slide[]> = {
  all: [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=1200&h=400&fit=crop",
      title: "Gaming Essentials",
      description: "The latest gaming gear for every player"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1587202372575-31e5ba92e582?w=1200&h=400&fit=crop",
      title: "Premium PC Builds",
      description: "Customize your dream gaming setup"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=1200&h=400&fit=crop",
      title: "Gaming Accessories",
      description: "Elevate your experience with premium gear"
    }
  ],
  electronics: [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1526657782461-9fe13402a841?w=1200&h=400&fit=crop",
      title: "Next-Gen Consoles",
      description: "Experience gaming like never before"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=1200&h=400&fit=crop",
      title: "Pro Gaming Keyboards",
      description: "Precision and speed for competitive play"
    }
  ],
  home: [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1616626625495-31e5ba92e582?w=1200&h=400&fit=crop",
      title: "Gaming Furniture",
      description: "Comfort for extended gameplay sessions"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1616027614442-06c20a99f669?w=1200&h=400&fit=crop",
      title: "Gaming Room Setups",
      description: "Transform your space into a gaming haven"
    }
  ],
  fashion: [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1511746315387-c4a76990fdce?w=1200&h=400&fit=crop",
      title: "Gaming Apparel",
      description: "Rep your favorite games and teams"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1557787163-3a14b54a376d?w=1200&h=400&fit=crop",
      title: "Esports Merch",
      description: "Official gear from top gaming organizations"
    }
  ],
  sports: [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&h=400&fit=crop",
      title: "Gaming Fitness",
      description: "Stay active while you play"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&h=400&fit=crop",
      title: "VR Gaming",
      description: "Full-body gaming experiences"
    }
  ],
  beauty: [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=1200&h=400&fit=crop",
      title: "Gaming Lifestyle",
      description: "Look your best on and off stream"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1542626991-cbc4e32524cc?w=1200&h=400&fit=crop",
      title: "Streamer Essentials",
      description: "Everything you need to look professional on camera"
    }
  ]
};
