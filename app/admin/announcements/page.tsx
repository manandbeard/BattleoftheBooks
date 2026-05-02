import React from 'react';
import { Megaphone, Plus } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export default async function AnnouncementsPage() {
  const MOCK_TENANT_ID = 'mock-tenant-id';
  
  const announcements = await prisma.announcement.findMany({
    where: { tenantId: MOCK_TENANT_ID },
    orderBy: { createdAt: 'desc' },
    include: {
      author: {
        select: { name: true }
      }
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Announcements</h1>
          <p className="text-gray-600 mt-1">Broadcast updates to all lower-level dashboards.</p>
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center gap-2 font-medium">
          <Plus className="w-4 h-4" />
          New Announcement
        </button>
      </div>

      <div className="space-y-4">
        {announcements.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Megaphone className="w-12 h-12 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No announcements yet</h3>
            <p className="text-gray-500 mt-1">Create an announcement to broadcast to all regions and schools.</p>
          </div>
        ) : (
          announcements.map((announcement: any) => (
            <div key={announcement.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{announcement.title}</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Posted by {announcement.author.name} on {new Date(announcement.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">Edit</button>
                  <button className="text-sm text-red-600 hover:text-red-800 font-medium">Delete</button>
                </div>
              </div>
              <div className="prose max-w-none text-gray-700">
                {announcement.content}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
