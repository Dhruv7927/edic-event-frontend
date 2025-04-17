export interface Speaker {
    name: string;
    bio: string;
    photoUrl?: string;
  }
  
  export interface AgendaItem {
    time: string;
    topic: string;
    speaker: string;
  }
  
  export interface Event {
    id?: number;
    title: string;
    description: string;
    startDate: string;
    endDate?: string;
    location: string;
    imageUrl?: string;
    registrationLink?: string;
    maxParticipants?: number;
    organizer?: string;
    contactEmail?: string;
    contactPhone?: string;
    featured: boolean;
    active: boolean;
    eventType?: string;
    speakers?: Speaker[];
    agenda?: AgendaItem[];
    createdAt?: string;
    updatedAt?: string;
  }
  