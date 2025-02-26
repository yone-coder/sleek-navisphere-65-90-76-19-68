
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';

interface Reward {
  title: string;
  price: number;
  description: string;
  claimed: number;
  limit: number;
}

interface RewardsSectionProps {
  rewards: Reward[];
}

export function RewardsSection({ rewards }: RewardsSectionProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Back This Project</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rewards.map((reward, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-500 text-white">
                  <CardTitle>{reward.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-2xl font-bold mb-2">${reward.price}</p>
                  <p className="text-gray-600 mb-4">{reward.description}</p>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>{reward.claimed} backers</span>
                      <span>{Math.round((reward.claimed / reward.limit) * 100)}% claimed</span>
                    </div>
                    <Progress 
                      value={(reward.claimed / reward.limit) * 100} 
                      className="h-2" 
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Select Reward</Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
