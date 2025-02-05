"use client";
import { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Globe, Phone, Star, X } from "lucide-react";
import { useRouter } from 'next/navigation';

export default function Home() {
  const [savedNonprofits, setSavedNonprofits] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch saved nonprofits from local storage or an API
    const storedNonprofits = localStorage.getItem('savedNonprofits');
    if (storedNonprofits) {
      setSavedNonprofits(JSON.parse(storedNonprofits));
    }
  }, []);

  const handleRemoveNonprofit = (nonprofitToRemove: any) => {
    const updatedNonprofits = savedNonprofits.filter(
      nonprofit => nonprofit.name !== nonprofitToRemove.name
    );
    setSavedNonprofits(updatedNonprofits);
    localStorage.setItem('savedNonprofits', JSON.stringify(updatedNonprofits));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 font-sans bg-white text-black">
      {/* Back Button */}
      <div className="absolute top-8 left-8">
        <Button
          onClick={() => router.back()}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Back
        </Button>
      </div>

      <main className="flex flex-col items-center w-full max-w-7xl mx-auto">
        <h1 className="text-6xl sm:text-7xl font-bold mb-12 text-center">
          <span className="text-[#FF7B7B]">SAVED</span>{" "}
          <span className="text-[#2563EB]">NONPROFITS</span>
        </h1>

        {/* Results grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          {savedNonprofits.map((nonprofit, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="h-full"
            >
              <Card className="bg-white shadow-xl hover:shadow-2xl transition-shadow h-full flex flex-col">
                <CardHeader className="flex-none">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-2xl font-bold text-[#FF5260] line-clamp-2">
                      {nonprofit.name}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveNonprofit(nonprofit)}
                        className="text-red-500 hover:bg-red-100 transition-colors"
                      >
                        <X className="h-6 w-6" />
                      </Button>
                    </div>
                  </div>
                  {nonprofit.category && (
                    <CardDescription className="text-lg text-gray-600 line-clamp-1">
                      {nonprofit.category}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <div className="space-y-4 flex-grow">
                    <p className="text-lg text-gray-700 line-clamp-4">
                      {nonprofit.description}
                    </p>
                    <div className="space-y-3 pt-4">
                      {nonprofit.address && (
                        <div className="flex items-start space-x-3 text-gray-600">
                          <MapPin className="h-5 w-5 text-[#FF5260] flex-shrink-0 mt-1" />
                          <span className="text-lg line-clamp-2">{nonprofit.address}</span>
                        </div>
                      )}
                      {nonprofit.website && (
                        <div className="flex items-start space-x-3 text-gray-600">
                          <Globe className="h-5 w-5 text-[#FF5260] flex-shrink-0 mt-1" />
                          <a
                            href={nonprofit.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg hover:text-[#FF5260] transition-colors line-clamp-1"
                          >
                            {nonprofit.website.replace(/^https?:\/\//, '')}
                          </a>
                        </div>
                      )}
                      {nonprofit.phone && (
                        <div className="flex items-center space-x-3 text-gray-600">
                          <Phone className="h-5 w-5 text-[#FF5260] flex-shrink-0" />
                          <span className="text-lg">{nonprofit.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
                {nonprofit.website && (
                  <CardFooter className="flex-none pt-4">
                    <Button 
                      className="w-full bg-[#FF5260] hover:bg-[#FF6B6B] text-white"
                      onClick={() => window.open(nonprofit.website, '_blank')}
                    >
                      Visit Website
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        {/* No saved nonprofits message */}
        {savedNonprofits.length === 0 && (
          <div className="text-center text-2xl mt-12">
            You haven't saved any nonprofits yet.
          </div>
        )}
      </main>
      <footer className="mt-auto text-xl">
        <a
          className="hover:underline hover:underline-offset-4"
          href="https://github.com/toomzheng/irvinehacks2"
          target="_blank"
          rel="noopener noreferrer"
        >
          2025 Unity Nonprofits
        </a>
      </footer>
    </div>
  );
}
