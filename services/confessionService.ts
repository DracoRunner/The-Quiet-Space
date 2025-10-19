
import { Confession } from '../types';

// Initial mock data
const initialConfessions: Confession[] = [
  {
    id: '3',
    text: "I'm learning that self-compassion is harder than compassion for others, but it's the most important work.",
    timestamp: new Date(Date.now() - 1000 * 60 * 10),
  },
  {
    id: '2',
    text: 'I finally said no to an extra obligation this week. Small win, but it feels huge. I am protecting my peace.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: '1',
    text: 'It’s okay to not be okay today. I needed to let someone know that, even if it’s just the digital air.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
];

class ConfessionService {
  private confessions: Confession[] = [...initialConfessions];
  private listeners: ((confessions: Confession[]) => void)[] = [];

  constructor() {
    // Simulate new confessions appearing over time
    setInterval(() => {
        const shouldAdd = Math.random() > 0.8; // Add a new confession randomly
        if(shouldAdd && this.listeners.length > 0) {
            const newConfession: Confession = {
                id: Date.now().toString(),
                text: 'Someone, somewhere, is thinking a thought just like yours. You are not alone.',
                timestamp: new Date()
            };
            this.confessions.unshift(newConfession);
            this.notifyListeners();
        }
    }, 15000); // every 15 seconds
  }

  private notifyListeners() {
    // Create a copy to avoid race conditions if listeners modify the array
    [...this.listeners].forEach(listener => listener([...this.confessions]));
  }

  public onConfessionsUpdate(callback: (confessions: Confession[]) => void): () => void {
    // Immediately send the current list to the new listener
    callback([...this.confessions]);

    this.listeners.push(callback);

    // Return an unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }

  public async addConfession(text: string): Promise<void> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newConfession: Confession = {
      id: Date.now().toString(),
      text,
      timestamp: new Date(),
    };

    this.confessions.unshift(newConfession);
    this.notifyListeners();
  }
}

export const confessionService = new ConfessionService();
