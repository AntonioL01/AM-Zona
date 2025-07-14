import Header from '@/components/Header';
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MyListing from './components/MyListing';
import Inbox from './components/Inbox';

function Profile() {
  return (
    <div className="min-h-screen bg-zinc-300 text-zinc-900">
      <Header />
      <div className="px-4 md:px-20 py-10">
        <div className="max-w-7xl mx-auto bg-zinc-100 rounded-2xl shadow-xl p-6 md:p-10">
          <Tabs defaultValue="listings" className="w-full">
            <TabsList className="flex justify-center bg-zinc-200 rounded-lg mb-6">
              <TabsTrigger
                value="listings"
                className="text-zinc-800 data-[state=active]:bg-blue-950 data-[state=active]:text-white px-6 py-2 rounded-lg"
              >
                Moji oglasi
              </TabsTrigger>
              <TabsTrigger
                value="inbox"
                className="text-zinc-800 data-[state=active]:bg-blue-950 data-[state=active]:text-white px-6 py-2 rounded-lg"
              >
                Inbox
              </TabsTrigger>
            </TabsList>

            <div className="bg-zinc-200 rounded-xl p-4">
              <TabsContent value="listings">
                <MyListing />
              </TabsContent>

              <TabsContent value="inbox">
                <Inbox />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default Profile;
